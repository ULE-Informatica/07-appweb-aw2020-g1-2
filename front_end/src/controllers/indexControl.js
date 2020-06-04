var  Vue = require ("vue").default;
var axios = require('axios');


function verificar(userName, password) {
    console.log(userName);
    console.log(password);
    const promise = new Promise (function (resolve, reject) {
        axios.post('http://localhost:3000/data/authentication', {
        nombreUsuario: userName,
        contrasena: password,     
    }).then(res => {
        //LogIn correcto, iniciamos sesión
        console.log(res.data);
        //Guardamos la sesión en la variable global "usuario"
        Vue.prototype.$usuario = res.data;   
        resolve(true);
    }).catch(e => {
        //Error, credenciales invalidas/insuficientes (Mostrar mensaje por pantlla?)
        console.log(e);
        reject(new Error('Usuario o Contraseña incorrectos'))
    }) 
    })
    //return Api.get("authentication", credentials);
    return promise;
}

function registrar (userName, password, email) {
    axios.post('http://localhost:3000/data/usuarios', {
        nombreUsuario: userName,
        contrasena: password,
        email: email
    }).then(res => {
        //Cargamos la home del usuario recién creado
        Vue.prototype.$usuario=res.data;
        //Redirigimos a hombe
        
        return res.data;
    }).catch(e=> {
        console.log(e);
        return('Error durante el registro');
    })
}

module.exports = { verificar, registrar}
  