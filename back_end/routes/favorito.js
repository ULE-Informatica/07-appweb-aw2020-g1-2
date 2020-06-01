// Cargamos el módulo de express para poder crear rutas
var express = require ('express')
var bp = require ('body-parser')
// Cargamos el controlador
var favControl = require('../control/favoritoControl');
// Llamamos al router
var api = express.Router();
api.use(bp.urlencoded({ extended: true}))
api.use(bp.json())
// Creamos las rutas
//Devuelve TODOS LOS libros
api.get('/favoritos', favControl.getAll.bind(favControl));
//Devuelve lista (ID)
api.get('/favoritos/:id', function (req, res) {
    favControl.get(req,res);
})
//Añade lista
api.post('/favoritos', function (req, res) {
    favControl.add(req,res);
});
//Borra lista
api.delete('/favoritos/:id', function (req, res) {
    favControl.remove(req,res);
})

// Exportamos la configuración
module.exports = api;