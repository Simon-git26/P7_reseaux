<template>
    <div class="width">
        <div>
            <h3 class="font color" v-if="user">{{ user.firstName }} {{ user.lastName }}</h3>
        </div>

        <div class="font flexbox">
            <div>
                <h5>Photo de Profil</h5>
                <div class="border border-secondary">
                    <i class="fas fa-user-circle"></i>
                    <div class="border-top border-secondary">
                        <label for="image">Changer ma photo de profil</label>
                        <input type="file" id="image" name="image" />
                    </div>
                </div>
            </div>

            <div>
                <h5>Email</h5>
                <p>{{ user.email }}</p>

                <div>
                    <h5>Description</h5>
                    <p class="breakword">{{ description }}</p>
                </div>
                
                <div class="column">
                    <label name="lab" for="changeDescription">Changer ma description</label>
                    <textarea id="changeDescription" type="text" @keyup.enter="changeDescription" placeholder="Entrez votre nouvelle description" name="monTexte"></textarea>
                </div>
            </div>
        </div>

        <div class="font flexbox">
            <div>
                <h5>Changer votre Mot de passe</h5>
                <form class="flexform">
                    <div class="flexform">
                        <label name="labpassword" for="password">Mot de passe actuel</label>
                        <input type="password" id="password" />
                    </div>

                    <div class="flexform mt-4">
                        <label name="labpasswordconfirm" for="passwordconfirm">Nouveau mot de passe</label>
                        <input type="password" id="passwordconfirm" />
                    </div>
                </form>
            </div>

            <div>
                <h5>Supprimer mon compte</h5>
                <button class="btn btn-primary">Supprimer</button>
            </div>
        </div>

        <div>
            <button class="btn btn-primary">Sauvegarder</button>
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
                this.description = document.getElementById('changeDescription').value;

                const data = {
                    description: this.description
                };

                axios.put("/users/" + this.user.id, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })
            },
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
        padding-right: 15px;
        padding-left: 15px;
        padding-top: 15px;
        padding-bottom: 25px;
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
        border-radius: 2px;
    }

    .fa-user-circle {
        font-size: 150px;
        color: #c74040;
    }

    .column {
        display: flex;
        flex-direction: column;
        border: 1px black solid;
        border-radius: 2px;
    }

    textarea {
        max-height: 200px;
        border-bottom: none;
        border-right: none;
        border-left: none;
    }

    .breakword {
        max-width: 183px;
        word-wrap:break-word;
    }

    label[name=lab] {
        padding-top: 5px;
        padding-bottom: 5px;
        margin-bottom: 0px;
        background-color: #8aafff;
    }

    .flexform {
        display: flex;
        flex-direction: column;
    }

    #password, #passwordconfirm {
        border-top: none;
        border-right: none;
        border-left: none;
        border-color: #162d47;
        height: 22px;
    }

    label[name=labpassword], label[name=labpasswordconfirm] {
        margin-bottom: 0;
    }

</style>