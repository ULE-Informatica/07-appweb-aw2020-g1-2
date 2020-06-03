var express = require ('express')
var app = express()

//Database
var db = require('./config/database')
db.authenticate()
    .then(() => console.log('Conexión con la base de datos exitosa'))
    .catch(err => console.log(err))

//Importamos rutas
var usuarioRoute = require('./routes/usuario') 
var libroRoute = require('./routes/libro')
var favRoute = require('./routes/favorito')
var leidoRoute=require('./routes/leido')
var listaRoute=require('./routes/lista')
//Cargamos rutas
app.use('/data',usuarioRoute)
app.use('/data',libroRoute)
app.use('/data',favRoute)
app.use('/data',leidoRoute)
app.use('/data',listaRoute)

app.get('/', function (req, res) {
    console.log('Petición a / recibida');
    res.send('Root de la API de la práctica final');    
})

app.listen(3000, function() {
    console.log('Aplicación escuchando en el puerto 3000')
});

module.exports = app;