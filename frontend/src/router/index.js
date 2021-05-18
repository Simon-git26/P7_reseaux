import Vue from 'vue'
import VueRouter from 'vue-router'
import Accueil from '../components/Accueil.vue'
import Connection from '../components/Connection.vue'
import Inscription from '../components/Inscription.vue'


Vue.use(VueRouter)

export default new VueRouter ({

  mode: 'history',

  routes: [
    {path: '/', component: Accueil},
    {path: '/connection', component: Connection},
    {path: '/inscription', component: Inscription}
  ]
})