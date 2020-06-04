//var Api = require("./../controllers/api");
var Vue = require('vue').default
var axios = require('axios')

function getLista (idUsuario) {
  const promise = new Promise (function (resolve, reject) {
    axios.get('http://localhost:3000/data/usuarios/'+idUsuario+'/lista')
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
    axios.get('http://localhost:3000/data/usuarios/'+idUsuario+'/favoritos')
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
    axios.get('http://localhost:3000/data/usuarios/'+idUsuario+'/leidos')
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
  getLista, getLeidos, getFavoritos, sesion
};
