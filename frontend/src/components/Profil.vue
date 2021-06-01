<template>
    <div class="width">
        <div>
            <h3 class="font color" v-if="user">{{ user.firstName }} {{ user.lastName }}</h3>
        </div>

        <div class="font flexbox">
            <div>
                <h5>Photo de Profil</h5>
                <div class="border">
                    <i class="fas fa-user-circle"></i>
                    <p>Changer ma photo de profil</p>
                </div>
            </div>

            <div>
                <h5>Email</h5>
                <p>{{ user.email }}</p>

                <h5>Description</h5>
                <p>{{ description }}</p>
                <div class="column">
                    <label for="changeDescription">Changer ma description</label>
                    <input id="changeDescription" type="text" @keyup.enter="changeDescription" />
                </div>
            </div>
        </div>
    </div>
</template>



<script>
    import axios from '../api'

    export default {
        name: 'Profil',

        data() {
            return {
                user: null,

                description: 'Pas de description'
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
            changeDescription() {
                this.description = document.getElementById('changeDescription').value
            }
        }
    }
</script>


<style scoped>

    .width {
        width: 45rem;
        text-align: center;
    }

    .flexbox {
        display: flex;
        justify-content: space-around;
        padding: 15px;
    }

    .color {
        color: #1c599e;
    }

    .font {
        border-bottom: 2px grey solid;
    }

    .border {
        display: flex;
        flex-direction: column;
    }

    .fa-user-circle {
        font-size: 150px;
    }

    .column {
        display: flex;
        flex-direction: column;
    }

</style>