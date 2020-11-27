const jwt = require('jsonwebtoken');
const { next } = require('sucrase/dist/parser/tokenizer');
require('dotenv').config();
const { Users, Queues, Platforms } = require('../models')

class AuthServer {
        if(!Usuario) response.status(400).json({msg: "User not autenticated"})

        const Redirect = await Queues.findAll({
            where: {
                id_user: Usuario.id,
                status_user: true
            },
            include: [{
                model: Platforms,
                as: 'id_platforms',
                required: true,
                attributes: ['id' ,'name']
            }]
        })   
        

        const platform = Redirect[0].dataValues || 0

        const { id_user, id_platform } = platform

        const { name } = platform.id_platforms
        
        if(Usuario) {
            let id = Usuario.id;
            let token = jwt.sign({id}, process.env.SECRET, {
                expiresIn: 100000
            });
            // @@ se o usuario estiver cadastrado em fila redireciona
            if(platform != 0) {
                
                const Fila = await Queues.findAll({
                    where: {
                        id_platform,
                        status_user: true
                    },
                    order: [[
                        'updatedAt', 'ASC'
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
                    name,
                    position: count
                })
            }

            return response.json({
                auth: true,
                token,
            })
        }    
        } catch (error) {
            return response.status(400).json({
                msg: "Error to connect"
            })
        }

        return response.json({
          auth: true,
          token,
        })
      }
    } catch (error) {
      return response.status(400).json({
        msg: "Error to create a connection"
      })
    }

    async Auth (request, response, next) {
        let token = request.headers['x-access-token']

        if (!token) return response.status(401).json({ auth: false, message: 'Token não existente.' });
        
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) return response.status(500).json({ auth: false, message: 'Falha ao autenticar token.' });
            
            response.locals.user = decoded;

            next();
      
          });

    }  
    async Destroy(req, res) {
        res.json({
        auth: false,
        token: null
  }


  async Destroy(request, response) {
    response.json({
      auth: false,
      token: null
    })
  }
}

module.exports = new AuthServer();

