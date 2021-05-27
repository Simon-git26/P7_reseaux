import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Groupomania from '../components/Groupomania'


Vue.use(VueRouter)

export default new VueRouter ({

  mode: 'history',

  routes: [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/groupomania', component: Groupomania}
  ]
})