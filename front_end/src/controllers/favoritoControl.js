//var  Vue = require ("vue").default;
var axios = require('axios');
var ip = require('./constantes')

function edit(item) {  
    const promise = new Promise (function (resolve, reject) {
        axios.post('http://'+ ip +':3000/data/favoritos/'+item.id, {
            id: item.id,
            idLibro: item.idLibro,
            idUsuario:item.idUsuario,
            comentario:item.comentario,
            fecha: item.fecha
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

function remove(id) {  
    console.log('delete a http://'+ ip +':3000/data/favoritos/'+id)
    const promise = new Promise (function (resolve, reject) {
        axios.delete('http://'+ ip +':3000/data/favoritos/'+id)
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



module.exports = {remove, edit}
  