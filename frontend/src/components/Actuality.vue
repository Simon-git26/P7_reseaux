<template>
    <div class="actuality">
        <h3>Fil d'Actualitée</h3>
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

        mounted() {
            
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