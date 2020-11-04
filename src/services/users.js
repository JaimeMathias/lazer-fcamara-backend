require('dotenv/config');


const db = require('../database/index');
const client = db.default;

exports.UsersGetAll = async (request, response) => {
    try {
        client.query("SELECT * FROM tb_users where id_user = $1", [1], (err, result) => {
            response.json({msg: "Sucess"})
            console.log(client.options)
            console.log('resultado => ',result.rows)
        })  
        
    }  
     catch (Error) {
        response.json({"msg": "failure"})
        console.log('era para ser uma connect => ',client)
        
    }

}
       