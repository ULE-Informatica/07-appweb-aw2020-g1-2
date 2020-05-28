const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const db = require('../config/database');
const Usuario = require('./usuario')
const Libro = require('./libro')

const Leido = db.define('leido', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    idUsuario: {
        type: DataTypes.INTEGER,
        unique: 'compositeIndex',
        allowNull: false,
        references: {
            model: Usuario,
            key: 'idUsuario'
        }

    },
    idLibro: {
        type: DataTypes.INTEGER,
        unique: 'compositeIndex',
        allowNull: false,
        references: {
            model: Libro,
            key:'idLibro'
        }
    },

    fecha: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.DATEONLY,
        allowNull: false
    },

    comentario: {
        type: DataTypes.STRING,
        validate: {len: [0, 500]},
    },

    nota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {min: 0, max: 10}
    },

}, {
    tableName: 'leidos'
});

module.exports = Leido;

