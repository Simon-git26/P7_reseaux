<template>
    <div>
        <h3 class="d-flex justify-content-center mb-3">Nos Groupomaniens !</h3>

        <div v-for="user in users" :key="user.id" :user="user" class="d-flex mb-3 container-fluid">
            <div class="card shadow-lg mb-3 mx-auto col-12 col-md-6 border border-dark">
                <div class="row g-0">

                    <div class="col-md-4 d-flex justify-content-center" v-if="user.imagePath">
                        <img :src="`http://localhost:3000/${user.imagePath}`" class="img-fluid rounded-circle w-75" alt="#">
                    </div>

                    <div class="col-md-8 d-flex align-items-center text-center">
                        <div class="card-body d-flex justify-content-between breakword text-break">
                            <div class="d-flex flex-column">
                                <button v-if="isConnected && $root.user.id != user.id" class="btn btn-primary" @click.prevent="showConversation = true, findUserMessagerie(user), findAllMessages(user)">
                                {{ user.firstName }} {{ user.lastName }}
                                <span class="ml-1" v-if="isConnected && user.isAdmin == true"><em class="fs-6 fas fa-star"></em></span>
                                </button>

                                <a href="mailto:" class="text-dark">{{ user.email }}</a>
                            </div>
                            
                            <div v-if="isConnected && $root.user.isAdmin == true">
                                <button class="btn btn-danger btn-sm ml-2" @click.prevent="modoDeleteUser(user)">
                                    <em class="fas fa-trash-alt"></em>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showConversation">
            <Messagerie v-on:modalMessage="showConversation = false" :user="user" :messages="messages" />
        </div>
        
    </div>
</template>


<script>
    import axios from '../api'
    import Messagerie from './importComponents/Messagerie.vue'
    import Bus from '../bus'

    export default {

        name: 'Team',

        components: {
            Messagerie
        },

        data() {
            return {
                users: [],
                user: {},
                showConversation: false,
                messages: []
            }
        },

        mounted() {
            this.fetchUsers();
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
            },

            findUserMessagerie(user) {
                const data = {
                    user: user
                }

                const url = '/users/' + user.id + '/destinataire';

                axios
                    .get(url, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                .then((findUser) => {
                    console.log(findUser)
                    this.user = findUser.data;
                })
                .catch((err) => {
                console.log(err);
                });
            },


            findAllMessages(user) {
                //recuperer tous les messages avec le meme id → destinataireId + expediteurId

                const url = '/messages?destinataire=' + user.id + '&expediteur=' + this.$root.user.id

                console.log(url)

                axios.get(url, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                .then((response) => {
                    this.messages = response.data;
                })

                .catch((err) => {
                console.log(err);
                });
            
            }
        }
    }
</script>
