
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
    console.log('Llamada al controlador de usuarios');
    console.log('Petición GET a /data/usuarios => Devolviendo todos los usuarios de la base de datos');
    Usuario.findAll().then(usuario => {
        res.json(usuario);
    });
    
}
function get(req, res) {
    var id = req.params.id;

    console.log('Petición GET a /data/usuarios:is => Devolviendo al usuario ' + id);
    Usuario.findByPk(id).then((usuario) => {
        if ( usuario ) {
            res.json(usuario);
        } else {
            res.status(404).send();
        }
        
    })
}
function add(req, res) {
    console.log('Petición POST a /data/usuarios => Creando un nuevo usuario');
    Usuario.create({
        nombreUsuario: req.body.nombreUsuario,
        email: req.body.email,
        contrasena: req.body.contrasena
    }).then((usuario) => {
        console.log('El usuario se ha introducido correctamente');
        res.json(usuario);
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
    Usuario.findByPk(id).then(usuario => {
        if (usuario) {
            usuario.destroy().then(() => {
                res.status(204).send();
            })
        } else {
            res.send('El usuario especificado no existe')
        }
    })
}
function getLista(req, res) {
    var id = req.params.id;
    console.log('Petición GET a /data/usuarios:id/lista => Devolviendo la lista de libros del usuario ' + id);   
    Lista.findAll({
        where: {
            idUsuario: id
        },
        include: [Libro]      
    }).then((lista) => {
        if (lista) {
            res.json(lista);
        } else {
            res.status(404).send('El usuario no tiene lista de libros');
        }
    })
}

function getFav ( req, res) {
    var id = req.params.id;
    console.log('Petición GET a /data/usuarios:is => Devolviendo la lista de libros favoritos del usuario ' + id);    
    Favorito.findAll({
        where: {
            idUsuario: id
        },
        include: [Libro]       
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
    console.log('Petición GET a /data/usuarios:is => Devolviendo la lista de libros leidos del usuario ' + id);   
    Leido.findAll({
        where: {
            idUsuario: id
        },
        include: [Libro]        
    }).then((lista) => {
        if (lista) {
            res.json(lista);
        } else {
            res.status(404).send();
        }
    })
}
function authenticate(req,res) {
    console.log('Autenticando al usuario');
    Usuario.findOne({
        where: {
            nombreUsuario: req.body.nombreUsuario,
            contrasena: req.body.contrasena
        }
    }).then((usuario)=> {
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).send('Credenciales invalidas');
        }
    })
}
module.exports = {
    getAll, add, get, remove, getLista, getFav, getLeidos, authenticate
}