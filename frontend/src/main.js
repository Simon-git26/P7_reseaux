import 'bootstrap/scss/bootstrap.scss'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from 'vue-notification'
import Bus from './bus'
import axios from './api'

Vue.config.productionTip = false
Vue.use(Notifications)

new Vue({
  data() {
    return {
      user: null,
    }
  },

  async mounted() {

    if (!this.user) {
      if(localStorage.getItem('token')) {
        const res = await axios.get('user');
        this.user = res.data;
        console.log('if main', this.user);
        Bus.$emit('connected', {token: res.data.token, ...res.data.user});
      }
    }

    Bus.$on('connected', user => {
      console.log('user main', user);
      this.user = user;
    })
    
    Bus.$on('disconnected', () => {
      localStorage.removeItem("token");
    })
  },

  router,
  render: h => h(App)
}).$mount('#app')
