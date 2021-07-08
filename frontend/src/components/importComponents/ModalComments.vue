<template>
    <transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-dialog-scrollable mx-auto" role="document">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="d-flex justify-content-center">Commentaires</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" v-on:click="$emit('modal')">&times;</span>
                        </button>
                    </div>

                <div class="modal-body">
                    <div class="mt-3">

                        <div class="row g-0">
                            <div class="d-flex mb-2">
                                <div class="col-md-2" v-if="post.User.imagePath">
                                    <img :src="`http://localhost:3000/${post.User.imagePath}`" class="img-fluid rounded-circle w-75" alt="#">
                                </div>

                                <div class="col-md-10">
                                    <h5 class="card-text">Posté par {{ post.User.firstName }} {{ post.User.lastName }}</h5>
                                    <p class="card-text"><small class="text-muted">Le {{ formatDate(post.createdAt) }}</small></p> 
                                </div>
                            </div>
                        
                            <div class="card-body">
                                <div v-if="post.imagePath" class="col-md-10 mx-auto pb-2">
                                    <img :src="`http://localhost:3000/${post.imagePath}`" class="img-fluid rounded-start" alt="#">
                                </div>
                                <p class="card-text col-md-12 text-center">{{ post.post }}</p>
                            </div>
                        </div>


                        <form @submit.prevent="commentPost()">
                            <div class="input-group mb-2">
                                <input class="form-control border border-success" ref="inputRef" type="text" v-model="comment" placeholder="Ecrivez un commentaire" />
                                <button class="btn btn-outline-success" @click.prevent="commentPost()" type="button">Envoyer</button>
                            </div>
                        </form>

                        <figure v-for="comment in post.Comments" :key="comment.id" class="justify-content-between border-top border-bottom border-secondary rounded pt-2 pl-2 pr-2 bg-light">
                           
                           <div>
                                <div class="d-flex">
                                    <div class="col-md-2" v-if="comment.User.imagePath">
                                        <img :src="`http://localhost:3000/${comment.User.imagePath}`" class="img-fluid rounded-circle" alt="#">
                                    </div>
                                    <div>
                                        <blockquote class="blockquote fs-5">
                                            <p>{{ comment.comment }}</p>
                                        </blockquote>

                                        <figcaption class="blockquote-footer">
                                            Posté par {{ comment.User.firstName }} {{ comment.User.lastName }} le {{ formatDate(comment.createdAt) }}
                                        </figcaption>

                                        <div class="d-flex">
                                            <div class="d-flex" v-if="isConnected && comment.UserId === $root.user.id">
                                                <div v-if="!seeInput">
                                                    <button class="btn-primary btn-sm" @click.prevent="seeInput = !seeInput">
                                                        Modifier
                                                    </button>
                                                </div>

                                                <div v-if="!seeInput">
                                                    <button class="btn-danger btn-sm ml-2" @click.prevent="deleteComment(comment)">
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="seeInput">
                                    <form @submit.prevent="changeComment(comment)">
                                        <div class="input-group">
                                            <input class="form-control" type="text" v-model="commentChange" placeholder="Modifier un commentaire" /> <!-- :value="comment.comment" -->
                                            <button class="btn btn-outline-primary" @click.prevent="changeComment(comment)" type="button">Modifier</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </figure>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"  v-on:click="$emit('modal')">Fermer</button>
                </div>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>



<script>
    import axios from '../../api';

    export default {
        name: 'ModalComments',

        data() {
            return {
                commentChange: "",
                seeInput: false,
                comment: "",
                
            }
        },

        props: {
            post: {
                type: Object,
                required: true
            },
        },

        computed: {
            isConnected: function() {
                return this.$root.user;
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
                    this.$notify({
                        title: 'Notifications',
                        text: 'Commentaire Publié !'
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
    }
</script>



<style scoped>

.modal-body {
    max-height: 800px;
}

.modal-dialog-scrollable {
    width: 700px;
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