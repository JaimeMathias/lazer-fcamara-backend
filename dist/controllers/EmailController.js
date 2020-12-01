"use strict";const nodemailer = require("nodemailer");
const { Emails } = require('../models')
module.exports = new class Email {
    
    async SendEmail(object, id, type) {
        const transporter = nodemailer.createTransport({
            host: "smtp.live.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: 'fifosquad4@hotmail.com', 
            pass: 'squad4fifo', 
          },
            tls: { rejectUnauthorized: false }
          });
    
          let info = await transporter.sendMail({
          from: '"Fifo FCAMARA 👻" <>', // sender address
          to: "souza.joaoguilherme2002@gmail.com, ", // list of receivers
          subject: object.title, // Subject line
          text: object.textMessage, // plain text body
          html: object.htmlMessage, // html body
        });

        await Emails.create({
            id_user: id,
            id_msg: info.messageId,
            typeId: type
        })
        console.log(info)
      }
      
}
