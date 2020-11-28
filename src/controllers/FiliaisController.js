const { Filials } = require("../models");

module.exports = new (class createFilials {
  async store(request, response) {
    try {
      const { name } = request.body;
      const FilialCreate = await Filials.create({ location: name });

      response
        .status(200)
        .json({ msg: "Criado com sucesso!", Filial: FilialCreate });
    } catch (error) {
      console.log(error);
      response.status(400).json({ msg: "Falha no cadastro" });
    }
  }
})();
