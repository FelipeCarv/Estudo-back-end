const express = require('express')
const router = express.Router()
const postMid = require('../middleware/validarPost.middleware');
const { Post, Usuario } = require('../db/models');//selecionando o "post" dos modelos criados no banco de dados.
const path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')//caminho do arquivo para salvar
    },
    filename: function (req, file, cb) {
         cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))//tipo/DataAtual/formatoDoArquivo
    }
})


const fileFilter = (req, file, cb) => {//filtrar os tipos de arquivos suportados pelo sistema
    const extensoes = /jpeg|jpg|png/i
    if(extensoes.test(path.extname(file.originalname))){
        cb(null, true);
    }else{
        return cb('Arquivo não suportado.');
    }
}


var upload = multer({storage: storage, fileFilter: fileFilter});//passando pra função, um objeto contendo o caminho para salvar os uploads

router.post('/', upload.single('foto'));
router.post('/', postMid);
router.put('/', postMid);


router.get('/:id', async (req, res) => {
    const posts = await Post.findByPk(req.params.id, 
        {include:[{model: Usuario}], raw: true, nest: true});// consultar no BD a PK(ID) e retornar o post referente ao PK.
        const postsProcessado = prepararResultado(posts);//função que refina a impressão dos dados na tela
    res.json({posts: postsProcessado});
})

router.get('/', async (req, res) => {
    const post = await Post.findAll();// consultar o BD e retornar todos os posts.
    res.json({posts: post});
})

router.post('/:id/upload', upload.single('foto') , async (req, res)=>{
    console.log(req.file);

    const id = req.params.id;
    const post = await Post.findByPk(id);

    if(post){
        post.foto = `/static/uploads/${req.filename}`;
        await post.save();
        res.json({msg: "Upload realizado com sucesso!"})
    } else{
        res.json({msg: "post não localizado!"})
    }
})

router.post('/', async (req, res) => {
    const data = req.body;
    if(req.file){
        data.foto = `/static/uploads/${req.filename}`;
    }
    const post = await Post.create(data);// adicionando uma nova postagem no banco de dados
    res.json({msg: "Post adicionado com sucesso!"})
})

router.delete('/', async (req, res) => {
    const id = req.query.id//recebendo o id pela query
    const post = await Post.findByPk(id); //buscando no BD o post referente ao ID recebido pela query

    if (post){//se a postagem existir
        await post.destroy();//deleta a postagem da tabela
        res.json({msg: "Post deletado com sucesso!"})
    }else{
        res.status(400).json({msg: "Post não encontrado!"})
    }
})

router.put('/', async (req, res) => {
    const id = req.query.id;
    const post = await Post.findByPk(id);

    if (post){
       post.titulo = req.body.titulo;// recebendo o titulo pelo corpo da nossa requisição
       post.texto = req.body.texto;// recebendo o texto pelo corpo da nossa requisição
       await post.save();//salvando as alterações no banco de dados.
       res.json({msg: "Post atualizado com sucesso!"})
    }else{
        res.status(400).json({msg: "Post não encontrado!"})
    }
})


function prepararResultado(posts){
    const result = Object.assign({}, posts);
    
    if(result.createdAt) delete result.createdAt
    if(result.updatedAt) delete result.updatedAt
    if(result.userId) delete result.userId

    if(result.Usuario){
        if(result.Usuario.senha) delete result.Usuario.senha
        if(result.Usuario.createdAt) delete result.Usuario.createdAt
        if(result.Usuario.updatedAt) delete result.Usuario.updatedAt
    }
    return result
}

module.exports = router