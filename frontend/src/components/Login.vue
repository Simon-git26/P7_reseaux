<template>
    <div>
        <p v-if="password && email ">
            <b>Le mot de passe ne correspond pas à l'email.</b><br>
            <b>Vous disposez de {{ count }} essaie</b>
        </p>

        <form @submit.prevent="handlelogsubmit">
            <h3>Connection</h3>

            <div class="form-group">
                <label>Email *</label>
                <input type="email" class="form-control" v-model="email" placeholder="Email" required />
            </div>

            <div class="form-group">
                <label>Mot de Passe *</label>
                <input type="password" class="form-control" v-model="password" placeholder="Mot de passe" required />
            </div>

            <button class="btn btn-primary btn-block" v-on:click="countLimit" :disabled="btnlogdisable">Connection</button>

            <p>Vous n'avez pas de compte ?<a href="Register">Inscrivez vous !</a></p>
        </form>
    </div>
    
</template>





<script>
    import axios from '../api'

    export default {
        name: 'Login',

        data() {
            return {
                showErrors: [],
                error: ["error"],
                email: "",
                password: "",

                count: 3
            }
        },

        methods: {
            handlelogsubmit() {
                const data = {
                    email: this.email,
                    password: this.password,
                };

                axios.post('/login', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    
                })
                    .then(res => {
                        localStorage.setItem('token', res.data.token);
                        console.log(res);
                        }
                    ).catch(err => {
                        console.log(err);
                    }
                )

                /* this.$router.push('/Groupomania'); */
            },

            checkFormLog() {
                if (this.email && this.password) {
                    console.log('checkFormLog fonction est appelé')
                }
                this.error = [];

                if (!this.email) {
                    this.error.push('Email is required')
                }

                if (!this.password) {
                    this.error.push('password is required')
                }
            },

            countLimit() {
                this.count--;
            }
        },


        computed: {
            //Ma fonction de Validation Formulaire
            btnlogdisable: function() {
                return this.error.length !== 0
            }
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
        }
    }
</script>





<style scoped>
button {
    margin-bottom: 20px;
}
</style>