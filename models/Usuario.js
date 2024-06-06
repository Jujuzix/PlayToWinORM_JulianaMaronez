const conn = require('../db/conn')
const { DataTypes } = require("sequelize");

const Usuario = conn.define("Usuario", {
    nickname: {
        type: DataTypes.STRING,
        require: true,
    },
    nome: {
        type: DataTypes.STRING,
        require: true,
    },
});

module.exports = Usuario;
