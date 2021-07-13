<template>
    <div>
        <h3 class="d-flex justify-content-center mb-3">Notre Equipe</h3>
        <div class="col-6 mx-auto breakword text-break mb-4">
            <h4>Modérateur</h4>
            
        </div>
    
        <div class="col-6 mx-auto">
            <h4>Employés</h4>
            <div v-for="user in users" :key="user.id" :user="user" class="d-flex border border-secondary rounded-3 mb-3">
                <div class="col-4" v-if="user.imagePath">
                    <img :src="`http://localhost:3000/${user.imagePath}`" class="img-fluid rounded-circle w-75" alt="#">
                </div>
                <div class="col-8 d-flex align-items-center">
                    <h5>{{ user.firstName }} {{ user.lastName }}</h5>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import axios from '../api'

    export default {

        name: 'Team',

        data() {
            return {
                users: [],
            }
        },

        mounted() {
            this.fetchUsers()
        },

        methods: {
            fetchUsers () {

                axios.get('/users', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    console.log(response);
                    this.users = response.data;
                })
                .catch((err) => {
                console.log(err);
                });
            },
        }
    }
</script>
