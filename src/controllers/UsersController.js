const { Users } = require("../models");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const crypto = require('crypto')
module.exports = new (class UserController {
  async index(request, response) {
    try {
      const { id } = request.params;

      const user = await Users.findOne({
        attributes: ["id", "name", "email", "id_filial"],
        where: {
          id,
        },
      });

      if (user == "" || user == null) {
        response.status(400).json({ msg: "User not found" });
      }

      response.status(200).json(user);
    } catch (error) {
      console.log(error);
      response.status(500).json({ msg: "Error on server" });
    }
  }

  async indexAll(request, response) {
    try {
      const user = await Users.findAll({
        attributes: ["id", "name", "email", "id_filial"],
      });

      if (user != "") {
        return response.status(200).json(user);
      }
    } catch (error) {
      response.status(500).json({ msg: "Error on server" });
    }
  }

  async store(request, response) {
    try {
      const { name, password, filial, email } = request.body;

      let regex_validate = /^[a-z0-9.]+@fcamara.com.br$/;

      if (!email.match(regex_validate)) {
        return response.status(400).json({ msg: "e-mail is not allowed, try again using @fcamara.com.br" });
      }

      let hash = crypto.createHash('md5').update(password).digest("hex")

      console.log(hash)
      
      const user = await Users.create({
        name,
        id_filial: filial,
        email,
        password: hash,
        receiveEmail: true
      });

      
      if (user) {
        let id = user.id;
        let token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 10000,
        });

        return response.status(200).json({ msg: "Usuário criado", token });
      }

    } catch (error) {
      if (error.errors[0]["type"] == "unique violation") {
        response.status(400).json({ msg: "e-mail is existent, try again using other" });
      }

      response.status(500).json({ msg: "Error on server" });
    }
  }
  async remove(request, response) {
    try {
      const { id } = request.params;

      const user = await Users.findOne({
        attributes: ["id", "name", "email", "id_filial"],
        where: {
          id,
        },
      });

      if (user == null)
        return response.status(400).json({ msg: "User not found" });

      if (user != "") {
        await Users.destroy({
          where: {
            id: user.id,
          },
        });
        return response.status(200).json({ msg: "User deleted with sucess" });
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({ msg: "Error on server" });
    }
  }
  async update(request, response) {
    try {
      const { name, password, email } = request.body;

      const { id } = request.params;

      const user = await Users.findOne({
        attributes: ["id", "name", "email", "id_filial", "password"],
        where: {
          id,
        },
      });

      if (!user) {
        response.status(400).json({ msg: "User not found" });
      }
      const preData = [user.name, user.password, user.email];

      if (user) {
        const final = await user.update({
          name: name != "" ? name : preData[0],
          password: password != "" ? password : preData[1],
          email: email != "" ? email : preData[2],
        });

        let regex_validate = /^[a-z0-9.]+@fcamara.com.br$/;

        if (!email.match(regex_validate)) {
          return response.status(400).json({ msg: "e-mail is not allowed, try again using @fcamara.com.br" });
        }

        return response.status(200).json(final);
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({ msg: "Update not available" });
    }
  }
})();
