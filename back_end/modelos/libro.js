const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const db = require('../config/database');

const Libro = db.define('libro', {
    idLibro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    titulo: {
        type: DataTypes.STRING,
        unique: 'compositeIndex',
        validate: {
            len: {
                args: [1, 50],
                msg: 'El titulo debe tener entre 1 y 50 carácteres'
            }
            
        },
        allowNull: false
    },

    autor: {
        type: DataTypes.STRING,
        unique: 'compositeIndex',
        validate: {
            len: {
                args: [1, 50],
                msg: 'El nombre del autor debe tener entre 1 y 50 carácteres'
            }
            
        },
        allowNull: false
    },

    resumen: {
        type: DataTypes.STRING,
        validate: {
            len: {
                args: [0, 500],
                msg: 'El resumen no puede superar los 500 carácteres'
            }
            
        },
    },

    genero: {
        type: DataTypes.STRING,
        validate: {
            len: { 
                args: [0, 50],
                msg: 'El genero debe tener entre 1 y 50 carácteres'
            }
            
        },
    },

    idioma: {
        type: DataTypes.STRING,
        unique: 'compositeIndex',
        validate: {
            len: {
                args:[1, 50],
                msg: 'El idioma debe tener entre 1 y 50 carácteres'
            },

            
        },
        allowNull: false
    },

    linkDescarga: {
        type: DataTypes.STRING,
        defaultValue: 'dirección de descarga',
        validate: {len: [0, 100]},
    },

    linkImagen: {
        type: DataTypes.STRING,
        validate: {len: [0, 100]},
    },

    unidades: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            isInt:{
                args: true,
                msg: 'El valor de las unidades debe ser un número'
            } 
            
        },
        allowNull: false 
    }

}, {
    tableName: 'libros',
    
});

module.exports = Libro;
