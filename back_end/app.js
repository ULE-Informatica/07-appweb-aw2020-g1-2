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
//Devuelve todos los libros que el el usuarioa especificado tiene en su lista de favoritos
app.get('/data/usuarios/:id/favoritos', function (req, res) {
    var id = req.params.id;

    console.log('Petición GET a /data/usuarios:is => Devolviendo la lista de libros favoritos del usuario ' + id);
    
    Favorito.findAll({
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
//Devuelve todos los libros que el el usuarioa especificado tiene en su lista de leidos
app.get('/data/usuarios/:id/leidos', function (req, res) {
    var id = req.params.id;

    console.log('Petición GET a /data/usuarios:is => Devolviendo la lista de libros leidos del usuario ' + id);
    
    Leido.findAll({
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
//Devuelve a todos los usuarios que tienen el libro especificado en su Lista de libros favoritos
app.get('/data/libros/:id/lista', function (req, res) {
    var id = req.params.id;

    console.log('Petición GET a /data/usuarios:is => Devolviendo la lista de libros del usuario ' + id);
    
    Favorito.findAll({
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
//Devuelve a todos los usuarios que tienen el libro especificado en su Lista de libros leidos
app.get('/data/libros/:id/lista', function (req, res) {
    var id = req.params.id;

    console.log('Petición GET a /data/usuarios:is => Devolviendo la lista de libros del usuario ' + id);
    
    Leido.findAll({
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
//NUEVO Lista
app.post('/data/lista', function (req, res) {
    console.log('Petición POST a /data/lista => Creando una nueva lista');
    Lista.create({
        idUsuario: req.body.idUsuario,
        idLibro: req.body.idLibro,
        comentario: req.body.comentario,
        fecha: new Date()
    }).then((lista) => {
        console.log('La lista se ha introducido correctamente');
        response.json(lista);
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
//BORRAR Lista(ID)
app.delete('/data/lista/:id' , function (req, res) {
    var id= req.params.id;

    Lista.findByPk(id).then(lista => {
        if (usuario) {
            lista.destroy().then(() => {
                res.status(204).send();
            })
        } else {
            res.send('La lista especificado no existe')
        }
    })
})
//GET Lista(ID)
app.get('/data/lista/:id', function (req, res) {
    var id = req.params.id;

    console.log('Petición GET a /data/lista/:id => Devolviendo lista ' + id);
    Lista.findByPk(id).then((lista) => {
        res.json(lista);
    })
})
//FIN LOGICA LISTA
//LOGICA FAVORITOS
//NUEVO Favorito
app.post('/data/favoritos', function (req, res) {
    console.log('Petición POST a /data/favoritos => añadiendo un libro favorito');
    Lista.create({
        idUsuario: req.body.idUsuario,
        idLibro: req.body.idLibro,
        comentario: req.body.comentario,
        fecha: new Date()
    }).then((lista) => {
        console.log('El usuario se ha introducido correctamente');
        console.log(lista);
        response.json(lista);
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
//BORRAR Favorito (ID)
app.delete('/data/favoritos/:id' , function (req, res) {
    var id= req.params.id;

    Favorito.findByPk(id).then(fav => {
        if (fav) {
            fav.destroy().then(() => {
                console.log('El favorito se ha eliminado correctamente');
                res.status(204).send();
            })
        } else {
            res.send('Favorito especificado no existe')
        }
    })
})
//GET favorito(ID)
app.get('/data/favoritos/:id', function (req, res) {
    var id = req.params.id;

    console.log('Petición GET a /data/favoritos/:id => Devolviendo favorito ' + id);
    Favorito.findByPk(id).then((fav) => {
        res.json(fav);
    })
})
//FIN LOGICA FAVORITOS
//LOGICA LEIDOS
//NUEVO Leidos
app.post('/data/leidos', function (req, res) {
    console.log('Petición POST a /data/usuarios => Creando un nuevo usuario');
    Leido.create({
        idUsuario: req.body.idUsuario,
        idLibro: req.body.idLibro,
        comentario: req.body.comentario,
        fecha: new Date(),
        nota: req.body.nota
    }).then((leido) => {
        console.log('El usuario se ha introducido correctamente');
        response.json(leido);
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
app.delete('/data/leidos/:id' , function (req, res) {
    var id= req.params.id;

    Leido.findByPk(id).then(leido => {
        if (leido) {
            leido.destroy().then(() => {
                console.log('La relación leido se ha eliminado correctamete');
                res.status(204).send();
            })
        } else {
            res.send('Leido especificado no existe')
        }
    })
})
//GET Leido(ID)
app.get('/data/leidos/:id', function (req, res) {
    var id = req.params.id;

    console.log('Petición GET a /data/leidos/:id => Devolviendo leido ' + id);
    Leido.findByPk(id).then((leido) => {
        res.json(leido);
    })
})
//FIN LOGICA LEIDOS
//LOGICA RESERVA
//TODO
//FIN LOGICA RESERVA


app.listen(3000, function() {
    console.log('Aplicación escuchando en el puerto 3000')
});