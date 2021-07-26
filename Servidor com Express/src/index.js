const express = require('express');// chamando a biblioteca express para a variável.
const app = express();//inicializando a função express.
app.use(express.json());//para que o express consiga utilizar dados do tipo json

const rotaUsuario = require('./rotas/usuario.rota');//importando o arquivo rota.usuario
const rotaPost = require('./rotas/posts.rota');//importando o arquivo posts.rota
var expressLayouts = require('express-ejs-layouts');
const indexRoute = require('./rotas/index.rota')


app.use('/api/usuarios', rotaUsuario);//definindo a rota "usuarios".
app.use('/api/posts', rotaPost);//definindo a rota "post".


app.use('/static', express.static('public'));
app.use(expressLayouts);

app.set('view engine', 'ejs');//dizendo ao express que estamos utilizando o ejs
app.set('layout', 'layouts/layout');
app.use('/', indexRoute)

app.listen(8080, ()=>{//iniciando e configurando o servidor na porta 8080.
    console.log("Servidor pronto na porta 8080!");
    console.log(`Iniciando no ambiente ${process.env.NODE_ENV}`);
});

//configurando o metodo http "GET".
app.get('/api', (req,res)=>{//ao utilizar o metodo http 'GET' - '/', será efetuado o envio de uma mensagem.    
    res.json({msg: 'Diga oi para o Express!'});//recebe um objeto e converte os dados para json.
});



