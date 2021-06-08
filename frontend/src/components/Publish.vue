<template>
    <div class="publication">
        <h4>Crée une publication...</h4>

        <textarea id="public" type="text" placeholder="Crée votre publication"></textarea>

        <div class="btn-pos">
            <button class="btn btn-primary">Choisir une image</button>
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
                post: ""
            }
        },

        methods : {

            publish() {
                this.post = document.getElementById('public').value;

                console.log("data");
                const data = {
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
                    })
                    .catch((err) => {
                    console.log(err);
                    });
            }
        }
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

    #public {
        width: 100%;
        height: 100px;
    }

    .btn-pos {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
    }
</style>