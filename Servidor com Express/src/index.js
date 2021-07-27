const express = require('express');// chamando a biblioteca express para a variável.
const app = express();//inicializando a função express.
app.use(express.json());//para que o express consiga utilizar dados do tipo json

const rotaUsuario = require('./rotas/usuario.rota');//importando o arquivo rota.usuario
const rotaPost = require('./rotas/posts.rota');//importando o arquivo posts.rota
var expressLayouts = require('express-ejs-layouts');
const indexRoute = require('./rotas/index.rota')

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api.yaml');
const logger = require('./utils/logger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const helmet = require('helmet');

app.use(helmet());


app.use('/api/usuarios', rotaUsuario);//definindo a rota "usuarios".
app.use('/api/posts', rotaPost);//definindo a rota "post".


app.use('/static', express.static('public'));
app.use(expressLayouts);

app.set('view engine', 'ejs');//dizendo ao express que estamos utilizando o ejs
app.set('layout', 'layouts/layout');
app.use('/', indexRoute)


const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    logger.info(`Iniciando no ambiente ${process.env.NODE_ENV}`)
    logger.info(`Servidor pronto na porta ${PORT}`)
})

//configurando o metodo http "GET".
app.get('/api', (req,res)=>{//ao utilizar o metodo http 'GET' - '/', será efetuado o envio de uma mensagem.    
    res.json({msg: 'Diga oi para o Express!'});//recebe um objeto e converte os dados para json.
});



