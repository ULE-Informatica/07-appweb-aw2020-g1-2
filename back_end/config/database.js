const { Sequelize, Op, Model, DataTypes } = require("sequelize");

//Creamos conexión a la base de datos
const sequelize = new Sequelize('aw_pfinal', 'root', 'david98', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

module.exports = sequelize