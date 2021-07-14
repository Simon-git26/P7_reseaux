<template>
    <div class="row">
        <Publish />

        <div class="mt-4">
            <h3>Fil d'Actualitée</h3>
            <Publication v-for="post in posts" :key="post.id" :post="post" />
        </div>
        
    </div>
</template>




<script>
    import Publish from './Publish.vue'
    import Publication from './Publication.vue'
    import axios from '../../api'
    import Bus from '../../bus'
   
    export default {
        name: 'Feed',

        components: {
            Publish,
            Publication
        },

        data () {
            return {
                posts: [],
            }
        },

        mounted () {
            this.fetchPosts();
            Bus.$on('refresh', () => this.fetchPosts());
        },

        methods: {
            //recuperer tous mes posts
            fetchPosts () {
                axios.get('/publications', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                .then((response) => {
                    this.posts = response.data;
                })

                .catch((err) => {
                console.log(err);
                });
            } 
        }
    }

</script>