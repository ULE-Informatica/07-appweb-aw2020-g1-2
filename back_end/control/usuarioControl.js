
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

/*
Usuario.sync({ alter: true });
Libro.sync({ alter: true });
Lista.sync({ alter: true });
Favorito.sync({ alter: true });
Leido.sync({ alter: true });
console.log("All models were synchronized successfully.");
*/
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
        res.status(404).send();
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
    console.log(req.body.nombreUsuario);
    console.log(req.body.contrasena);
    Usuario.findOne({
        where: {
            nombreUsuario: req.body.nombreUsuario,
            contrasena: req.body.contrasena
        }
    }).then((usuario)=> {
        if (usuario) {
            console.log('Credenciales validas para el usuario con id=' + usuario.idUsuario);
            res.json(usuario);
        } else {
            console.log('credenciales invalidas');
            res.status(404).send('Credenciales invalidas');
        }
    }).catch(err => {
        console.log('Credenciales insuficientes');
        res.status(404).send('Es necesario especificar un nombre de usuario y una contraseña')
    })
}
module.exports = {
    getAll, add, get, remove, getLista, getFav, getLeidos, authenticate
}