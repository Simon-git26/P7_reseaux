<template>
    <div>
        <div class="popup" v-if="isDisplay">
            <p v-if="user">Bienvenue {{ user.firstName }} {{ user.lastName }}</p>
            <button v-on:click="show" type="button" class="btn btn-style"><i class="far fa-times-circle"></i></button>
        </div>

        <div class="publication">
            <h4>Crée une publication...</h4>

            <textarea id="public" type="text" placeholder="Crée votre publication"></textarea>

            <div class="btn-pos">
                <button class="btn btn-primary">Choisir une image</button>
                <button class="btn btn-primary" v-on:click="publish">Publier !</button>
            </div>
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

                isDisplay: true,

                post: ""
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
        justify-content: space-between;
        border: 1px #6f84a8 solid;
        align-items: center;
        border-radius: 5px;
        padding-left: 15px;
        padding-right: 15px;
    }

    .popup p {
        margin-top: 20px;
        font-size: 20px;
    }

    .fa-times-circle {
        color: black;
        font-size: 40px;
        display: flex;
        justify-content: center;
        align-content: center;
    }

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