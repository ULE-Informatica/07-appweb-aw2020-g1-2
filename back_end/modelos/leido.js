const Sequelize = require('sequelize');
const db = require('../config/database');

const Leido = db.define('leido', {
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

    nota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {min: 0, max: 10}
    },

}, {
    tableName: 'leidos'
});


