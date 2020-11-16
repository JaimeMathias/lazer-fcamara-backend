const { Users } = require('../models');
require('dotenv').config();
const jwt = require('jsonwebtoken')
module.exports = new class UserController {
    
    async index(request, response) {
         try {
             const { id } = request.params
             const user = await Users.findOne({
                 attributes: [
                     'id','name', 'email', 'id_filial'
                 ],
                where: {
                    id,
                }
             });

             if(user == '' || user == null) {

             response.status(400).json({msg: "User not found"});

             }

             response.json(user)

         } catch (error) {
            console.log(error)
            response.status(400).json({"msg": "Falha ao buscar"})
         }
    }

    async indexAll(request, response) {
        try {
            const user = await Users.findAll({
                attributes: ['id', 'name', 'email', 'id_filial']
            });

            if(user != '') {
                return response.status(200).json(user)
            }

        } catch (error) {
            console.log(error)
            response.status(400).json({"msg": "Falha ao buscar"})
        }
    }
    


    async store(request, response) {
        try {
        
        const { name, email, password, filial } = request.body 
        
        const user = await Users.create({
            name,
            id_filial: filial,
            email,
            password
        });

        if(user) {
            let id = user.id;
            let token = jwt.sign({id}, process.env.SECRET, {
                expiresIn: 10000
            });
          
            return response.status(200).json({msg: "Usuario criado", token});
            
        }} catch (error) {
            console.log(error)
            response.status(400).json({"msg": "Falha no cadastro"})
        }
    }   

    async remove(request, response) {
        try {
            const { id } = request.params

            const user = await Users.findOne({
                attributes: [
                    'id','name', 'email', 'id_filial'
                ],
               where: {
                   id,
               }
            });

            if(user == null) return response.status(400).json({"msg": "User not found"}); 

            if(user != '') {
                await Users.destroy({
                    where: {
                        id: user.id
                    }
                })
                return response.status(200).json({"msg": "User deleted with sucess"})
            } 

        } catch (error) {
            console.log(error)
            response.status(400).json({"msg": "Falha ao deletar"})
        }
    }

    async update(request, response) {
       try {
        const { name, password, email } = request.body
        
        const { id } = request.params

        const Usuario = await Users.findOne({
            attributes: [
                'id','name', 'email', 'id_filial', 'password'
            ],
           where: {
               id,
           }
        });

        if(!Usuario) response.status(400).json({msg: "User not found"})

            const preData = [Usuario.name, Usuario.password, Usuario.email];
            
            if(Usuario) {
              const final = await Usuario.update({
                    name: name != "" ? name : preData[0],
                    password: password != "" ? password : preData[1],
                    email: email != "" ? email : preData[2]
                })
               return response.status(200).json(final)
            }
       } catch (error) {
        console.log(error)           
        response.status(400).json({msg: "Update not available"})

       }
    }
}

