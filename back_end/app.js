var express = require ('express')
var app = express()
var bp = require ('body-parser')
var cors = require ('cors')

app.use(bp.urlencoded({ extended: false}))
app.use(bp.json())
app.use(cors)

app.get('/', function(req,res) {
    res.send('Hola mundo');
});

app.get('/data',function(req, res) {
    res.send();
});

app.listen(3000, function() {
    console.log('Aplicación escuchando en el puerto 3000')
});