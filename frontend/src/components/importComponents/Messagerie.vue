<template>
    <transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-dialog-scrollable mx-auto" role="document">
                <div class="modal-content shadow-lg">

                    <div class="modal-header">
                        <h5 class="d-flex justify-content-center">Conversations entre {{ $root.user.firstName }} et {{ user.firstName }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" v-on:click="$emit('modalMessage')">&times;</span>
                        </button>
                    </div>

                <div class="modal-body">

                    <div>
                        <div v-for="message in messages" :key="message.id">
                            <div>
                                <blockquote class="blockquote fs-5">
                                    <p class="m-1">{{ message.contenu }}</p>
                                </blockquote>
                                
                                <div class="blockquote-footer">
                                    Posté par {{ message.expediteur.firstName }} {{ message.expediteur.lastName }}
                                </div>
                            </div>  
                        </div>
                        
                        <input  type="text" v-model="message" class="style border border-dark rounded" /> <button v-on:click="createMessage()" class="send rounded btn btn-sm btn-primary">Envoyer</button>
                    </div>

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"  v-on:click="$emit('modalMessage')">Fermer</button>
                </div>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>



<script>
    import axios from '../../api'
    import Bus from '../../bus'

    export default {
        name: 'Messagerie',

        props: {
            user: {
                type: Object,
                required: true
            },

            users: {
                type: Array,
                required: true
            },

            messages: {
                type: Array,
                required: true
            }
        },

        data() {
            return {
                message: null,
            }
        },

        computed: {
            isConnected: function() {
                return this.$root.user;
            }
        },

        methods: {
            // Crée un message avec le user qui est connecté
            createMessage() {
                const data = {
                    message: this.message,
                    user: this.user.id
                }
                console.log('message', data);

                const url = '/users/' + this.$root.user.id + '/messagerie';

                axios
                    .post(url, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                .then(() => {
                    this.message = ""
                    Bus.$emit('refreshMessages');
                })
                .catch((err) => {
                console.log(err);
                });
            },
        }
    }

</script>


<style scoped>
    .style {
        width: 90%;
    }

    .send {
        width: 9%;
    }
</style>
