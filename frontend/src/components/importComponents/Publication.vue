<template>
    <div class="card shadow-lg mb-4 border border-secondary">
        <div class="card-header d-flex align-items-center">
            <div class="w-auto" v-if="post.User.imagePath">
                <img :src="`http://localhost:3000/${post.User.imagePath}`" class="img-fluid rounded-circle w-50" alt="#">
            </div>

            <div class="col-md-10 d-flex justify-content-between">
                <div>
                    <h5 class="card-text">Posté par {{ post.User.firstName }} {{ post.User.lastName }}<span class="ml-1" v-if="isConnected && post.UserId === $root.user.id && $root.user.isAdmin == true || post.User.isAdmin == true"><em class="fs-6 fas fa-star"></em></span></h5>
                    <p class="card-text"><small class="text-muted">Le {{ formatDate(post.createdAt) }}</small></p> 
                </div>
                
                <div v-if="isConnected && post.UserId === $root.user.id || isConnected && $root.user.isAdmin == true">
                    <button class="btn btn-danger btn-sm ml-2" @click.prevent="modoDeletePost(post)">
                        <em class="fas fa-trash-alt"></em>
                    </button>
                </div>
            </div>
        </div>

        <div class="card-body d-flex text-center">
            <img v-if="post.imagePath" :src="`http://localhost:3000/${post.imagePath}`" class="img-fluid rounded-start w-25" alt="#">
            <p class="card-text p-5">{{ post.post }}</p>
        </div>

        <div class="card-footer text-muted" v-if="!$attrs.showBtn">
            <button class="btn btn-primary btn-sm mt-2 col-md-5 mx-auto" :class="{'btn-primary': post.Comments.length > 0, 'btn-secondary': post.Comments.length === 0}" 
                    @click.prevent="showModal = true">
                Afficher les commentaires <em class="far fa-comment-alt"></em> ({{ post.Comments.length }}) 
            </button>
        </div>
        

        <!------------ Afficher les commentaires en modal ----------->
        <div v-if="showModal">
            <ModalComments :post="post" v-on:modal="showModal = false" />
        </div>
        
    </div>
</template>



<script>
    import ModalComments from './ModalComments.vue'
    import axios from '../../api'
    

    export default {
        name: 'Publication',

        components: {
            ModalComments
        },

        props: {
            post: {
                type: Object,
                required: true
            },
        },

        data() {
            return {
                showModal: false,
                comments: [],
            }
        },

        computed: {
            isConnected: function() {
                return this.$root.user;
            },
        },

        methods: {

            formatDate(date) {
                return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short'}).format(new Date(date));
            },

            modoDeletePost(post) {
                const valid = window.confirm('Supprimer ce post ?')

                if (!valid) {
                    window.alert('Suppression annulée !');
                } else {
                    const data = {
                        post: post,
                    }

                    console.log('data', data);
                    const url = '/publications/' + post.id

                    axios.delete(url, data, {
                        headers: {
                        "Content-Type": "application/json",
                        },
                    })

                    .then((response) => {
                        this.$parent.fetchPosts()

                        this.$notify({
                            title: 'Notifications',
                            text: 'Post Supprimé !'
                        })
                    })

                    .catch((err) => {
                        console.log(err);
                    });
                }
            }
        },
    }
</script>