<template>
    <div>
        <div class="popup" v-if="isDisplay">
            <p v-if="user">Bienvenue {{ user.firstName }} {{ user.lastName }}</p>
            <button v-on:click="show" type="button" class="btn btn-style"><i class="far fa-times-circle"></i></button>
        </div>
    </div>
</template>



<script>
    import axios from '../api'

    export default {
        name: 'Home',

        data() {
            return {
                user: null,

                isDisplay: true
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
            show: function () {
                this.isDisplay = false;
            },
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
        background-color: #c2d8ff;
        display: flex;
        justify-content: space-around;
        border: 1px #6f84a8 solid;
        align-items: center;
        border-radius: 5px;
    }

    .popup p {
        margin-top: 20px;
    }

    .btn-style {
        height: 42px;
        width: 45px;
    }

    .fa-times-circle {
        color: black;
        font-size: 30px;
        display: flex;
        justify-content: center;
        align-content: center;
    }
</style>