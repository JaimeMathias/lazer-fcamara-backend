const db = require('../database/index');
const client = db.default;

exports.Create = async (request, response) => {
    
    try {
        const form = request.body 
        client.query("INSERT INTO tb_users (nome, email, senha, id_filial) values ($1, $2, $3, $4)", [form.nome, form.email, form.senha, form.filial], (err, result) => {   
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
