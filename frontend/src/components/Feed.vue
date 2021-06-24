<template>
    <div>
        <Publish />

        <div class="actuality">
            <h3>Fil d'Actualitée</h3>
            <Publication v-for="post in posts" :key="post.id" :post="post" />
        </div>
        
    </div>
</template>




<script>
    import Publish from './Publish'
    import Publication from './Publication'
    import axios from '../api'
   
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
            this.fetchPosts()
        },

        methods: {
            fetchPosts () {
                axios.get('/publications', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                .then((response) => {
                    console.log(response);
                    this.posts = response.data;
                })

                .catch((err) => {
                console.log(err);
                });
            } 
        }
    }

</script>



<style scoped>
    .actuality {
        margin-top: 40px;
    }

    .actuality h3 {
        text-decoration: underline;
        color: #191f2e;
    }
</style>