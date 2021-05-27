<template>
    <div>
        <h3 v-if="user">Bienvenu sur Groupomania {{ user.firstName }} {{ user.lastName }}</h3>
        <p v-if="!user">Veuillez vous inscrire ou vous connecter</p>
        <div class="log">
            <a href="Login">Connection</a>
            <a href="Register">Inscription</a>
        </div>
    </div>
</template>



<script>
    import axios from '../api'

    export default {
        name: 'Home',

        data() {
            return {
                user: null
            }
        },
        
        async created() {
            const res = await axios.get('user');

            this.user = res.data;
        }
    }

</script>



<style scoped>
    h3 {
        font-size: 1.65rem;
    }

    p {
        text-align: center;
        margin: 0;
        line-height: 1;
        padding-bottom: 20px;
    }
</style>


<style scoped>
.log {
    display: flex;
    justify-content: space-around;
}
</style>
