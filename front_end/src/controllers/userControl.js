var Api = require("./../controllers/api");


  // users data
  function createUser(credentials) {
    return Api.post("usuarios", credentials);
  }
  function fetchUsers() {
    return Api.get("usuarios");
  }
  function fetchUser(credentials) {
    return Api.get(`usuarios/?id=${credentials}`);
  }
  function deleteUser(credentials) {
    return Api.delete(`usuarios/?id=${credentials}`, ); 
  }
  function leidos(credentials) {
    return Api.get(`usuarios/?id=${credentials}/leidos`, credentials);
  }
  function favs(credentials) {
    return Api.get(`usuarios/?id=${credentials}/favoritos`, credentials);
  }
  function libros(credentials) {
    return Api.get(`usuarios/?id=${credentials}/lista`, credentials);
  }
  function verificar(credentials) {
    return Api.get("authentication", credentials);
  }

module.exports = {
  createUser, fetchUsers, fetchUser, deleteUser, verificar, leidos, favs, libros 
};
