const Sequelize = require('sequelize');
const db = require('../config/database');

const Lista = db.define('lista', {
    idUsuario: {
        type: DataTypes.INTEGER,
        unique: 'compositeIndex',
        allowNull: false,
        references: {
            model: Usuario,
            key: idUsuario
        }

    },
    idLibro: {
        type: DataTypes.INT,
        unique: 'compositeIndex',
        allowNull: false,
        references: {
            model: Libro,
            key: idLibro
        }
    },

    fecha: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.DATEONLY,
        allowNull: false
    },

    comentario: {
        type: DataTypes.STRING,
        validate: {len: [0, 500]},
    },


}, {
    tableName: 'lista'
});
