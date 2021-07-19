<template>
    <div>
        <h3 class="d-flex justify-content-center mb-3">Nos Groupomaniens !</h3>
        <div class="mx-auto col-12 col-md-6">
            <div v-for="user in users" :key="user.id" :user="user" class="d-flex border border-secondary rounded-3 mb-3 container-fluid">
                <div class="row">
                    <div class="col-4" v-if="user.imagePath">
                        <img :src="`http://localhost:3000/${user.imagePath}`" class="img-fluid rounded-circle w-75" alt="#">
                    </div>
                    <div class="col-8 d-flex align-items-center justify-content-between breakword text-break">
                        <h5>{{ user.firstName }} {{ user.lastName }}</h5>
                        <div v-if="isConnected && $root.user.id === 1">
                            <button class="btn-danger btn-sm ml-2" @click.prevent="modoDeleteUser(user)">
                                <em class="fas fa-trash-alt"></em>
                            </button>
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
