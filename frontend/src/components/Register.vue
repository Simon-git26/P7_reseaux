<template>
  <div>
    <p v-if="password !== passwordConfirm && password && passwordConfirm">
      <b
        >Veuillez renseignez le bon mot de passe:<br />
        * Majuscule obligatoire *<br />
        * Chiffres Obligatoires *<br />
        * Caractères spcéciaux Obligatoire *
      </b>
    </p>

    <form @submit.prevent="handleSubmit">
      <h3>Inscription</h3>

      <div class="form-group">
        <label>Votre Nom *</label>
        <input
          type="text"
          class="form-control"
          v-model="firstName"
          placeholder="Votre nom"
          required
        />
      </div>

      <div class="form-group">
        <label>Votre Prenom *</label>
        <input
          type="text"
          class="form-control"
          v-model="lastName"
          placeholder="Votre Prenom"
          required
        />
      </div>

      <div class="form-group">
        <label>Email *</label>
        <input
          type="email"
          class="form-control"
          v-model="email"
          placeholder="Email"
          required
        />
      </div>

      <div class="form-group">
        <label>Mot de Passe *</label>
        <input
          type="password"
          class="form-control"
          v-model="password"
          placeholder="Mot de passe"
          required
        />
      </div>

      <div class="form-group">
        <label>Confirmez le Mot de Passe *</label>
        <input
          type="password"
          class="form-control"
          v-model="passwordConfirm"
          placeholder="Confirmez le Mot de passe"
          required
        />
      </div>

      <button class="btn btn-primary btn-block" :disabled="btndisable">
        Inscription !
      </button>

      <p>Vous avez déja un compte ?<a href="Login">Connectez vous !</a></p>
    </form>
  </div>
</template>

<script>
import axios from "../api";
import Vue from 'vue';

export default {
  name: "Register",
  data() {
    return {
      showErrors: [],
      error: ["error"],
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    };
  },
  methods: {
    handleSubmit() {
      console.log("data");
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };

      axios
        .post("/register", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.$router.push("/login");
          Vue.notify({
            group: 'foo',
            title: 'Notifications',
            text: 'Inscription réalisée !'
          })
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    checkForm(e) {
      if (
        this.firstName &&
        this.lastName &&
        this.email &&
        this.password &&
        this.passwordConfirm
      ) {
        console.log("checkForm fonction est appelé");
      }
      this.error = [];
      if (!this.firstName) {
        this.error.push("FirstName is required");
      }
      if (!this.lastName) {
        this.error.push("LastName is required");
      }
      if (!this.email) {
        this.error.push("Email is required");
      }
      if (!this.password) {
        this.error.push("Password is required");
      }
      if (!this.passwordConfirm) {
        this.error.push("PasswordConfirm is required");
      }
      if (this.password !== this.passwordConfirm) {
        this.error.push(
          "Le mot de passe de confirmation est différent du mot de passe"
        );
      }
    },
  },

  computed: {
    //Ma fonction de Validation Formulaire
    btndisable: function() {
      return this.error.length !== 0;
    },
  },

  watch: {
    firstName(value) {
      this.firstName = value;
      this.checkForm();
    },

    lastName(value) {
      this.lastName = value;
      this.checkForm();
    },

    email(value) {
      this.femail = value;
      this.checkForm();
    },

    password(value) {
      this.password = value;
      this.checkForm();
    },

    passwordConfirm(value) {
      this.passwordConfirm = value;
      this.checkForm();
    },
  },
};
</script>

<style scoped>
button {
  margin-bottom: 20px;
}

b {
  display: flex;
  justify-content: center;
}
</style>
