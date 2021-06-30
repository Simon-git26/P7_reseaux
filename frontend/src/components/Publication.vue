<template>
    <div class="card mb-3 border border-secondary">
        <div class="row g-0">
            <div class="col-md-4" v-if="post.imagePath">
                <img :src="`http://localhost:3000/${post.imagePath}`" class="img-fluid rounded-start" alt="#">
            </div>

            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-text">Posté par {{ post.User.firstName }} {{ post.User.lastName }}</h5>
                    <p class="card-text"><small class="text-muted">Le {{ formatDate(post.createdAt) }}</small></p>
                    <p class="card-text">{{ post.post }}</p>
                    <button class="btn-primary btn-sm" :class="{'btn-primary': post.Comments.length > 0, 'btn-secondary': post.Comments.length === 0}" 
                            @click.prevent="seeComments = !seeComments, showModal = true">
                        Afficher les commentaires <em class="far fa-comment-alt"></em> ({{ post.Comments.length }}) 
                    </button>
                </div>
            </div>
        </div>

        <!------------ Afficher les commentaires en modal ----------->
        <div v-if="showModal">
            <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="d-flex justify-content-center">Commentaires</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" @click="showModal = false">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">
                         <div class="row g-0">
                            <div class="col-md-4" v-if="post.imagePath">
                                <img :src="`http://localhost:3000/${post.imagePath}`" class="img-fluid rounded-start" alt="#">
                            </div>

                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-text">Posté par {{ post.User.firstName }} {{ post.User.lastName }}</h5>
                                    <p class="card-text"><small class="text-muted">Le {{ formatDate(post.createdAt) }}</small></p>
                                    <p class="card-text">{{ post.post }}</p>
                                    <button class="btn-primary btn-sm" :class="{'btn-primary': post.Comments.length > 0, 'btn-secondary': post.Comments.length === 0}" 
                                            @click.prevent="seeComments = !seeComments, showModal = true">
                                        Afficher les commentaires <em class="far fa-comment-alt"></em> ({{ post.Comments.length }}) 
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div v-if="seeComments" class="mt-3">

                            <form @submit.prevent="commentPost()">
                                <div class="input-group mb-2">
                                    <input class="form-control border border-success" ref="inputRef" type="text" v-model="comment" placeholder="Ecrivez un commentaire" />
                                    <button class="btn btn-outline-success" @click.prevent="commentPost()" type="button">Envoyer</button>
                                </div>
                            </form>

                            <figure v-for="comment in post.Comments" :key="comment.id" class="d-flex justify-content-between border-top border-bottom border-secondary rounded pt-2 pl-2 pr-2 bg-light">
                                <div>
                                    <blockquote class="blockquote fs-5">
                                    <p>{{ comment.comment }}</p>
                                    </blockquote>

                                    <!--- blockquote-footer Permet un affichage un peu gris italique comme une citation -->
                                    <figcaption class="blockquote-footer">
                                        Posté par {{ post.User.firstName }} {{ post.User.lastName }} le {{ formatDate(comment.createdAt) }}
                                    </figcaption>
                                </div>

                                <!-- seeInput = true quand on clique sur modifier / Si seeInput = true alors Non affichage du bouton Modifier -->
                                <div class="d-flex flex-row-reverse">
                                    <div class="d-flex">   
                                        <div v-if="!seeInput">
                                            <button class="btn-primary btn-sm" @click.prevent="seeInput = !seeInput">
                                                Modifier
                                            </button>
                                        </div>

                                        <div>
                                            <button class="btn-danger btn-sm ml-2" @click.prevent="deleteComment(comment)">
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                    
                                    
                                    <div v-if="seeInput">
                                        <form @submit.prevent="changeComment(comment)">
                                            <div class="input-group">
                                                <input class="form-control" type="text" v-model="commentChange" placeholder="Modifier un commentaire" />
                                                <button class="btn btn-outline-primary" @click.prevent="changeComment(comment)" type="button">Modifier</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </figure>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="showModal = false">Fermer</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </transition>
        </div>
    </div>
</template>



<script>
    import axios from '../api';
    import Vue from 'vue';

    export default {
        name: 'Publication',

        props: {
            post: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
                seeComments: false,
                seeInput: false,
                comment: "",
                commentChange: "",
                showModal: false,
            }
        },

        methods: {

            formatDate(date) {
                return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short'}).format(new Date(date));
            },

            //Crée les commentaires
            commentPost() {
                //Empeche l'envoi du commentaire si il est inferieur à 2 caractères
                if (this.comment.length < 2) {
                    return
                }

                const data = {
                    comment: this.comment
                };

                const url = '/posts/' + this.post.id + '/comment';
                axios
                    .post(url, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                //Quand on commente et que le commentaire est partit sans erreur, je vide la variable comment afin de vider l'input commentaire
                .then((res) => {
                
                    Vue.notify({
                        group: 'foo',
                        title: 'Notifications',
                        text: 'Commentaire envoyé !'
                    })
                window.location.reload();
                })
                .catch((err) => {
                console.log(err);
                });
            },

            //Modifier un commentaire
            changeComment(comment) {
                console.log('comment', comment);
                const data = {
                    comment: this.commentChange
                }

                const url = '/comments/' + comment.id ;
                axios.put(url, data, {
                    headers: {
                    "Content-Type": "application/json",
                    },
                })

                .then((response) => {
                this.comments = response.data;
                window.location.reload();
                    Vue.notify({
                        group: 'foo',
                        title: 'Notifications',
                        text: 'Commentaire Modifié !'
                    })
                })

                .catch((err) => {
                console.log(err);
                });
            },

            //Suprimer un commantaire
            deleteComment(comment) {

                const data = {
                    comment: this.comment
                }

                const url = '/comments/' + comment.id + '/delete' ;
                axios.delete(url, data, {
                    headers: {
                    "Content-Type": "application/json",
                    },
                })

                .then((response) => {
                this.comments = response.data;
                window.location.reload();
                })

                .catch((err) => {
                console.log(err);
                });
            }
        },

        watch: {
            // Watcher sur data seeComments afin de faire marcher le focus de l'input au click sur commentaire
            seeComments: function (value) {
                //si seeComments = true alors faire la methode $nextTick afin de laisser le temps au template v-if de crée l'html donc c'est vue qui gere cela
                //Sans nextTick, vue n'auras pas le temps car le template n'auras pas été crée donc juste apres (la creation) on peut appliquer le focus input
                if (value) {
                    this.$nextTick(() => {
                        this.$refs.inputRef.focus()
                    })
                }
            },
        },
    }
</script>



<style scoped>

.modal-dialog {
    max-width: 800px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>