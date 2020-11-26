const useNodemailer = require("nodemailer");

const remetente = useNodemailer.createTransport({
    host: "SMTP.office365.com",
    service: "SMTP.office365.com;",
    port: 587,
    secure: false,
    auth:{
    user: "lucasmicco@hotmail.com",
    pass: "" }
    });

    const emailASerEnviado = {
        from: "lucasmicco@hotmail.com",
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

         

         
         
         