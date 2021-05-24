<template>
    <form @submit.prevent="handleSubmit">
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
    </form>
</template>




<script>
    import axios from '../api'


    export default {
        name: 'Register',

        data() {
            return {
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
        }

        //computed: {}
    }
</script>
