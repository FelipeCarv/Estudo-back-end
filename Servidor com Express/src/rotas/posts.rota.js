const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const postMid = require('../middleware/validarPost.middleware');
const { Post } = require('../db/models');//selecionando o "post" dos modelos criados no banco de dados.


router.post('/', postMid);
router.put('/', postMid);


router.get('/:id', async (req, res) => {
    const posts = await Post.findByPk(req.params.id);// consultar no BD a PK(ID) e retornar o post referente ao PK.
    res.json({posts: posts});
})

router.get('/', async (req, res) => {
    const post = await Post.findAll();// consultar o BD e retornar todos os posts.
    res.json({posts: post});
})

router.post('/', async (req, res) => {
    const post = await Post.create(req.body);// adicionando uma nova postagem no banco de dados
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

module.exports = router