const Sequelize = require('sequelize');
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
        validate: {len: [5, 50]},
        allowNull: false
    },

    autor: {
        type: DataTypes.STRING,
        unique: 'compositeIndex',
        validate: {len: [5, 50]},
        allowNull: false
    },

    resumen: {
        type: DataTypes.STRING,
        validate: {len: [0, 500]},
    },

    genero: {
        type: DataTypes.STRING,
        validate: {len: [0, 50]},
    },

    idioma: {
        type: DataTypes.STRING,
        unique: 'compositeIndex',
        validate: {len: [1, 50]},
        allowNull: false
    },

    linkDescarga: {
        type: DataTypes.STRING,
        defaultValue: 'dirección de descarga',
        validate: {len: [1, 100]},
        allowNull: false
    },

    linkImagen: {
        type: DataTypes.STRING,
        validate: {len: [1, 100]},
    },

    unidades: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {isInt: true},
        allowNull: false 
    }

}, {
    tableName: 'libros'
});

await Libro.sync({
    alter: true
});
