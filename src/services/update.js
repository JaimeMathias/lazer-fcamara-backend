const db = require('../database/index');
const client = db.default;

exports.UpdateById = async (request, response) => {
    
    try {
        client.query("SELECT * FROM tb_users where id_user = $1", [request.params.id], (err, result) => {   
            
            const body = request.body; // recebe os dados do formulario
            const old = result.rows[0]; // recebe os dados do id anterior

            let nome = body.nome == undefined || body.nome == "" ? old.nome : body.nome ;
            let email = body.email == undefined || body.email == "" ? old.email : body.email;
            let senha = body.senha == undefined || body.senha == "" ? old.senha : body.senha;

            try {
                client.query("UPDATE tb_users SET nome=$1, email=$2, senha=$3", [nome,email,senha]);
                response.json({msg: "Usuario atualizado"});
                return;
            } catch (error) {
                response.status(400).json({msg: "Failure"});
            }
        })   
    }  
     catch (Error) {
        response.json({"msg": "failure"})
        console.log('era para ser uma connect => ',client)
        
    }

}
       