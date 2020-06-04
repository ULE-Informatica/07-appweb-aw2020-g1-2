//var  Vue = require ("vue").default;
var axios = require('axios');

function edit() {  
    const promise = new Promise (function (resolve, reject) {
        axios.post('http://localhost:3000/data/favoritos')
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
    console.log('delete a http://localhost:3000/data/favoritos/'+id)
    const promise = new Promise (function (resolve, reject) {
        axios.delete('http://localhost:3000/data/favoritos/'+id)
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
  