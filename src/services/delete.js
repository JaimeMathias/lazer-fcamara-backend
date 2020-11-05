const db = require('../database/index');
const client = db.default;

exports.DeleteById = async (request, response) => {
    try {
        
        let id = request.params.id != undefined ? request.params.id : false ;
        if(id) {
            
            client.query("DELETE FROM tb_users where id_user = $1", [id], (err, res) => {                
                if(res.rowCount < 1) {
                    response.send({"msg": "Usuario inexistente", "code": 404})
                    return false;
                }
                response.json({"msg": "Usuario deletado", "code": 202})
            })  
        }
    }  
     catch (Error) {
        response.json({"msg": "Failure", "code": 400})        
    }

}
       