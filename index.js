// index.js
require('dotenv').config();

const express = require("express");
const conn = require('./db/conn');
const Jogos = require("./models/Jogo")
const Usuario = require('./models/Usuario');
//novo
const handlebars = require("express-handlebars");
const Cartao = require('./models/Cartao');
const Jogo = require('./models/Jogo');
const Conquista = require('./models/Conquista');

const app = express();

//novo
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ urlencoded: true }));
app.use(express.json());

//Usuário
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
});

//Jogos

app.get("/jogos/formularioJogos", (req, res) => {
    res.render(`formularioJogos`);
});

app.post("/jogos/formularioJogos", async (req, res) => {
    const dadosJogos = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        preco: req.body.preco
    };
    const jogo = await Jogos.create(dadosJogos);

    res.send(`Jogo Cadastrado com o id ${jogo.id} <a href="/jogos/formularioJogos">Voltar</a>`)
});

app.get("/", (req, res) => {
    res.render(home);
});

app.get("/jogos", async(req, res) => {
    const jogos = await Jogos.findAll({raw:true});
    res.render("jogos", {jogos})
});

app.get("jogos/:id/atualizar", async(req, res) => {
    const id = req.params.id;

    const dadosJogos = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        preco: req.body.preco
    }
    const registroAfetados = await Usuario.update(dadosJogos, {where: {id: id}})
    if (registroAfetados > 0) {
        res.redirect("/jogos")
    } else {
        res.send("Erro ao atualizar Jogo!")
    }
});

app.post("/jogos/excluir", async (req, res) => {
    const id = req.body.id;

    const registroAfetados = await Jogos.destroy({
        where:{ id:id},
    })
    if (registroAfetados > 0){
        res.redirect("/jogos");
    } else {
        res.send("Erro ao excluir Jogo.")
    }
});







//Rotas Cartões
//Ver cartões do usuário
app.get("/usuarios/:id/cartoes", async (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = await Usuario.findByPk(id, { include: ["Cartaos"] });

    let cartoes = usuario.Cartaos;
    cartoes = cartoes.map((cartao) => cartao.toJSON())


    res.render("cartoes.handlebars", { usuario: usuario.toJSON(), cartoes });
});

//Formulário de cadastro de cartão
app.get("/usuarios/:id/novoCartao", async (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = await Usuario.findByPk(id, { raw: true });

    res.render("formCartao", { usuario });
});

//Cadastro de cartão
app.post("/usuarios/:id/novoCartao", async (req, res) => {
    const id = parseInt(req.params.id);

    const dadosCartao = {
        numero: req.body.numero,
        nome: req.body.nome,
        codSeguranca: req.body.codSeguranca,
        UsuarioId: id,
    };

    await Cartao.create(dadosCartao);

    res.redirect(`/usuarios/${id}/cartoes`);
});

//Rotas Conquista
//Ver Conquistas do Usuário
app.get("/jogo/:id/conquista", async (req, res) => {
    const id = parseInt(req.params.id);
    const jogo = await Jogo.findByPk(id, { include: ["Conquistas"] });

    let conquista = jogo.Conquistas;
    conquista = conquista.map((conquista) => conquista.toJSON())


    res.render("conquista.handlebars", { jogo: jogo.toJSON(), conquista });
});

//Formulário de cadastro de conquista
app.get("/jogos/{{this.id}}/conquista", async (req, res) => {
    const id = parseInt(req.params.id);
    const jogo = await Jogo.findByPk(id, { raw: true });

    res.render("formConquista", { jogo });
});

//Cadastro de conquista
app.post("/jogos/{{this.id}}/conquista", async (req, res) => {
    const id = parseInt(req.params.id);

    const dadosConquista = {
        nomenomeJogador: req.body.nomeJogador,
        conquistaAdq: req.body.conquistaAdq,
        UsuarioId: id,
    };

    await Conquista.create(dadosConquista);

    res.redirect(`/jogos/${id}/conquista`);
});










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



