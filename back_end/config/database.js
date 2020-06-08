const { Sequelize, Op, Model, DataTypes } = require("sequelize");

//Creamos conexión a la base de datos
const sequelize = new Sequelize('aw_pfinal', 'awuser', 'awpass', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

module.exports = sequelize