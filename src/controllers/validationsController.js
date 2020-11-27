const useNodemailer = require("nodemailer");


module.exports = new class ValidationsController {

    async init(){
    const remetete = useNodemailer.createTransport({
    host: "SMTP.office365.com",
    service: "SMTP.office365.com;",
    port: 587,
    secure: false,
    auth:{
    user: "fifosquad4@hotmail.com",
    pass: "squad4fifo" }
    });
    }

    async sendMail(emailASerEnviado, error){
        if (error) {
        console.log(error);
        } else {
         console.log("Email enviado com sucesso.");
        }
         };
}     

         


         
         
         