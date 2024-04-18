// index.js

require('dotenv').config();
const express = require("express");
const conn = require('./db/conn');
const Jogos = require("./models/Jogos")

const app = express();

app.use(
    express.urlencoded({
        extended: true,
    })
); 

app.use(express.json());

// Rota para ser exibido o formulário para ser inserido os dados
app.get("/jogos/novo", (req, res) =>{
    res.sendFile(`${__dirname}/views/formularioJogos.html`); 
})

//Rota para criar um novo dado    
    app.post("/jogos/novo", async (req, res) =>{
      const dadosJogos ={
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        preco: req.body.preco
      };

      const jogos = await Jogos.create(dadosJogos);
      res.send("Jogo inserido sob o id" + jogos.id);
    })

    //Comando para iniciar o servidor
    app.listen(8000, () => {
        console.log("Server rodando!");
    })

// Sincroniza o modelo com o seu banco de dados
conn
   .sync()
   .then(() => {
    console.log('Está conectado e sincronizado corretamente com o banco de dados!');
})
.catch((err)=>{
    console.log('Ocorreu um erro e não está sendo sincronizado mais'+ err);
})



/*const Usuario = require('./models/Usuario');*/
/*conn
.authenticate()
.then(() => {
    console.log('Está conectado com sucesso!');

})
.catch((err)=>{
    console.log('Ocorreu um erro'+ err);
})
*/