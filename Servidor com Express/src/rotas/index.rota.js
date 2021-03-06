const express = require('express')
const router = express.Router()
const { Post, Usuario } = require('../db/models');//selecionando o "post" dos modelos criados no banco de dados.
const moment = require('moment');
moment.locale('pt-br');

router.get('/', async (req, res) => {
    const post = await Post.findAll({
        limit: 10,
        order:[['createdAt', 'DESC']],
        include: [{model: Usuario}],
        raw: true, 
        nest: true});

    const postResult = post.map((post)=> prepararResultado(post));
    console.log(postResult);
    res.render('pages/posts', {post: postResult, layout: 'layouts/layout-blog.ejs'})
})

router.get('/post/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id, 
        {include: [{model: Usuario}], raw: true, nest: true})
    res.render('pages/post', {post:prepararResultado(post), layout: 'layouts/layout-blog.ejs'})
})


function prepararResultado(posts){
    const result = Object.assign({}, posts);
    
    result.postadoEm = moment(new Date(result.createdAt)).format('DD [de] MMMM [de] yyyy [as] HH:mm')

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