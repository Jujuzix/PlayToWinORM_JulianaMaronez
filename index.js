// index.js
require('dotenv').config();

const express = require("express");
const conn = require('./db/conn');
const Jogos = require("./models/Jogos")
const Usuario = require('./models/Usuario');
//novo
const handlebars = require("express-handlebars");

const app = express();

//novo
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ urlencoded: true }));
app.use(express.json());

app.get("/usuarios/formularioUsuario", (req, res) => {
    res.render(`formularioUsuario`);
})

app.post("/usuarios/formularioUsuario", async (req, res) => {
    const dadosUsuario = {
        nickname: req.body.nickname,
        nome: req.body.nome,
    };
    const usuario = await Usuario.create(dadosUsuario);

    res.send(`Usuário criado com o id ${usuario.id} <a href="/usuarios/formularioUsuario">Voltar</a> `)
})

app.get("/", (req, res) => {
    res.render(`home`);
})

app.get("/usuarios", async (req, res) => {
    const usuarios = await Usuario.findAll({ raw: true });
    res.render("usuarios", { usuarios })
})

app.get("/usuarios/:id/atualizar", async (req, res) => {
    const id = req.params.id
    const usuario = await Usuario.findByPk(id, { raw: true })
    res.render("formularioUsuario", { usuario });
})


//Rota para criar um novo dado de um usuario    
app.post("/usuarios/:id/atualizar", async (req, res) => {
    const id = req.params.id;

    const dadosUsuario = {
        nickname: req.body.nickname,
        nome: req.body.nome
    }
    const registroAfetados = await Usuario.update(dadosUsuario, { where: { id: id } })
    if (registroAfetados > 0) {
        res.redirect("/usuarios");
    } else {
        res.send("Erro ao atualizar usuário!")
    }
});

app.post("/usuarios/excluir", async (req, res) => {
    const id = req.body.id;

    const registroAfetados = await Usuario.destroy({
        where: { id: id },
    })
    if (registroAfetados > 0) {
        res.redirect("/usuarios");
    } else {
        res.send("Erro ao excluir usuário!")
    }
})

//Comando para iniciar o servidor
app.listen(8000, () => {
    console.log("Server rodando!");
    console.log("http://localhost:8000/")
})

// Sincroniza o modelo com o seu banco de dados
conn
    .sync()
    .then(() => {
        console.log('Está conectado e sincronizado corretamente com o banco de dados!');
    })
    .catch((err) => {
        console.log('Ocorreu um erro e não está sendo sincronizado mais' + err);
    })




conn
    .authenticate()
    .then(() => {
        console.log('Está conectado com sucesso!');

    })
    .catch((err) => {
        console.log('Ocorreu um erro' + err);
    })



/*app.get("/jogos/novo", (req, res) => {
    res.sendFile(`${__dirname}/views/formularioJogos.html`);
})

//Rota para criar um novo dado de jogo    
app.post("/jogos/novo", async (req, res) => {
    const dadosJogos = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        preco: req.body.preco
    };

    const jogos = await Jogos.create(dadosJogos);
    res.send("Jogo inserido sob o id" + jogos.id);
})
*/