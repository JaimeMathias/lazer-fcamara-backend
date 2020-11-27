const { Platforms, Queues } = require('../models')

module.exports = new class QueuesController {
    
    async store(request, response) {

        try {

        const user = response.locals.user.id;

        const { platform } = request.body
        
        const User = await Queues.findOne({
            where: {
                id_user: user,
                id_platform: platform
            }
        });


        /**
         * 
         * @ retorna a posição do usuário n a fila
         */
        
         const Fila = await Queues.findAll({
            where: {
                id_platform: platform
            },
            order: [[
                'updatedAt', 'ASC'
            ]]
        })

        let count = 1
        Fila.forEach((item) => {
            if(item.dataValues.id_user == user) {
                return count;
            }
             count = count + 1
        }) 
        
        
    if(User != null)  {
            await User.update({
                status_user: true
            })
        response.status(201).json({"msg": 'User is on queue', position: count});
    } 

    if(!User) {
        // create the log of user on queue database
        await Queues.create({
            id_user: user,
            id_platform: platform,
            status_user: true
        })
        response.status(201).json({"msg": 'User is on queue', position: count});
    }
        } catch(err) {
         console.log(err)
         response.status(400).json({"msg": "Plataforma ou Usuário inexistentes"});
        }
    }

    async quit(request, response) {
        try {
            const user = response.locals.user.id;
            const { platform } = request.body;
            const User = await Queues.findOne({
                where: {id_user: user,id_platform: platform}
            });

            await User.update({
                status_user: false
            })

            response.status(201).json({"msg": 'Saiu com sucesso'});

        } catch (error) {
            console.log(error)
            response.status(400).json({"msg": "Plataforma ou Usuário inexistentes"});      
        }
    }
    async queueData(request, response) {
        try {
            const plat = await Platforms.findAll();

            let obj = {}
            let arr = []

            plat.forEach( async(plataforma, indice) => {
                
                indice+=1

                const storage =  await Queues.findAll({
                    raw: true,
                    attributes: ['id_user', 'id_platform'],
                    where: {
                        id_platform: indice || 1
                    }
                })
                
                let { id, name, location } = plataforma
                
                let stringName = name + ' - ' +location
                
                let size = storage.length 
                
                obj = {
                        id_plataforma: id,
                        Name: stringName,
                        size,
                    
                }

                arr.push(obj)
                if(indice == plat.length) {
                    response.json(arr)
                }

            })

        } catch (error) {
            response.status(400).json({"msg": "Erro na requisição"});   
        }
    }
    async polling(request, response) {
        const user = response.locals.user.id;
        
        const { platform } = request.body

        const Fila = await Queues.findAll({
            where: {
                id_platform: platform
            },
            order: [[
                'updatedAt', 'ASC'
            ]]
        })

        let count = 1
        Fila.forEach((item) => {
            if(item.dataValues.id_user == user) {
                return count;
            }
             count = count + 1
        })
        response.status(200).json({
            position: count,
            id_user: user
        })

    }
}

           