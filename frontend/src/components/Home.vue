<template>
    <div>
        <div class="popup">
            <p v-if="user">Bienvenu {{ user.firstName }} {{ user.lastName }}</p>
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
            const connected = localStorage.getItem('token');
            if (!connected) {
                this.$router.push('/login');
            }

            console.log(localStorage.getItem('token'));
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

    .log {
    display: flex;
    justify-content: space-around;
    }

    .popup {
        background-color: lightblue;
        display: flex;
        justify-content: center;
        border: 1px blue solid;
    }

    .popup p {
        margin-top: 20px;
    }
</style>