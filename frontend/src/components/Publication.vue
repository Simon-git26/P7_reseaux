<template>
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-4">
                <img :src="post.imageUrl" class="img-fluid rounded-start" alt="#">
            </div>

            <div class="col-md-8">
                <div class="card-body">
                    <p class="card-text">{{ post.post }}</p>
                    <p class="card-text"><small class="text-muted">{{ post.createdAt }}</small></p>
                    <button class="btn-primary btn-sm" :class="{'btn-primary': comments.length > 0, 'btn-secondary': comments.length === 0}" 
                            @click.prevent="seeComments = !seeComments">
                        Afficher les commentaires ({{ comments.length }})
                    </button>
                </div>
            </div>
        </div>

        <div v-if="seeComments">
            <h5 class="d-flex justify-content-center">Commentaires</h5>

            <form @submit.prevent="commentPost()">
                <div class="input-group mb-2">
                    <!-- ref="inputRef"  sert a enregistrer une reference inputRef afin de pouvoir sans servir sur tous le composant ou il est installé -->
                    <input class="form-control" ref="inputRef" type="text" v-model="comment" placeholder="Ecrivez un commentaire" />
                    <button class="btn btn-outline-primary" @click.prevent="commentPost()" type="button" :disabled="comment.lenght < 3">Envoyer</button>
                </div>
            </form>


            <figure v-for="comment in comments" :key="comment.id" class="d-flex justify-content-between border-top border-bottom border-secondary rounded pt-2 pl-2 pr-2">
                <div>
                    <blockquote class="blockquote">
                    <p>{{ comment.comment }}</p>
                    </blockquote>

                    <!--- blockquote-footer Permet un affichage un peu gris italique comme une citation -->
                    <figcaption class="blockquote-footer">
                        Posté par Utilisateur n°{{ comment.UserId }}
                    </figcaption>
                </div>

                <div>
                    <button type="button" class="btn-sm btn-info" @click.prevent="changeComment()">Modifier</button>
                    <button type="button" class="btn-sm btn-danger ml-2">Supprimer</button>
                </div>
                

                <!-- <figcaption class="blockquote-footer">
                    Posté par {{ this.$App.user.firstName }}
                </figcaption> -->
            </figure>
        </div>
    </div>
</template>



<script>
    import axios from '../api'

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
                comment: "",
                comments: [],
                newComment: null,
            }
        },

        methods: {
            //Récuperer tous les commantaires
            onComments() {
                axios.get('/comments/' + this.post.id, {
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
                this.comment = "",
                this.onComments()
                })
                .catch((err) => {
                console.log(err);
                });
            },

            /*//Modifier un commentaire
            changeComment() {

                const data = {
                    comment: this.comment,
                    newComment: this.newComment,
                }

                console.log();

                const url = '/comments/' + this.post.id + '/changeComment';

                axios.put(url, data, {
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
            }*/
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
            }
        },

        //Une fois monté j'appelle la fonction
        mounted() {
            this.onComments();
        }
    }

</script>



<style scoped>
    .blockquote {
        font-size: 1.1em;
    }

    .card {
        border: 1px black solid
    }
</style>