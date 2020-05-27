var express = require ('express')
var app = express()
var bp = require ('body-parser')

//Database
const db = require('./config/database')
//Establecemos conexión


app.use(bp.urlencoded({ extended: true}))
app.use(bp.json())


app.get('/', function (req, res) {
    console.log('Petición a / recibida');
    res.send('Practica final');    
});

app.get('/index', function(req,res) {
    console.log('Petición a /index recibida');
    res.send('Hola mundo');
});

app.get('/data',function(req, res) {
    console.log('Petición a /data recibida');
    res.send(); 
});

app.listen(3000, function() {
    console.log('Aplicación escuchando en el puerto 3000')
});