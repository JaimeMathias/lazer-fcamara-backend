const { Platforms, Queues } = require("../models");

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

      /*
       * @ retorna a posição do usuário e a fila
       */

      const Fila = await Queues.findAll({
        where: {
          id_platform: platform,
	        status_user: true
        },
        order: [["updatedAt", "ASC"]],
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
        response.status(201).json({ msg: "User is on queue", position: count });
      }

      if (!User) {
        // create the log of user on queue database
        await Queues.create({
          id_user: user,
          id_platform: platform,
          status_user: true,
        });
        response.status(201).json({ msg: "User is on queue", position: count });
      }
    } catch (err) {
      console.log(err);
      response.status(400).json({ msg: "Plataform or user not exists" });
    }
  }

  async quit(request, response) {
    try {
      const user = response.locals.user.id;
      const { platform } = request.body;
      const User = await Queues.findOne({
        where: { id_user: user, id_platform: platform },
      });

      await User.update({
        status_user: false,
      });

      response.status(201).json({ msg: "Saiu com sucesso" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ msg: "Plataforma ou Usuário inexistentes" });
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

        // let stringName = name + ' - ' +location

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
      response.status(400).json({ msg: "Error on request" });
    }
  }
  async polling(request, response) {
    try {
      const user = response.locals.user.id;

      const { platform } = request.body;

      const Fila = await Queues.findAll({
        where: {
          id_platform: platform,
          status_user: true,
        },
        order: [["updatedAt", "ASC"]],
      });

      let count = 1;

      Fila.forEach((item) => {
        if (item.dataValues.id_user == user) {
          return count;
        }
        count = count + 1;
      });

      response.status(200).json({
        position: count
      });
    } catch (error) {
      console.log(error);
      response.status(400).json({
        msg: "Erro, ao requisitar dados",
      });
    }
  }
})();
