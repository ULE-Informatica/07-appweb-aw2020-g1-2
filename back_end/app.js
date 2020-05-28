var express = require ('express')
var app = express()
var bp = require ('body-parser')
var Sequelize = require ('sequelize')

//Database
var db = require('./config/database')
db.authenticate()
    .then(() => console.log('Conexión con la base de datos exitosa'))
    .catch(err => console.log(err))
//Modelos
var Usuario = require('./modelos/usuario')
var Libro = require('./modelos/libro')
var Lista = require('./modelos/lista')
var Favorito = require('./modelos/favorito')
var Leido = require ('./modelos/leido')

//RELACIONES
/*
Libro.belongsToMany(Usuario, {
    through: 'Lista',
    foreignKey: 'idUsuario'
})

Usuario.belongsToMany(Libro, {
    through: 'Lista',
    foreignKey: 'idLibro'
})
*/
Libro.belongsToMany(Lista, {through: 'ListaLibro'})
Libro.belongsToMany(Favorito, {through: 'FavoritoLibro'})
Libro.belongsToMany(Leido, {through: 'LibroLeido'})

Lista.hasMany(Libro, {foreignKey: 'idLibro'})
Favorito.hasMany(Libro, {foreignKey: 'idLibro'})
Leido.hasMany(Libro, {foreignKey: 'idLibro'})

Usuario.hasMany(Lista, {foreignKey: 'idUsuario'})
Lista.belongsTo(Usuario, {foreignKey: 'idUsuario'})
Usuario.hasMany(Favorito, {foreignKey: 'idUsuario'})
Favorito.belongsTo(Usuario, {foreignKey: 'idUsuario'})
Usuario.hasMany(Leido, {foreignKey: 'idUsuario'})
Leido.belongsTo(Usuario, {foreignKey: 'idUsuario'})


/*
Usuario.sync({alter:true})
Libro.sync({alter:true})
Lista.sync({alter:true})
Favorito.sync({alter:true})
Leido.sync({alter:true})
/*
Usuario.sync({force:true})
Libro.sync({force:true})
Lista.sync({force:true})
Favorito.sync({force:true})
Leido.sync({force:true})
*/


var Op = Sequelize.Op;

app.use(bp.urlencoded({ extended: true}))
app.use(bp.json())


app.get('/', function (req, res) {
    console.log('Petición a / recibida');
    res.send('Practica final');    
})
app.get('/data',function(req, res) {
    console.log('Petición GET a /data recibida');
    res.send(); 
});

//LOGICA USUARIOS
//NUEVO USUARIO
app.post('/data/usuarios', function (req, res) {
    console.log('Petición POST a /data/usuarios => Creando un nuevo usuario');
    Usuario.create({
        nombreUsuario: req.body.nombreUsuario,
        email: req.body.email,
        contrasena: req.body.contrasena
    }).then((usuario) => {
        console.log('El usuario se ha introducido correctamente');
        response.json(usuario);
    }).catch(err => {
        res.json({
            errors: err.errors.map ((error) => {
                console.log(error.message);
                return {
                    attribute: error.path,
                    message: error.message
                }
            })
        });
    })
})
//BORRAR USUARIO(ID)
app.delete('/data/usuarios/:id' , function (req, res) {
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
})
//DEVUELVE TODOS LOS USUARIOS
app.get('/data/usuarios', function (req, res) {
    console.log('Petición GET a /data/usuarios => Devolviendo todos los usuarios de la base de datos');

    Usuario.findAll().then(usuario => {
        res.json(usuario);
    });
    
})
//DEVUELVE USUARIO (ID)
app.get('/data/usuarios/:id', function (req, res) {
    var id = req.params.id;

    console.log('Petición GET a /data/usuarios:is => Devolviendo al usuario ' + id);
    Usuario.findByPk(id).then((usuario) => {
        if ( usuario ) {
            res.json(usuario);
        } else {
            res.status(404).send();
        }
        
    })
})
//Devuelve todos los libros que el el usuarioa especificado tiene en su lista de libros
app.get('/data/usuarios/:id/lista', function (req, res) {
    var id = req.params.id;

    console.log('Petición GET a /data/usuarios:is => Devolviendo la lista de libros del usuario ' + id);
    
    Lista.findAll({
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

})
//FIN LOGICA USUARIOS
//LOGICA LIBROS
//NUEVO LIBRO 
app.post('/data/libros', function (req, res) {
    console.log('Petición POST a /data/libros => Creando un nuevo libro');
    Libro.create({
        titulo: req.body.titulo,
        autor: req.body.autor,
        resumen: req.body.resumen,
        genero: req.body.genero,
        idioma: req.body.idioma,
        linkDescarga: req.body.linkDescarga,
        linkImagen:req.body.linkImagen ,
        unidades: req.body.unidades,
    }).then((libro) => {
        console.log('El libro se ha introducido correctamente');
        response.json(libro);
    }).catch(err => {
        res.json({
            errors: err.errors.map ((error) => {
                console.log(error.message);
                return {
                    attribute: error.path,
                    message: error.message
                }
            })
        });
    })
})
//BORRAR LIBRO(ID)
app.delete('/data/libros/:id' , function (req, res) {
    var id= req.params.id;
    console.log('Petición DELETE Libro');
    Libro.findByPk(id).then(libro => {
        if (libro) {
            libro.destroy().then(() => {
                res.status(204).send();
            })
        } else {
            res.send('El libro especificado no existe')
        }
    })
})
app.get('/data/libros', function (req, res) {
    console.log('Petición GET a /data/libros => Devolviendo todos los usuarios de la base de datos');
    
    var filtro = {}; //Filtro que vamos a aplicar
    /* FILTROS LUEGO
    var f = req.query.f; //Valor del filtro

    if (req.query.f) {
        filtro = {
           where: {
               titulo: {
                   [Op.like]: '${f}%'
               }
           } 
        }
    }
    */
    Libro.findAll(filtro).then(libro => {
        res.json(libro);
    });
})

app.get('/data/libros/:id', function (req, res) {
    var id = req.params.id;

    console.log('Petición GET a /data/libros/:id => Devolviendo el libro ' + id);
    Libro.findByPk(id).then((libro) => {
        res.json(libro);
    })
})

//Devuelve a todos los usuarios que tienen el libro especificado en su Lista de libros
app.get('/data/libros/:id/lista', function (req, res) {
    var id = req.params.id;

    console.log('Petición GET a /data/usuarios:is => Devolviendo la lista de libros del usuario ' + id);
    
    Lista.findAll({
        where: {
            idLibro: id
        },
        include: [Usuario]
        
    }).then((lista) => {
        if (lista) {
            res.json(lista);
        } else {
            res.status(404).send();
        }
    })

})
//FIN LOGICA LIBROS
//LOGICA LISTA

//FIN LOGICA LISTA
//LOGICA FAVORITOS

//FIN LOGICA FAVORITOS
//LOGICA LEIDOS

//FIN LOGICA LEIDOS
//LOGICA RESERVA
//TODO
//FIN LOGICA RESERVA


app.listen(3000, function() {
    console.log('Aplicación escuchando en el puerto 3000')
});