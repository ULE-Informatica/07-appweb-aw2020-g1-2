const Sequelize = require('sequelize');
const db = require('../config/database');

const Usuario = db.define('usuario', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false

    },
    nombreUsuario: {
        type: DataTypes.STRING,
        unique: true,
        validate: {len: [5, 50]},
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {isEmail: ture},
        allowNull: false
    },

    contrasena: {
        type: DataTypes.STRING,
        validate: {len: [5, 50]},
        allowNull: false
    },

}, {
    tableName: 'usuarios'
});
