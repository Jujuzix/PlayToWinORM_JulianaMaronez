const db = require('../db/conn')
const {DataTypes} = require("sequelize");

const Jogos = db.define("Jogos",{
    id:{
        type:DataTypes.NUMBER,
        require: true,
    },
    titulo:{
        type:DataTypes.STRING,
        require: true,
    },
    descricao:{
        type:DataTypes.STRING,
        require: true,
    },
    preco:{
        type:DataTypes.DOUBLE,
        require: true,
    }
});

module.exports = Jogos;