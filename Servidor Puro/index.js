const http = require('http'); //chamando o pacote http.

const server = http.createServer((req,res)=> {//criando o servidor apartir do pacote http criado anteriormente
    switch(req.url){//req.url -> path digitado pelo cliente /aluno
        case '/aluno':
            alunoRouter(req, res);//função de requisição e resposta 
            break;
        default://caso de algum erro com o path
            res.writeHead(404, {'Conte-type':"text/json"});
            res.write(JSON.stringify({msg: "Sentimos muito, Path nao encontrado!"}));
            res.end();
    }   
})

server.listen(8080, ()=>{//confirmando sucesso na criação do servidor
    console.log("servidor Pronto na porta 8080!");
})

function alunoRouter(req, res) {
    switch(req.method){//req.method-> Metodo utilizado pelo http

        case 'GET':// vai listas os alunos cadastrados
            console.log(req.method);
            res.writeHead(200, { 'Content-type': "text/json" });
            res.write(JSON.stringify({ alunos: ["Felipe", "Pedro", "Eduarda"] }));
            res.end();
            break;

        case 'POST':// vai informar que um aluno foi criado
            console.log(req.method);
            res.writeHead(200, { 'Content-type': "text/json" });
            res.write(JSON.stringify({ msg: "Parabens, Aluno Criado com Sucesso!" }));
            res.end();
            break;

        default: // caso o metodo http não for um metodo informado, a operação não será suportada.
            console.log(req.method);
            res.writeHead(400, { 'Content-type': "text/json" });
            res.write(JSON.stringify({ msg: "Operacao nao Suportada!" }));
            res.end();
    }
  
}
