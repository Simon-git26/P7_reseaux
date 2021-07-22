<template>
    <div>
        <h3 class="d-flex justify-content-center mb-3">Nos Groupomaniens !</h3>

        <div v-for="user in users" :key="user.id" :user="user" class="d-flex mb-3 container-fluid">
            <div class="card mb-3 mx-auto col-12 col-md-6 border border-dark">
                <div class="row g-0">

                    <div class="col-md-4" v-if="user.imagePath">
                        <img :src="`http://localhost:3000/${user.imagePath}`" class="img-fluid rounded-circle w-75" alt="#">
                    </div>

                    <div class="col-md-8 d-flex align-items-center text-center">
                        <div class="card-body d-flex justify-content-between breakword text-break">
                            <h5>{{ user.firstName }} {{ user.lastName }}<span class="ml-1" v-if="isConnected && user.isAdmin == true"><em class="fs-6 fas fa-star"></em></span></h5>
                            <div v-if="isConnected && $root.user.isAdmin == true">
                                <button class="btn-danger btn-sm ml-2" @click.prevent="modoDeleteUser(user)">
                                    <em class="fas fa-trash-alt"></em>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>      
    </div>
</template>


<script>
    import axios from '../api'

    export default {

        name: 'Team',

        data() {
            return {
                users: [],
            }
        },

        mounted() {
            this.fetchUsers()
        },

        computed: {
            isConnected: function() {
                return this.$root.user;
            }
        },

        methods: {
            fetchUsers () {

                axios.get('/users', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    console.log(response);
                    this.users = response.data;
                })
                .catch((err) => {
                console.log(err);
                });
            },


            modoDeleteUser(user) {

                const valid = window.confirm('Supprimer ce compte ?')

                if (!valid) {
                    window.alert('Suppression annulée !');
                } else {
                    const data = {
                        user: user
                    }

                    const url = '/users/' + user.id + '/modoDelete';

                    axios.delete(url, data, {
                        headers: {
                        "Content-Type": "application/json",
                        },
                    })

                    .then((response) => {
                        this.$notify({
                            title: 'Notifications',
                            text: 'Compte supprimé !'
                        })

                        this.fetchUsers()
                    })

                    .catch((err) => {
                        console.log(err);
                    });
                }  
            }
        }
    }
</script>
