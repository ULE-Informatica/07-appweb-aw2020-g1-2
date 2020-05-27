const Sequelize = require('sequelize');

//Creamos conexión a la base de datos
module.exports = new Sequelize('aw_pfinal', 'root', 'david98', {
    host: 'localhost',
    dialect: 'mysql'
});

