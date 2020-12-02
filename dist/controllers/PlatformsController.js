"use strict";const { Platforms } = require("../models");

module.exports = new (class PlatformsController {
  async store(request, response) {
    try {
      const { name, location } = request.body;
      const platform = await Platforms.create({ name: name, location });

      response.status(201).json({ msg: "created at success" });
    } catch (error) {
      console.log(error);
      response.status(500).json({ msg: "Failure to create" });
    }
  }

  async index(request, response) {
    try {
      const { id } = request.params;

      const platform = await Platforms.findOne({
        attributes: ["id", "name", 'location'],
        where: { id },
      });

      if (platform == "" || platform == null) {
        response.status(404).json({ msg: "Platform not found" });
      }
      response.status(200).json(platform);
    } catch (error) {
      console.log(error);
      response.status(500).json({ msg: "Server error" });
    }
  }

  async indexAll(request, response) {
    try {
      const platform = await Platforms.findAll({
        attributes: ["id", "name", 'location'],
      });

      if (platform != "") {
        return response.status(200).json(platform);
      }
    } catch (error) {
      console.log(error);
      response.status(404).json({ msg: "Platforms not found" });
    }
  }

  async update(request, response) {
    try {
      const { name } = request.body;

      const { id } = request.params;

      const platform = await Platforms.findOne({
        attributes: ["id", "name"],
        where: { id },
      });

      if (!platform) response.status(404).json({ msg: "Platform not found" });
      const preData = [platform.name];

      if (platform) {
        const final = await platform.update({
          name: name != "" ? name : preData[0],
        });
        return response.status(200).json(final);
      }
    } catch (error) {
      console.log(error);
      response.status(400).json({ msg: "Bad Request" });
    }
  }

  async remove(request, response) {
    try {
      const { id } = request.params;

      const platform = await Platforms.findOne({
        attributes: ["id"],
        where: { id },
      });

      if (!platform) {
        return response.status(400).json({ error: "Platform not found" });
      }

      if (platform != "") {
        await Platforms.destroy({
          where: {
            id: platform.id,
          },
        });
        return response
          .status(200)
          .json({ msg: "Platform deleted with sucess" });
      }
    } catch (error) {
      console.log(error);
      response.status(400).json({ msg: "Bad Request" });
    }
  }
})();
