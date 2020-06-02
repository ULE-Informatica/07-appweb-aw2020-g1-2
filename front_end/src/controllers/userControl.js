import Api from '@/controllers/Api'



  function createUser (credentials) {
    return Api().post('usuarios', credentials)
  }
  function fetchUsers () {
    return Api().get('usuarios')
  }
  function editUser (credentials) {
    return Api().post('edit', credentials)
  }
  function deleteUser (credentials) {
    return Api().delete(`usuarios?id=${credentials}`)
  }   
  
  function register (credentials) {
    return Api().post('usuarios', credentials)
  }
  function login (credentials) {
    return Api().post('authentication', credentials)
  }

module.exports = {
  createUser,
  fetchUsers,
  editUser,
  deleteUser,
  register,
  login
}