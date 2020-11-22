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

        // validates if user is stored before
    if(User != null)  {
            await User.update({
                status_user: true
            })
        response.status(201).json({"msg": 'User is on queue'});
    } 

    if(!User) {
        // create the log of user on queue database
        await Queues.create({
            id_user: user,
            id_platform: platform,
            status_user: true
        })
        response.status(201).json({"msg": 'User is on queue'})
    }
        } catch(err) {
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
}