
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
    console.log('Petición GET a /data/libros => Devolviendo todos los usuarios de la base de datos');    
    var filtro = {}; //Filtro que vamos a aplicar
    /* FILTROS LUEGO
    var f = req.query.f; //Valor del filtro

    if (req.query.f) {
        filtro = {
           where: {
               titulo: {
                   [Op.like]: '${f}%'
               }
           } 
        }
    }
    */
    Libro.findAll(filtro).then(libro => {
        res.json(libro);
    });
}
function get(req, res) {
    var id = req.params.id;
    console.log('Petición GET a /data/usuarios:is => Devolviendo al usuario ' + id);
    Libro.findByPk(id).then((usuario) => {
        if ( usuario ) {
            res.json(usuario);
        } else {
            res.status(404).send('El libro no existe');
        }
        
    })
}
function add(req, res) {
    console.log('Petición POST a /data/libros => Creando un nuevo libro');
    Libro.create({
        titulo: req.body.titulo,
        autor: req.body.autor,
        resumen: req.body.resumen,
        genero: req.body.genero,
        idioma: req.body.idioma,
        linkDescarga: req.body.linkDescarga,
        linkImagen:req.body.linkImagen ,
        unidades: req.body.unidades,
    }).then((libro) => {
        console.log('El libro se ha introducido correctamente');
        response.json(libro);
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
    console.log('Petición DELETE Libro');
    Libro.findByPk(id).then(libro => {
        if (libro) {
            libro.destroy().then(() => {
                res.status(204).send();
            })
        } else {
            res.send('El libro especificado no existe')
        }
    })
}
function getLista(req, res) {
    var id = req.params.id;
    console.log('Petición GET a /data/libros:id/lista => Devolviendo la lista de libros del usuario ' + id);   
    Lista.findAll({
        where: {
            idLibro: id
        },
        include: [Usuario]      
    }).then((lista) => {
        if (lista) {
            res.json(lista);
        } else {
            res.status(404).send('El libro no pertenece a ninguna lista');
        }
    })
}

function getFav ( req, res) {
    var id = req.params.id;
    console.log('Petición GET a /data/libro:is => Devolviendo la lista de libros favoritos del usuario ' + id);    
    Favorito.findAll({
        where: {
            idLibro: id
        },
        include: [Usuario]       
    }).then((lista) => {
        if (lista) {
            res.json(lista);
        } else {
            res.status(404).send();
        }
    })
}

function getLeidos (req, res) {
    var id = req.params.id;
    console.log('Petición GET a /data/libro:is => Devolviendo la lista de Usuarios lectores del libro ' + id);   
    Leido.findAll({
        where: {
            idLibro: id
        },
        include: [Usuario]        
    }).then((lista) => {
        if (lista) {
            res.json(lista);
        } else {
            res.status(404).send();
        }
    })
}

module.exports = {
    getAll, add, get, remove, getLista, getFav, getLeidos
}