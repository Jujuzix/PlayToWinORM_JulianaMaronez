const db = require('../db/conn')
const { DataTypes } = require("sequelize");

const Jogo = db.define("Jogo", {
    titulo: {
        type: DataTypes.STRING,
        require: true,
    },
    descricao: {
        type: DataTypes.STRING,
        require: true,
    },
    preco: {
        type: DataTypes.DOUBLE,
        require: true,
    }
});

module.exports = Jogo;