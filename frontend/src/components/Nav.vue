<template>
    <nav class="navbar navbar-expand navbar-light fixed-top">
      <div class="container">
        <a href="/" class="navbar-brand">Accueil</a>
        <div class="img">
          <img src="@/assets/iconegroupo.png" alt="#"/>
        </div>
        
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a v-if="isConnected" v-on:click="deconnection" href="Login" class="nav-link color pos">Deconnexion<em class="fas fa-power-off"></em></a>
              <a v-else href="Login" class="nav-link color">Connexion</a>
            </li>
            <li class="nav-item">
              <a v-if="isConnected" href="Profil" class="nav-link color pos">Profil<em class="fas fa-user-circle"></em></a>
              <a v-else href="Register" class="nav-link color">Inscription</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>



<script>
  import store from '../store';

  export default {
    name: 'Nav',

    data() {
      return {
        sharedState: store.state
      }
    },

    methods: {
      deconnection: function() {
        localStorage.removeItem("token");
      }
    },


    computed: {
      isConnected: function() {
        return this.sharedState.isConnected;
      }
    }

  }
</script>


<style scoped>
  .color {
    color: black !important;
  }

  .color:hover {
    color: #545454 !important;
    text-decoration: underline;
    font-size: 17px;
  }

  .img {
    margin-left: 30px;
  }

  .pos {
    display: flex;
    flex-direction: column;
  }

  .fa-user-circle {
    font-size: 35px;
    color: #c91616;
  }

  .fa-power-off {
    font-size: 35px;
    color: #c91616;
  }

</style>