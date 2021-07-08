<template>
    <div class="card mb-4 border border-secondary">
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
        
            <div class="card-body d-flex">
                <div v-if="post.imagePath" class="col-md-6">
                    <img :src="`http://localhost:3000/${post.imagePath}`" class="img-fluid rounded-start" alt="#">
                </div>
                <p class="card-text col-md-6">{{ post.post }}</p>
            </div>
            
            <button class="btn-primary btn-sm mt-2 col-md-5 mx-auto" :class="{'btn-primary': post.Comments.length > 0, 'btn-secondary': post.Comments.length === 0}" 
                    @click.prevent="seeComments = !seeComments, showModal = true">
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
                seeComments: false,
                showModal: false,
                comments: [],
            }
        },

        methods: {

            formatDate(date) {
                return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short'}).format(new Date(date));
            },
        },

        //watch: {
        //    // Watcher sur data seeComments afin de faire marcher le focus de l'input au click sur commentaire
        //    seeComments: function (value) {
        //        if (value) {
        //            this.$nextTick(() => {
        //                this.$refs.inputRef.focus()
        //            })
        //        }
        //    },
        //},





         //mounted() {
        //    this.fetchComments();
        //},

        ////Recuperer tous les commentaires
            //fetchComments () {
            //    axios.get('/comments', {
            //        headers: {
            //            "Content-Type": "application/json",
            //        },
            //    })
            //    .then((response) => {
            //        console.log(response);
            //        this.comments = response.data;
            //    })
            //    .catch((err) => {
            //    console.log(err);
            //    });
            //},
    }
</script>