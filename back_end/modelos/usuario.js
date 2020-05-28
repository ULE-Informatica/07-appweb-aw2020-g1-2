const { Sequelize, Op, Model, DataTypes } = require("sequelize");
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
        validate: {
            len: {
                args: [5, 50],
                msg: 'El nombre debe tener entre 5 y 50 carácteres'        
            }
        },
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: 'El email debete tener un formato válido ( xxx@xxx.xxx)'
            }, 
            len: {
                args: [5, 50],
                msg:'Email requerido'
            }
        },
        allowNull: false
    },

    contrasena: {
        type: DataTypes.STRING,
        validate: {
            len: {
                args: [5, 50],
                msg: 'La contraseña debe tener entre 5 y 10 carácteres'
            },
        },
        allowNull: false
    },

}, {
    tableName: 'usuarios',
    
});

module.exports = Usuario;
