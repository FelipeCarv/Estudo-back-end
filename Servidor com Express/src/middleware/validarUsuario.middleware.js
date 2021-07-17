const usuarioSchema = require('../schema/usuario.schema');//importando o schema
const Ajv = require('ajv');//chamando o ajv para validação
const ajv = new Ajv();//objeto ajv criado
const addFormats = require("ajv-formats");

addFormats(ajv);

function validaUsuario(req, res, next){
    const usuario = req.body
    const validate = ajv.compile(usuarioSchema);//validate recebendo o formato de dados aceitos pelo schema
    const valid = validate(usuario);//valid recebendo se os dados são validos ou não.

    if(valid){
        next();
    }else{
        res.status(400).json({msg: "Dados inválidos!", errors: validate.errors});
    }
};


module.exports = validaUsuario;