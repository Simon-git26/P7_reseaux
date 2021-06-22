<template>
    <div class="actuality">
        <h3>Fil d'Actualitée</h3>

        <div class="publication" v-for="{post, imageUrl} in posts" :key="post">
            <img class="resize" :src="imageUrl" />
            {{ post }}
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
            }
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
        },
        

        mounted() {
            this.onMounted();
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
        height: 100px;
        width: 100%;
        border: 1px black solid;
        margin-bottom: 20px;
    }

    .resize {
        height: 98px;
        width: 150px;
    }
</style>
