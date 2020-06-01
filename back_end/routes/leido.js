// Cargamos el módulo de express para poder crear rutas
var express = require ('express')
var bp = require ('body-parser')
// Cargamos el controlador
var leidoControl = require('../control/leidoControl');
// Llamamos al router
var api = express.Router();
api.use(bp.urlencoded({ extended: true}))
api.use(bp.json())
// Creamos las rutas
//Devuelve TODOS LOS libros
api.get('/leidos', leidoControl.getAll.bind(leidoControl));
//Devuelve lista (ID)
api.get('/leidos/:id', function (req, res) {
    leidoControl.get(req,res);
})
//Añade lista
api.post('/leidos', function (req, res) {
    leidoControl.add(req,res);
});
//Borra lista
api.delete('/leidos/:id', function (req, res) {
    leidoControl.remove(req,res);
})

// Exportamos la configuración
module.exports = api;
