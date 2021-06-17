<template>
    <div class="publication">
        <h4>Crée une publication...</h4>
        
        <textarea id="createPost" type="text" placeholder="Crée votre publication"></textarea>
        <!--v-model="createPost"-->
        
        <div class="btn-pos">
            <div class="border-secondary">
                <label for="image">Joindre une image</label>
                <input type="file" id="image" name="image" />
            </div>
            <button class="btn btn-primary" v-on:click="publish">Publier !</button>
        </div>
    </div>
</template>



<script>
    import axios from '../api'

    export default {
        name: 'Publish',

        data() {
            return {
                /*createPost: "",*/
                post: "",
                /*image: ;*/
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

        methods : {

            publish() {
                
                this.post = document.getElementById('createPost').value;

                console.log("data");
                const data = {
                    /*createPost: this.createPost,*/
                    post: this.post,
                };

                const url = '/users/' + this.user.id + '/publication';
                axios
                    .post(url, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    })

                    .then((res) => {
                    console.log(res);
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
    .publication {
        margin-top: 40px;
        border: 1px gray solid;
        padding: 15px;
        border-radius: 8px;
    }

    .publication h4 {
        margin-bottom: 20px;
    }

    #createPost {
        width: 100%;
        height: 100px;
    }

    .btn-pos {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
    }
</style>