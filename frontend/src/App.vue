<template>
  <div id="app">

    <Nav />

    <div class="auth-wrapper">
      <div class="auth-inner">
        <router-view />
      </div>
    </div>

  </div>
</template>




<script>
import Nav from './components/Nav.vue'
import axios from './api'


export default {
  name: "App",

  components: {
    Nav,
  },

  data() {
    return {
      user: null,
    }
  },

  async created() {
    const connected = localStorage.getItem('token');
    if (!connected) {
        this.$router.push('/login');
    }

    const res = await axios.get('user');

    this.user = res.data;
  },
}
</script>




<style>
  @import url(../style.css);
</style>
