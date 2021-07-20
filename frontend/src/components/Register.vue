<template>
  <div>
    <p v-if="password !== passwordConfirm && password && passwordConfirm">
      <strong
        >Veuillez renseignez le bon mot de passe:<br />
        * Majuscule obligatoire *<br />
        * Chiffres Obligatoires *<br />
        * Caractères spcéciaux Obligatoire *
      </strong>
    </p>

    <form @submit.prevent="handleSubmit">
      <h3>Inscription</h3>

      <div class="form-group">
        <em class="fas fa-user-tie"></em><label class="ml-2">Votre Nom *</label>
        <input type="text" class="form-control validate" v-model="firstName" placeholder="Votre nom" required pattern="[A-z]{2,20}"/>
      </div>

      <div class="form-group">
        <em class="fas fa-user-tie"></em><label class="ml-2">Votre Prenom *</label>
        <input type="text" class="form-control validate" v-model="lastName" placeholder="Votre Prenom" required pattern="[A-z]{2,20}" />
      </div>

      <div class="form-group input-group mb-3 d-flex flex-column">
        <div>
          <em class="fas fa-envelope"></em><label class="ml-2">Email *</label>
        </div>

        <div class="d-flex">
          <input type="text" class="form-control validate" placeholder="Email" v-model="email" aria-label="Recipient's username" aria-describedby="basic-addon2" required pattern="[A-z, 0-9]{2,20}">
          <span class="input-group-text" id="basic-addon2">@groupomania.com</span>
        </div>
      </div>

      <div class="form-group">
        <em class="fas fa-lock"></em><label class="ml-2">Mot de Passe *</label>
        <input type="password" class="form-control" v-model="password" placeholder="Mot de passe" required />
      </div>

      <div class="form-group">
        <em class="fas fa-lock"></em><label class="ml-2">Confirmez le Mot de Passe *</label>
        <input type="password" class="form-control" v-model="passwordConfirm" placeholder="Confirmez le Mot de passe" required />
      </div>

      <button class="mb-2 btn btn-primary btn-block" :disabled="btndisable">
        Inscription !
      </button>

      <p>Vous avez déja un compte ?<a href="Login">Connectez vous !</a></p>
    </form>
  </div>
</template>

<script>
import axios from "../api";
import Bus from '../bus';

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
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email + `${'@groupomania.com'}`,
        password: this.password,
      };

      axios
        .post("/register", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {

          Bus.$emit('connected', res.data)
          this.$router.push("/login");
          this.$notify({
            title: 'Notifications',
            text: 'Inscription réalisée !'
          })
          
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

  .validate:valid {
  background-color: #ddffdd;
  }

  .validate:required:valid {
  border-color: #008000;
  }
</style>