// Cargamos el módulo de express para poder crear rutas
var express = require ('express')
var bp = require ('body-parser')
var cors = require ('cors')

// Cargamos el controlador
var UsuarioController = require('../control/usuarioControl');
 
// Llamamos al router
var api = express.Router();
api.use(bp.urlencoded({ extended: true}))
api.use(bp.json())
api.use(cors())
// Creamos las rutas
//DEVUELVE TODOS LOS USUARIOS
api.get('/usuarios', UsuarioController.getAll.bind(UsuarioController));
//DEVUELVE USUARIO (ID)
api.get('/usuarios/:id', function (req, res) {
    UsuarioController.get(req,res);
})
//Añade usuario
api.post('/usuarios', function (req, res) {
    UsuarioController.add(req,res);
});
//Borra usuario
api.delete('/usuarios/:id', function (req, res) {
    UsuarioController.remove(req,res);
})
//Devuelve la lista de libros del usuario
api.get('/usuarios/:id/lista', function(req, res) {
    UsuarioController.getLista(req,res);
})
//Devuelve la lista de favoritos del usuario
api.get('/usuarios/:id/favoritos', function (req, res) {
    UsuarioController.getFav(req,res);
})
//Devuelve la lista de libros leidos
api.get('/usuarios/:id/leidos', function (req, res) {
    UsuarioController.getLeidos(req,res);
})
//Autentica al usuario
api.get('/authentication', function(req,res) {
    UsuarioController.authenticate(req,res);
})
// Exportamos la configuración
module.exports = api;
