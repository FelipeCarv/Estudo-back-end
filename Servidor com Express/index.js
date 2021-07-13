const express = require('express');// chamando a biblioteca express para a variável.
const app = express();//inicializando a função express.
app.use(express.json());//para que o express consiga utilizar dados do tipo json
const { v4: uuidv4} = require('uuid');//fornece um ID.

const alunos = {};

app.listen(8080, ()=>{//iniciando e configurando o servidor na porta 8080.
    console.log("Servidor pronto na porta 8080!");
});

//configurando o metodo http "GET".
app.get('/', (req,res)=>{//ao utilizar o metodo http 'GET' - '/', será efetuado o envio de uma mensagem.
    res.json({msg: 'Diga oi para o Express!'});//recebe um objeto e converte os dados para json.
});

//Realiza a listagem de todos os alunos.
app.get('/alunos', (req,res)=>{
    res.json({alunos: Object.values(alunos)});//Convertendo as informações recebidas do objeto em JSON.
});

app.post('/alunos', (req, res)=>{
    const aluno = req.body;
    const idAluno = uuidv4();
    aluno.id = idAluno;
    alunos[idAluno] = aluno;
    res.json({msg: "Aluno criado com sucesso!"});
});

app.put('/alunos', (req, res)=>{
    const id = req.query.id;
    if(id && alunos[id]){//se o id existir e no vetor de alunos também existir aquele id
        const aluno = req.body;//recebendo os dados do aluno no corpo da requisicao
        aluno.id = id;//garantindo que o id do aluno permaneça o mesmo
        alunos[id] = aluno;//alterando os dados no vetor alunos
        res.json({msg: "Aluno atualizado com sucesso!"});
    }else{
        res.status(400).json({msg: "Aluno não encontrado!"});
    }
});

app.delete('/alunos', (req, res) => {
    const id = req.query.id;//recebendo o id do aluno por meio da query
    if (id && alunos[id]){
        delete alunos[id];//função delete para excluir o objeto aluno pertencente aquele id
        res.json({msg: "Aluno deletado com sucesso!"});
    }else{
        res.status(400).json({msg: "Aluno não encontrado!"});
    }
})