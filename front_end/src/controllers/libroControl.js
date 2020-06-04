//var  Vue = require ("vue").default;
var axios = require('axios');

function getAll() {  
    const promise = new Promise (function (resolve, reject) {
        axios.get('http://localhost:3000/data/libros')
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

function getBook(id) {  
    const promise = new Promise (function (resolve, reject) {
        axios.get('http://localhost:3000/data/libros/'+id)
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



module.exports = {getAll, getBook}
  