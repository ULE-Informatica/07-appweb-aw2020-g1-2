//var Api = require("./../controllers/api");
var Vue = require('vue').default
var axios = require('axios')
var ip = require('./constantes')


function getLista (idUsuario) {
  const promise = new Promise (function (resolve, reject) {
    axios.get('http://'+ ip +':3000/data/usuarios/'+idUsuario+'/lista')
    .then(res => {
        console.log(res.data);
        resolve(res);
    }).catch(err => {
        console.log('Error inesperado ' + err);
        reject(new Error('Error inesperado '+ err.data));
    })
  })
  return promise
}

function getFavoritos (idUsuario) {
  const promise = new Promise (function (resolve, reject) {
    axios.get('http://'+ ip +':3000/data/usuarios/'+idUsuario+'/favoritos')
    .then(res => {
        console.log(res.data);
        resolve(res);
    }).catch(err => {
        console.log('Error inesperado ' + err);
        reject(new Error('Error inesperado '+ err.data));
    })
  })
  return promise
}

function getLeidos (idUsuario) {
  const promise = new Promise (function (resolve, reject) {
    axios.get('http://'+ ip +':3000/data/usuarios/'+idUsuario+'/leidos')
    .then(res => {
        console.log(res.data);
        resolve(res);
    }).catch(err => {
        console.log('Error inesperado ' + err);
        reject(new Error('Error inesperado '+ err.data));
    })
  })
  return promise
}

function addFavorito(idUsuario, idLibro) {
  const promise = new Promise (function (resolve, reject) {
    axios.post('http://'+ ip +':3000/data/favoritos', {
        idLibro: idLibro,
        idUsuario: idUsuario
    })
    .then(res => {
        console.log(res.data);
        resolve(res);
    }).catch(err => {
        console.log('Error inesperado ' + err);
        reject(new Error('Error inesperado '+ err.data));
    })
  })
  return promise
}

function addLeido(idUsuario, idLibro) {
  console.log(idUsuario)
  const promise = new Promise (function (resolve, reject) {
    axios.post('http://'+ ip +':3000/data/leidos', {
        idLibro: idLibro,
        idUsuario: idUsuario
    })
    .then(res => {
        console.log(res.data);
        resolve(res);
    }).catch(err => {
        console.log('Error inesperado ' + err);
        reject(new Error('Error inesperado '+ err.data));
    })
  })
  return promise
}

function addLista(idUsuario, idLibro) {
  const promise = new Promise (function (resolve, reject) {
    axios.post('http://'+ ip +':3000/data/lista', {
        idLibro: idLibro,
        idUsuario: idUsuario
    })
    .then(res => {
        console.log(res.data);
        resolve(res);
    }).catch(err => {
        console.log('Error inesperado ' + err);
        reject(new Error('Error inesperado '+ err.data));
    })
  })
  return promise
}


function sesion () {
  const promise = new promise ( function (resolve, reject) {
    if(Vue.prototype.$usuario != null) {
      resolve(true);
    } else {
      reject(false);
    }
  })
  return promise
}

module.exports = {
  getLista, getLeidos, getFavoritos, sesion, addFavorito, addLeido, addLista
};
