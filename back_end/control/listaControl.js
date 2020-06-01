
var Sequelize = require ('sequelize')
var Op = Sequelize.Op;

//Modelos
var Usuario = require('../model/usuario')
var Lista = require('../model/lista')
var Favorito = require('../model/favorito')
var Leido = require ('../model/leido')
var Libro = require('../model/libro')
//Relaciones
Libro.belongsToMany(Lista, {through: 'ListaLibro'})
Libro.belongsToMany(Favorito, {through: 'FavoritoLibro'})
Libro.belongsToMany(Leido, {through: 'LibroLeido'})
Lista.hasMany(Libro, {foreignKey: 'idLibro'})
Favorito.hasMany(Libro, {foreignKey: 'idLibro'})
Leido.hasMany(Libro, {foreignKey: 'idLibro'})

Usuario.hasMany(Lista, {foreignKey: 'idUsuario'})
Lista.belongsTo(Usuario, {foreignKey: 'idUsuario'})
Usuario.hasMany(Favorito, {foreignKey: 'idUsuario'})
Favorito.belongsTo(Usuario, {foreignKey: 'idUsuario'})
Usuario.hasMany(Leido, {foreignKey: 'idUsuario'})
Leido.belongsTo(Usuario, {foreignKey: 'idUsuario'})

//FUNCIONES
function getAll(req, res) {
    Lista.findAll({
        include: [Usuario, Libro]
    }).then(lista => {
        if (lista) {
            res.json(lista);
        } else {
            res.status(404).send('No existe ninguna lista');
        }
    })
}
function get(req, res) {
    var id = req.params.id;
    console.log('Petición GET a /data/lista/:id => Devolviendo lista ' + id);
    Lista.findByPk(id).then((lista) => {
        res.json(lista);
    })
}
function add(req, res) {
    console.log('Petición POST a /data/lista => Creando una nueva lista');
    Lista.create({
        idUsuario: req.body.idUsuario,
        idLibro: req.body.idLibro,
        comentario: req.body.comentario,
        fecha: new Date()
    }).then((lista) => {
        console.log('La lista se ha introducido correctamente');
        response.json(lista);
    }).catch(err => {
        res.json({
            errors: err.errors.map ((error) => {
                console.log(error.message);
                return {
                    attribute: error.path,
                    message: error.message
                }
            })
        });
    })
}
function remove(req, res) {
    var id= req.params.id;
    Lista.findByPk(id).then(lista => {
        if (usuario) {
            lista.destroy().then(() => {
                res.status(204).send();
            })
        } else {
            res.send('La lista especificado no existe')
        }
    })
}

module.exports = {
    getAll, add, get, remove
}