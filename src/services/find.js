const db = require('../database/index');
const client = db.default;

class Find {
    async FindAll (request, response)  {
        try {
                client.query("SELECT * FROM tb_users",(err, result) => {
                    response.json(result.rows)
                    return;
                })
        }
         catch (Error) {
            response.json({"msg": "failure"});
        }
    }

    async FindUnique (request, response) {
        try {
            client.query("SELECT * FROM tb_users where id_user = $1",[request.params.id],(err, result) => {
                console.log(err)
                response.json(result.rows)
                console.log('resultado => ',result.rows)
                return;
            })
        } catch (error) {
            response.json({"msg": "failure"})
        }
    }
}
