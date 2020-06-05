
var Sequelize = require ('sequelize')
var Op = Sequelize.Op;

//Modelos
var Usuario = require('../model/usuario')
var Lista = require('../model/lista')
var Favorito = require('../model/favorito')
var Leido = require ('../model/leido')
var Libro = require('../model/libro')
//Relaciones
Libro.hasMany(Lista, {foreignKey: 'idLibro'})
Lista.belongsTo(Libro, {foreignKey: 'idLibro'})
Libro.hasMany(Favorito, {foreignKey: 'idLibro'})
Favorito.belongsTo(Libro, {foreignKey: 'idLibro'})
Libro.hasMany(Leido, {foreignKey: 'idLibro'})
Leido.belongsTo(Libro, {foreignKey: 'idLibro'})

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
        res.json(lista);
    }).catch(err => {
        res.status(404).send();
    })
}
function remove(req, res) {
    var id= req.params.id;
    Lista.findByPk(id).then(lista => {
        if (lista) {
            lista.destroy().then(() => {
                res.status(204).send();
            })
        } else {
            res.send('La lista especificado no existe')
        }
    })
}
function update (req, res,next) {
    var id=req.params.id;
    var coment = req.body.comentario
    console.log('Actualizando el comentario del favorito ' +id)
    Lista.update(      
        {comentario: coment},
        {returning: true, where: {id: req.body.id} }
      ).then(updatedBook => {
        res.json(updatedBook)
      }).catch(next)    
}

module.exports = {
    getAll, add, get, remove,update
}