const express = require('express');// chamando a biblioteca express para a variável.
const app = express();//inicializando a função express.
app.use(express.json());//para que o express consiga utilizar dados do tipo json

const rotaUsuario = require('./rotas/usuario.rota');//importando o arquivo rota.usuario
const rotaPost = require('./rotas/posts.rota');//importando o arquivo posts.rota

app.use('/usuarios', rotaUsuario);//definindo a rota "usuarios".
app.use('/posts', rotaPost);//definindo a rota "post".


app.listen(8080, ()=>{//iniciando e configurando o servidor na porta 8080.
    console.log("Servidor pronto na porta 8080!");
});

//configurando o metodo http "GET".
app.get('/', (req,res)=>{//ao utilizar o metodo http 'GET' - '/', será efetuado o envio de uma mensagem.
    res.json({msg: 'Diga oi para o Express!'});//recebe um objeto e converte os dados para json.
});

