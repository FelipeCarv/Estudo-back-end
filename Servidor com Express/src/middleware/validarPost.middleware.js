const postSchema = require('../schema/post.schema');//importando o schema
const Ajv = require('ajv');//chamando o ajv para validação
const ajv = new Ajv();//objeto ajv criado


function validarPost(req, res, next){//requisição, resposta e o next (se prossegue ou encerra).
    const post = req.body
    if(post.userId){
        post.userId = Number(post.userId);
    }
    const validate = ajv.compile(postSchema);//validate recebendo o formato de dados aceitos pelo schema
    const valid = validate(post);//valid recebendo se os dados são validos ou não.

    if(valid){
        next();
    }else{
        res.status(400).json({msg: "Dados inválidos!", errors: validate.errors});
    }
};


module.exports = validarPost;