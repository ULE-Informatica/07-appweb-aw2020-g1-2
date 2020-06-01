// Cargamos el módulo de express para poder crear rutas
var express = require ('express')
var bp = require ('body-parser')
// Cargamos el controlador
var listaControl = require('../control/listaControl');
// Llamamos al router
var api = express.Router();
api.use(bp.urlencoded({ extended: true}))
api.use(bp.json())
// Creamos las rutas
//Devuelve TODOS LOS libros
api.get('/lista', listaControl.getAll.bind(listaControl));
//Devuelve lista (ID)
api.get('/lista/:id', function (req, res) {
    listaControl.get(req,res);
})
//Añade lista
api.post('/lista', function (req, res) {
    listaControl.add(req,res);
});
//Borra lista
api.delete('/lista/:id', function (req, res) {
    listaControl.remove(req,res);
})

// Exportamos la configuración
module.exports = api;
