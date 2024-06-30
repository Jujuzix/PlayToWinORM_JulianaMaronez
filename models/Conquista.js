const db = require("../db/conn");
const { DataTypes } = require("sequelize");

const Jogo = require("./Jogo");

const Conquista = db.define(
    "Conquista",
    {
        conquistaAdq: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        nomeJogador: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
    },
    {
        tableName: "Conquista",
    }
);

Conquista.belongsTo(Jogo);
Jogo.hasMany(Conquista);

module.exports = Conquista;