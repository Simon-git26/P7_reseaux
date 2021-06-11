<template>
    <div class="actuality">
        <h3>Fil d'Actualitée</h3>

        <div class="poststructure">
            <!--<p v-for="{UserId} in posts" :key="UserId">
                {{ UserId }}
            </p>-->

            <p v-for="{post} in posts" :key="post">
                {{ post }}
            </p>
        </div>
    </div>
</template>





<script>
    import axios from '../api'

    export default {
        name: 'Actuality',

        data() {
            return {
                posts : [],
            }
        },

        methods: {
            onMounted() {
            const url = '/actuality';
            axios.get(url, {
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

    .poststructure {
        height: 150px;
        border: 1px black solid;
    }
</style>