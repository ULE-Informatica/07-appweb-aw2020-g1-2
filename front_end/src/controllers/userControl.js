//var Api = require("./../controllers/api");
import Vue from "vue";
var axios = require('axios')

  // users data
  function createUser() {
    //return Api.post("usuarios", credentials);
    
  }

  function getAll() {
    //return Api.get("usuarios");
  }
  function getUser() {
    //return Api.get(`usuarios/?id=${credentials}`);
  }

  function leidos() {
    //return Api.get(`usuarios/?id=${credentials}/leidos`, credentials);
  }
  function favs() {
    //return Api.get(`usuarios/?id=${credentials}/favoritos`, credentials);
  }
  function libros() {
    //return Api.get(`usuarios/?id=${credentials}/lista`, credentials);
  }


module.exports = {
  createUser, fetchUsers, fetchUser, deleteUser, leidos, favs, libros 
};
