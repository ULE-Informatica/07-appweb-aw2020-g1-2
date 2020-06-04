import Vue from "vue"
import VueRouter from "vue-router"
import Index from "../views/Index.vue"
import Home from "../views/Home.vue"
import Books from "../views/Libros.vue"
import Favoritos from "../views/Favoritos.vue"
import Leidos from "../views/Leidos.vue"
import Lista from "../views/MiLista.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/components/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "@/components/Register.vue")
  },
   {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/books",
    name: "Books",
    component: Books
  },
  {
    path: "/favs",
    name: "Favoritos",
    component: Favoritos
  },
  {
    path: "/myList",
    name: "Lista",
    component: Lista
  },
  {
    path: "/read",
    name: "Leidos",
    component: Leidos
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
