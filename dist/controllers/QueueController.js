"use strict";const { Platforms, Queues, Users, Emails } = require("../models");
const Email = require('../controllers/EmailController');
const msgs = require('./services/email')
module.exports = new (class QueuesController {
  async store(request, response) {
    try {
      const user = response.locals.user.id;

      const { platform } = request.body;
      console.log('O ERRO TA AQUI PARCEIRO', platform)
      const User = await Queues.findOne({
        where: {
          id_user: user,
          id_platform: platform,
        },
      });
      const ReceiveEmail = await Users.findOne({
        raw:true,
        attributes: ['receiveEmail'],
        where: {
          id: user
        }
      })
      /*
       * @ retorna a posição do usuário e a fila
       */
console.log(ReceiveEmail)
      const Fila = await Queues.findAll({
        where: {
          id_platform: platform,
	        status_user: true
        },
        order: [["updatedAt", "DESC"]],
      });

      
      let count = 1;
      Fila.forEach((item) => {
        if (item.dataValues.id_user == user) {
          return count;
        }
        count = count + 1;
      });

      if (User != null) {
        await User.update({
          status_user: true,
        });
        
        response.status(201).json({ msg: "User is on queue", position: count, notification:  ReceiveEmail.receiveEmail});
      }

      if (!User) {
        // create the log of user on queue database
        await Queues.create({
          id_user: user,
          id_platform: platform,
          status_user: true,
        });
        response.status(201).json({ msg: "User is on queue", position: count, notification:  ReceiveEmail.receiveEmail });
      }
    } catch (err) {
      console.log(err);
      response.status(500).json({ msg: "Server error." });
    }
  }

  async quit(request, response) {
    try {
      const user = response.locals.user.id;
      const { platform } = request.body;
      const User = await Queues.findOne({
        where: { id_user: user, id_platform: platform },
      });
      
      
      const UserMail = await Emails.findAll({
        where: {
          id_user: user
        }
      })

      if(UserMail == null) {
        const UserLog = await Emails.destroy({
          where: {
            id_user: user
          }
        })
      }
      

      await User.update({
        status_user: false,
      });

      response.status(201).json({ msg: "Exited with sucessfully" });
    } catch (error) {
      console.log(error);
      response.status(500).json({ msg: "Server error, try again!" });
    }
  }

  async disableNotification(request, response) {
    try {
      const user = response.locals.user.id;

      const atualStatus = await Users.findOne({
        raw: true,
        attributes: ['receiveEmail'],
        where: {
          id: user
        }
      })

      const args = atualStatus.receiveEmail == true ? false : true;

      const userUpdate = await Users.update(
        {receiveEmail: args},
        {where: {id: user}}
      )
      console.log(userUpdate)
      

    return response.status(200).json({
      msg: "Status updated with sucessfully"
    })
    } catch (error) {
      console.log(error)
      return response.status(500).json({
        msg: "Error on request"
      })
    }
  }
  

  async queueData(request, response) {
    try {
      const plat = await Platforms.findAll();

      let obj = {};
      let arr = [];
      var index = 0
      plat.forEach(async (platform, indice) => {
        index += 1;

        const storage = await Queues.findAll({
          raw: true,
          attributes: ["id_user", "id_platform"],
          where: {
            id_platform: index || 1,
	          status_user: true
          },
        });

        let { id, name, location } = platform;

        let stringName = name + ' - ' +location

        let size = storage.length;

        obj = {
          id_platform: id,
          size,
        };
        arr.push(obj);
        /*
                @ o loop so acaba quando percorrer todas as plataformas
                 */

        if (index == plat.length) {
          if(arr.length == plat.length) {
              // faz em ordem de tamanho apartir do array.size
            arr.sort(function (a, b) {
              
              if (a.size < b.size) {
                return 1;
              }
              if (a.size > b.size) {
                return -1;
              }

              return 0;
            });

            response.status(200).json(arr);
          } 
        }
      });

    } catch (error) {
      console.log(error)
      response.status(500).json({ msg: "Error on request" });
    }
  }
  async polling(request, response) {
    try {
      const user = response.locals.user.id; 
       
      const { platform } = request.params;

      const userEmail = await Users.findOne({
        raw:true,
        attributes: ['email', 'receiveEmail'],
        where: {
          id: user
        }
      })

      const emailsNoRepeat = await Emails.findAll({
        raw:true,
        attributes: ['id_msg', 'typeId'],
        where: {
          id_user: user
        }
      }) 

      const Fila = await Queues.findAll({
        where: {
          id_platform: platform,
          status_user: true,
        },
        order: [["updatedAt", "ASC"]],
      });

      let count = 1;

      Fila.forEach((item) => {
console.log(item.dataValues)
        if (item.dataValues.id_user == user) {
	console.log(item.dataValues.id_user,'=< id user')
console.log(user)    
      return count;
        } else {
        count = count + 1;
 }     });

      if(userEmail.receiveEmail == true && userEmail.receiveEmail == true) {
        if(emailsNoRepeat != null) {
          if(emailsNoRepeat.typeId == 1) Email.SendEmail(msgs.Next, user, 2);
          /* faz a lógica inversa, se o usuário ja tiver recebido email quando estava na posicao 2, ele vai receber o novo na posição 1 */
          if(emailsNoRepeat.typeId == 2) Email.SendEmail(msgs.Actual, user, 1); 
        } else {
          if(count == 1) {
            Email.SendEmail(msgs.Actual, user, 1);
          } else if(count ==2) {
            Email.SendEmail(msgs.Next, user, 2);
          }
        }
    } 

      response.status(200).json({
        position: count
      });
    } catch (error) {
      console.log(error);
      response.status(500).json({
        msg: "Error on server",
      });
    }
  }
})();
