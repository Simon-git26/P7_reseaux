<template>
    <div class="actuality">
        <h3>Fil d'Actualitée</h3>

        <div class="publication" v-for="{post, imageUrl} in posts" :key="post">
            <img class="resize" :src="imageUrl" />
            {{ post }}
            <div class="comments">
                <h4>Commentaires</h4>
                <form @submit.prevent="commentMethod">
                <input class="commentId" type="text" v-model="comment" placeholder="Ecrivez un commentaire" />
                </form>

                <!-- <div v-for="{comment} in comments" :key="comment">
                    {{ comment }}
                </div> -->
            </div>
        </div>
    </div>
</template>



<script>
    import axios from '../api'

    export default {
        name: 'Publication',

        data() {
            return {
                posts : [],
                imageUrl: "",
                comment: "",
                /*comments: [],*/
            }
        },

        async created() {
            const connected = localStorage.getItem('token');
            if (!connected) {
                this.$router.push('/login');
            }

            console.log(localStorage.getItem('token'));
            const res = await axios.get('user');

            this.user = res.data;
        },

        methods: {
            onMounted() {

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
            },

            /*onComments() {
                axios.get('/comments', {
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
            },*/


            commentMethod() {
                const data = {
                    comment: this.comment
                };

                const url = '/users/' + this.user.id + '/comment';

                axios
                    .post(url, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                console.log(res);
                })
                .catch((err) => {
                console.log(err);
                });
            }
        },
        

        mounted() {
            this.onMounted();
            /*this.onComments();*/
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

    .publication {
        padding: 10px;
        height: auto;
        width: 100%;
        border: 1px black solid;
        margin-bottom: 20px;
    }

    .comments h4 {
        text-align: center;
    }

    .resize {
        height: 98px;
        width: 150px;
    }

    .commentId {
        width: 80%;
        display: flex;
        margin: auto;
        border: 1px #6f84a8 solid;
        border-radius: 5px;
    }
</style>