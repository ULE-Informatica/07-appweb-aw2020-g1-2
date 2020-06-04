// Cargamos el módulo de express para poder crear rutas
var express = require ('express')
var bp = require ('body-parser')
var cors = require ('cors')
// Cargamos el controlador
var listaControl = require('../control/listaControl');
// Llamamos al router
var api = express.Router();
api.use(bp.urlencoded({ extended: true}))
api.use(bp.json())
api.use(cors())
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
api.post('/lista/:id', function (req,res,next) {
    listaControl.update(req,res,next)
});
//Borra lista
api.delete('/lista/:id', function (req, res) {
    listaControl.remove(req,res);
})

// Exportamos la configuración
module.exports = api;
