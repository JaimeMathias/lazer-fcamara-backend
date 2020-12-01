"use strict";const jwt = require('jsonwebtoken');
const { next } = require('sucrase/dist/parser/tokenizer');
require('dotenv').config();
const crypto = require('crypto');
const { Users, Queues, Platforms } = require('../models')


class AuthServer {

  async login (request, response, next) {
    try {
      let { email , password } = request.body

      let hash = crypto.createHash('md5').update(password).digest("hex")

      const user = await Users.findOne({
        where: {
          email,
          password: hash
        }
      })

      if(!user) response.status(400).json({msg: "User not autenticated"})

        const Redirect = await Queues.findAll({
          where: {
            id_user: user.id,
            status_user: true
          },
          include: [{
            model: Platforms,
            as: 'id_platforms',
            required: true,
            attributes: ['id' ,'name']
          }]
        });
        let platform, id_user, id_platform, name;

        if(Redirect != "") {
          console.log('chega aqui')

          platform = Redirect[0].dataValues
          id_user = platform.id_user
          id_platform = platform.id_platform
          name = platform.name
        }

        if(user) {
          let id = user.id;
          let token = jwt.sign({id}, process.env.SECRET, {
            expiresIn: 100000
          });

            // @@ se o usuario estiver cadastrado em fila redireciona
          if(platform) {
            const Fila = await Queues.findAll({
              where: {
                id_platform,
                status_user: true
              },
              order: [[
                'updatedAt', 'DESC'
              ]]
            })

            let count = 1

            Fila.forEach((item) => {
              if(item.dataValues.id_user == id_user) {
                return count;
              }
              count = count + 1
            })

            response.status(200).json({
              auth: true,
              token,
              id_platform,
              allowNotification: user.dataValues.receiveEmail,
              position: count
            
            })
            return;
          }

          return response.json({
            auth: true,
            token,
            allowNotification: user.dataValues.receiveEmail
          })
        }
    }catch (error) {
      console.log(error)
      return response.status(500).json({
        msg: "Server error"
      })
    }
  }

  async Auth (request, response, next) {
    let token = request.headers['x-access-token']

    if (!token) return response.status(401).json({ auth: false, message: 'Token not found.' });

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return response.status(500).json({ auth: false, message: 'Falha ao autenticar token.' });

        response.locals.user = decoded;

        next();
      });
  }

  async validate(request, response) {
    let token = request.headers['x-access-token']

    if (!token) return response.status(401).json({ auth: false, message: 'Token not found.' });

    jwt.verify(token, process.env.SECRET, async function(err, decoded) {
      if (err) return response.status(500).json({ auth: false, message: "Token isn't valid."});

      const Platform = await Queues.findOne({
        raw: true,
        attributes: ['id_platform'],
        where: {
          id_user: decoded.id,
          status_user: true
        }
      })

      

      const User = await Users.findOne({
        raw: true,
        attributes: ['receiveEmail'],
        where: {
          id: decoded.id
        }
      })

      const Fila = await Queues.findAll({
        where: {
          id_platform: Platform.id_platform,
	        status_user: true
        },
        order: [["updatedAt", "DESC"]],
      });


      let count = 1;
      Fila.forEach((item) => {
        if (item.dataValues.id_user == decoded.id) {
          return count;
        }
        count = count + 1;
      });


      if(Platform == '' || Platform == undefined) {
        return response.status(200).json({auth: true, allowNotification: User.receiveEmail})
      } else {
        return response.status(201).json({
          auth: true,
          id_platform: Platform.id_platform,
          allowNotification: User.receiveEmail,
          position: count
        })
      }

      });
  }

  async Destroy(request, response) {
    response.json({
      auth: false,
      token: null
    });
  }
}

module.exports = new AuthServer();

