<template>
  <nav class="navbar bg-white shadow-lg navbar-expand-lg bg-light justify-content-between border-bottom border-danger">
    <div class="container-lg">
      <a class="nav-link px-0" href="/"><img src="@/assets/iconegroupo.png" alt="#"/></a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link text-dark font-weight-bold px-3 d-flex flex-column" v-if="isConnected" href="Profil">Profil
            <div v-if="$root.user.imagePath">
                <img :src="`http://localhost:3000/${$root.user.imagePath}`" class="img-fluid rounded-circle size" alt="#">
            </div>
            <em v-else class="fs-1 text-primary fas fa-user-circle"></em></a>
          <a class="nav-link text-dark font-weight-bold px-3" v-else href="Register">Inscription</a>
        </li>

        <li class="nav-item">
          <a class="nav-link text-dark font-weight-bold px-3 d-flex flex-column" v-if="isConnected" href="../Team">Membres<em class="fs-1 text-primary fas fa-users"></em></a>
        </li>

        <li class="nav-item">
          <a class="nav-link text-dark font-weight-bold px-3 d-flex flex-column" v-if="isConnected" v-on:click="deconnection" href="Login">Déconnexion<em class="fs-1 text-primary fas fa-power-off"></em></a>
          <a class="nav-link text-dark font-weight-bold px-3" v-else href="Login">Connexion</a>
        </li>
      </ul>
    </div>
  </nav>
</template>



<script>
import Bus from '../../bus'

  export default {
    name: 'Nav',

    methods: {
      deconnection: function() {
        Bus.$emit('disconnected')
      }
    },

    computed: {
      isConnected: function() {
        return this.$root.user
      }
    }

  }
</script>


<style scoped>

  .size {
    width: 45px;
    height: 40px;

  }

  .navbar-nav {
    flex-direction: inherit;
  }
</style>