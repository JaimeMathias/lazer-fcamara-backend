const jwt = require('jsonwebtoken');
const { next } = require('sucrase/dist/parser/tokenizer');
require('dotenv').config();
const { Users, Queues } = require('../models')

class AuthServer {
    
    async login (request, response, next) {
        try {
        const { email , password } = request.body

        const Usuario = await Users.findOne({
            where: {
               email,
               password, 
            }
        })

        if(!Usuario) response.status(400).json({msg: "User not autenticated"})

        const Redirect = await Queues.findOne({
            where: {
                id_user: Usuario.id,
                status_user: true
            }
        })   
        
        const platform = Redirect.id_platform || 0

        if(Usuario) {
            let id = Usuario.id;
            let token = jwt.sign({id}, process.env.SECRET, {
                expiresIn: 100000
            });
            
            if(platform != 0) {
                return response.json({
                    auth: true,
                    token,
                    inQueue: true,
                    queue: platform
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
    })
}
}

module.exports = new AuthServer();

