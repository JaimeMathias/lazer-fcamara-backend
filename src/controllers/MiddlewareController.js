const { Platforms, Queues } = require('../models');
const validationsController = require('../controllers/validationsController');
const users = require('../models/users');

    module.exports = new class QueuesController {

    async notification (request, response) {
        count = response.locals.position 
        user = response.locals.userId
        const  userData = await user.findOne({
            where: {
            position: users.position,
            emailStatus: users.receiveEmail
            }
        })
            try{
                validationsController.init()

                emailASerEnviado = {
                    from: "fifosquad4@hotmail.com",
                    to: ",rafaelhmmartins@gmail.com",
                    subject: "Enviando Email com Node.js",
                    text: "Estou te enviando este email com node.js",
                    }; 
            
            if (userData.receiveEmail == true && userData.position == 2 ){
                emailASerEnviado.subject = 'Sua vez está chegando'
                emailASerEnviado.text = 'Fique atento, você é o próximo na fila!'
                console.log("Email enviado com sucesso.");
            }
            else if (userData.receiveEmail == true && userData.position == 1) {
                emailASerEnviado.subject = 'Sua vez chegou!'
                emailASerEnviado.text = 'É sua vez! tenha um bom jogo.'
                console.log("Email enviado com sucesso.");
            } 
            response.json({'msg': 'position', })
        }catch(error){
            console.log(error);
        }
    }
}
