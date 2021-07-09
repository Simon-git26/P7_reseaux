<template>
    <nav class="navbar navbar-expand navbar-light shadow-lg bg-white border-bottom border-2 border-dark">
      <div class="container">
        <div class="ml-4">
          <a href="/"><img src="@/assets/iconegroupomania.png" alt="#"/></a>
        </div>
        
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a v-if="isConnected" v-on:click="deconnection" href="Login" class="nav-link text-dark d-flex flex-column">Deconnexion<em class="fs-1 text-primary fas fa-power-off"></em></a>
              <a v-else href="Login" class="nav-link text-dark">Connexion</a>
            </li>
            <li class="nav-item">
              <a v-if="isConnected" href="Profil" class="nav-link text-dark d-flex flex-column">Profil<em class="fs-1 text-primary fas fa-user-circle"></em></a>
              <a v-else href="Register" class="nav-link text-dark">Inscription</a>
            </li>
          </ul>
        </div>
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
  .text-dark:hover {
    color: #545454 !important;
    text-decoration: underline;
    font-size: 17px;
  }
</style>