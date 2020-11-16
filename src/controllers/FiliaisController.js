const {Filials} = require ('../models')

module.exports = new class createFilials {

async store (request, response) {
  try {
    const { filial1 } = request.body;
    const FilialCreate = await Filials.create({location : filial1})

    response.status(200).json({"msg": "Criado com sucesso!"})

    } catch (error) {
      console.log (error)
      response.status(400).json({"msg": "Falha no cadastro"})
    }
  }
}
