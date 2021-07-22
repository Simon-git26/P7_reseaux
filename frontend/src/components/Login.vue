<template>
  <div>
    <div class="bg-white col-md-4 border border-secondary rounded mb-3" v-if="password && email">
        <strong>Le mot de passe ne correspond pas à l'email.</strong><br />
        <strong>Vous disposez de {{ count }} essaie</strong>
    </div>

    <div class="card">
      <form @submit.prevent="handlelogsubmit">
        <div class="card-header text-center">
          <h3>Connexion</h3>
        </div>

        <div class="card-body">
          <div class="form-group">
            <em class="fas fa-envelope"></em><label class="ml-2" for="email">Email *</label>
            <input type="email" id="email" class="form-control" v-model="email" placeholder="Email" required />
          </div>

          <div class="form-group">
            <em class="fas fa-lock"></em><label class="ml-2" for="password">Mot de Passe *</label>
            <input type="password" id="password" class="form-control" v-model="password" placeholder="Mot de passe" required />
          </div>

          <button class="mb-2 btn btn-primary btn-block" v-on:click="countLimit" :disabled="btnlogdisable">
            Connexion
          </button>
        </div>

        <div class="card-footer text-muted">
          <p>Vous n'avez pas de compte ?<a href="Register">Inscrivez vous !</a></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios, { refreshHeaders } from "../api";
import Bus from '../bus';

export default {
  
  name: "Login",

  data() {
    return {
      showErrors: [],
      error: ["error"],
      email: "",
      password: "",

      count: 3,
    };
  },


  methods: {
    handlelogsubmit() {
      const data = {
        email: this.email,
        password: this.password,
      };

      axios
        .post("/login", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          refreshHeaders();
          Bus.$emit('connected', {token: res.data.token, ...res.data.user});
          this.$router.push("/");
          this.$notify({
            title: 'Notifications',
            text: 'Connection réussi !'
          })
        })
        .catch((err) => {
          console.log(err);
        });
    },

    checkFormLog() {
      if (this.email && this.password) {
        console.log("checkFormLog fonction est appelé");
      }
      this.error = [];

      if (!this.email) {
        this.error.push("Email is required");
      }

      if (!this.password) {
        this.error.push("password is required");
      }
    },

    countLimit() {
      this.count--;
    },
  },

  computed: {
    //Ma fonction de Validation Formulaire
    btnlogdisable: function() {
      return this.error.length !== 0;
    },
  },

  watch: {
    email(value) {
      this.email = value;
      this.checkFormLog();
    },

    password(value) {
      this.password = value;
      this.checkFormLog();
    },
  },
};
</script>


<style scoped>
</style>
