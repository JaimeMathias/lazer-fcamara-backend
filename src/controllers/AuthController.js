const jwt = require('jsonwebtoken');
const { next } = require('sucrase/dist/parser/tokenizer');
require('dotenv').config();
const { Users } = require('../models')

class AuthServer {
    
    async login (request, response) {
        try {
        const { email , password } = request.body

        const Usuario = await Users.findOne({
            where: {
               email,
               password, 
            }
        })

        if(!Usuario) response.status(400).json({msg: "User not autenticated"})

        if(Usuario) {
            let id = Usuario.id;
            let token = jwt.sign({id}, process.env.SECRET, {
                expiresIn: 10000
            });

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
            
            request.userId = decoded.id;
                        
            next();
      
          });

    }        
}

module.exports = new AuthServer();