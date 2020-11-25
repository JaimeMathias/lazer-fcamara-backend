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

            const all = await Queues.findAll({
                attributes: ['id', 'id_user', 'id_platform', 'status_user']
            })

            const AllToArray = all.map(log => [log.id, log.id_user, log.id_platform, log.status_user])

            
            // 1 = retorna um array com os usuarios do PS4 ativo
            
            const Playstation = AllToArray.filter((array) => {
                if(array[3] == true && array[2] == 1) {
                    return array[1]
                }
            })

            // 2 = retorna um array com os usuarios do Ping Pong ativo
            const Ping = AllToArray.filter((array) => {
                if(array[3] == true && array[2] == 2) {
                    return array[1]
                }
            })
            
            // 3 = retorna um array com os usuarios da Sinuca ativo
            const Sinuca = AllToArray.filter((array) => {
                if(array[3] == true && array[2] == 3) {
                    return array[1]
                }
            })

            function id(array) {
                let arr = []
                array.forEach((item) => {
                    arr.push(item[1])
                })
                return arr;
            }
            
            function returnObject(array) {
                if(array == undefined || array == '' || array == null) {
                    return {
                        size: 0
                    }
                }

                const list = id(array)
                const size = array.length
                return {
                    ids: {
                        list,
                    },
                    size,
                }
            }

            const sinucaObject = returnObject(Sinuca)
            const pingObject = returnObject(Playstation)
            const playObject = returnObject(Ping)

            const QueueData = {
                sinucaObject,
                pingObject,
                playObject
            }
            response.json(QueueData)

        } catch (error) {
            console.log(error)
            response.status(400).json({"msg": "Erro na requisição"});      
            
        }
    }
}