<template>
    <div class="card mb-3 border border-secondary">
        <div class="row g-0">
            <div class="col-md-4" v-if="post.imagePath">
                <img :src="`http://localhost:3000/${post.imagePath}`" class="img-fluid rounded-start" alt="#">
            </div>

            <div class="col-md-8">
                <div class="card-body">
                    <p class="card-text">{{ post.post }}</p>
                    <p class="card-text"><small class="text-muted">{{ post.createdAt }}</small></p>
                    <button class="btn-primary btn-sm" :class="{'btn-primary': post.Comments.length > 0, 'btn-secondary': post.Comments.length === 0}" 
                            @click.prevent="seeComments = !seeComments">
                        Afficher les commentaires <em class="far fa-comment-alt"></em> ({{ post.Comments.length }}) 
                    </button>
                </div>
            </div>
        </div>

        <div v-if="seeComments" class="mt-3">
            <h5 class="d-flex justify-content-center">Commentaires</h5>

            <form @submit.prevent="commentPost()">
                <div class="input-group mb-2">
                    <!-- ref="inputRef"  sert a enregistrer une reference inputRef afin de pouvoir sans servir sur tous le composant ou il est installé -->
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
                        Posté par Utilisateur n°{{ comment.UserId }}
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
            }
        },

        methods: {

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
                this.comment = "",
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
                this.commentChange = "",
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
</style>