<template>
    <div>

        <p v-if="error.length && showErrors">
            <b>Please complete all required fields</b>
            <ul>
                <li v-for="e in error" v-bind:key="e.id">
                    {{ e }}
                </li>
            </ul>
        </p>

        <form @submit.prevent="handleSubmit, checkForm">
            <h3>Inscription</h3>

            <div class="form-group">
                <label>Votre Nom</label>
                <input type="text" class="form-control" v-model="firstName" placeholder="Votre nom" />
            </div>

            <div class="form-group">
                <label>Votre Prenom</label>
                <input type="text" class="form-control" v-model="lastName" placeholder="Votre Prenom" />
            </div>

            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" v-model="email" placeholder="Email" />
            </div>

            <div class="form-group">
                <label>Mot de Passe</label>
                <input type="password" class="form-control" v-model="password" placeholder="Mot de passe" />
            </div>

            <div class="form-group">
                <label>Confirmez le Mot de Passe</label>
                <input type="password" class="form-control" v-model="passwordConfirm" placeholder="Confirmez le Mot de passe" />
            </div>

            <button class="btn btn-primary btn-block">Inscription !</button>

            <p>Vous avez déja un compte ?<a href="Login">Connectez vous !</a></p>
        </form>
    </div>
</template>




<script>
    import axios from '../api'


    export default {
        name: 'Register',

        data() {

            return {
                showErrors: false,
                error: [],
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                passwordConfirm: ""
            } 
        },

        methods: {
            handleSubmit() {
            
                const data = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password,
                };

                axios.post('/register', data)
                    .then(res => {
                        console.log(res)
                        }
                    ).catch(err => {
                        console.log(err)
                    }
                )
            }
        },

        computed: {
            //Ma fonction de Validation Formulaire
            checkForm(e) {

                if (this.firstName && this.lastName && this.email && this.password && this.passwordConfirm) {
                    console.log('checkForm fonction est appelé')
                }
                this.error = [];
                if (!this.firstName) {
                    this.error.push('FirstName is required')
                }

                if (!this.lastName) {
                    this.error.push('LastName is required')
                }

                if (!this.email) {
                    this.error.push('Email is required')
                }

                if (!this.password) {
                    this.error.push('Password is required')
                }

                if (!this.passwordConfirm) {
                    this.error.push('PasswordConfirm is required')
                }
                console.warn('errors', this.error)
            }
        }
    }
</script>


<style scoped>
button {
    margin-bottom: 20px;
}
</style>