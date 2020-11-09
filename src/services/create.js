const db = require('../database/index');
const client = db.default;

exports.Create = async (request, response) => {

    try {
        const form = request.body
        client.query("INSERT INTO tb_users (id_user, nome, email, senha, id_filial) values ($1, $2, $3, $4, $5)", [form.id_user, form.nome,form.email, form.senha, form.id_filial], (err, result) => {
            if(err) {
                console.log('Erro encontrado =>', err)
                return;
            }
            response.send('Usuario criado!');
        })
    }
     catch (Error) {
        response.json({"msg": "failure"})
        console.log('era para ser uma connect => ',client)
    }

}
