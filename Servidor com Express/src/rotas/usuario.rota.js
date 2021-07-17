const express = require('express');
const router = express.Router();//chamando o roteador do express.
const { v4: uuidv4} = require('uuid');//fornece um ID.
const usuarioMid = require('../middleware/validarUsuario.middleware');//recebendo o retorno da função middleware.
const { Usuario } = require('../db/models');


router.post('/', usuarioMid);//em qualquer chamado do método post, será chamado a função middleware.
router.put('/', usuarioMid);//em qualquer chamado do método put, será chamado a função middleware.

//Realiza a listagem de todos os usuario.
router.get('/', async (req,res)=>{
    const usuario = await Usuario.findAll();//buscar todas as informações contidas na tabela.
    res.json({usuario: usuario});//Convertendo as informações recebidas do objeto em JSON.
});

router.get('/:id', async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);//vai consultar no BD a PK(ID) e retornar a info relacionada ao PK
    if (usuario){
      res.json({ usuario: usuario });
    }else{
      res.status(400).json({msg: "Usuário não encontrado!"});
    }
  })
  

router.post('/', async (req, res)=>{
        const usuario = await Usuario.create(req.body);//adicionando o usuário ao BD
        res.json({msg: "usuario criado com sucesso!"}); 
});

router.put('/', async (req, res)=>{
    const id = req.query.id;//recebendo a ID pela query da requisicao
    const usuario = await Usuario.findByPk(id);//buscando o usuário pela PK no BD

    if(usuario){
        usuario.email = req.body.email;
        usuario.senha = req.body.senha;
        await usuario.save();
        res.json({msg: "usuario atualizado com sucesso!"});
    }else{
        res.status(400).json({msg: "usuario não encontrado!"});
    }
});

router.delete('/', async (req, res) => {
    const id = req.query.id;//recebendo o id do usuario por meio da query
    const usuario = await Usuario.findByPk(id);
   if(usuario){
       try {
           await usuario.destroy();
           res.json({msg: "usuario deletado com sucesso!"});
       } catch (error) {
             res.status(500).json({msg: "Falha ao remover usuário"}); 
       }
   } else{
        res.status(400).json({msg: "usuario não encontrado!"});
   }
});

module.exports = router;//exportando a rota para ser utilizada em outros arquivos