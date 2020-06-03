// Cargamos el módulo de express para poder crear rutas
var express = require ('express')
var bp = require ('body-parser')
var cors = require ('cors')
// Cargamos el controlador
var libroControl = require('../control/libroControl');
// Llamamos al router
var api = express.Router();
api.use(bp.urlencoded({ extended: true}))
api.use(bp.json())
api.use(cors())
// Creamos las rutas
//Devuelve TODOS LOS libros
api.get('/libros', libroControl.getAll.bind(libroControl));
//Devuelve libro (ID)
api.get('/libros/:id', function (req, res) {
    libroControl.get(req,res);
})
//Añade libro
api.post('/libros', function (req, res) {
    libroControl.add(req,res);
});
//Borra libro
api.delete('/libros/:id', function (req, res) {
    libroControl.remove(req,res);
})
//Devuelve la lista de usuarios que tienen el libro en su lista
api.get('/libros/:id/lista', function(req, res) {
    libroControl.getLista(req,res);
})
//Devuelve la lista de usuarios con el libro en favoritos 
api.get('/libros/:id/favoritos', function (req, res) {
    libroControl.getFav(req,res);
})
//Devuelve la lista de usuarios que han leido el libro
api.get('/libros/:id/leidos', function (req, res) {
    libroControl.getLeidos(req,res);
})
// Exportamos la configuración
module.exports = api;
