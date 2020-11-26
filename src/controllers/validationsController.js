const useNodemailer = require("nodemailer");

const remetente = useNodemailer.createTransport({
    host: "SMTP.office365.com",
    service: "SMTP.office365.com;",
    port: 587,
    secure: false,
    auth:{
    user: "squad4fifo@hotmail.com",
    pass: "fifoquad4" }
    });

    const emailASerEnviado = {
        from: "squad4fifo@hotmail.com",
        to: ",lucas@nauticarefrigeracao.com.br",
        subject: "Enviando Email com Node.js",
        text: "Estou te enviando este email com node.js",
        };


    remetente.sendMail(emailASerEnviado, function(error){
        if (error) {
        console.log(error);
        } else {
         console.log("Email enviado com sucesso.");
        }
         });
         

         


         
         
         