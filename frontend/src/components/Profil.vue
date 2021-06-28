<template>
    
    <div v-if="!!user" class="width">
        <p v-if="passwordError">
            <strong>Le mot de passe ne correspond pas.</strong><br />
        </p>
        <div>
            <h3 class="font color" v-if="user">{{ user.firstName }} {{ user.lastName }}</h3>
        </div>

        <div class="font flexbox">
            <div>
                <!-- <img :src="user.imageUrl" class="img-fluid rounded-start" alt="#"> -->
                <h5>Photo de Profil</h5>
                <div class="border border-secondary">
                    <em class="fas fa-user-circle"></em>
                    <div class="border-top border-secondary file">
                        <label for="image">Changer ma photo de profil</label>
                        <input type="file" id="image" name="image" /> <!-- @change="onFileSelected" -->
                    </div>
                </div>
            </div>

            <div>
                <h5>Email</h5>
                <p>{{ user.email }}</p>

                <div>
                    <h5>Description</h5>
                    <p class="breakword">{{ user.description }}</p>
                </div>
                
                <div class="column">
                    <label name="lab" for="changeDescription">Changer ma description</label>
                    <textarea id="changeDescription" v-model="description" type="text" @keyup.enter="changeDescription" placeholder="Entrez votre nouvelle description" name="monTexte"></textarea>
                </div>
            </div>
        </div>

        <div class="font flexbox">
            <div>
                <h5>Changer votre Mot de passe</h5>
                <form class="flexform">
                    <div class="flexform">
                        <label name="labpassword" for="password">Mot de passe actuel</label>
                        <input v-model="password" type="password" id="password" @keyup.enter="changePassword" />
                    </div>

                    <div class="flexform mt-4">
                        <label name="labpasswordconfirm" for="passwordconfirm">Nouveau mot de passe</label>
                        <input v-model="newPassword" type="password" id="passwordconfirm" @keyup.enter="changePassword" />
                    </div>
                </form>
            </div>

            <div>
                <h5>Supprimer mon compte</h5>
                <button class="btn btn-danger" @click.prevent="deleteUser(user)">Supprimer</button>
            </div>
        </div>

        <div class="mt-3">
            <h5>Sauvegarder les modifications apportées</h5>
            <button class="btn btn-primary">Sauvegarder</button> <!-- v-on:click="save" -->
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
                password: null,
                newPassword: null,
                description: null,
                passwordError: false,
                /* selectedFile: null,
                imagePath: "", */

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

                const data = {
                    description: this.description,
                };

                axios.put("/users/" + this.user.id, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    window.location.reload();
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })
            },

            changePassword() {
                this.passwordError = false;
                const data = {
                    password: this.password,
                    newPassword: this.newPassword 
                };

                const url = '/users/' + this.user.id + '/change-password';
                axios.put(url, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    console.log(res);
                    alert('Le mot de passe a été mis à jour.');
                })
                .catch((err) => {
                    console.log(err);
                    this.passwordError = true;
                })
            },

            //Supprimer son compte
            deleteUser(user) {

                const valid = window.confirm('Ete vous sur de vouloir supprimer votre compte ?')

                if (!valid) {
                    window.alert('Ok, vous avez fait le bon choix :)');
                } else {
                    const data = {
                    user: this.user
                    }

                    const url = '/users/' + user.id + '/delete';

                    axios.delete(url, data, {
                        headers: {
                        "Content-Type": "application/json",
                        },
                    })

                    .then((response) => {
                        this.$router.push("/Register");
                        console.log(response);
                    })

                    .catch((err) => {
                    console.log(err);
                    });
                } 
            },


            /* onFileSelected(event) {
                this.selectedFile = event.target.files[0];
                console.log('selectedFile', this.selectedFile);
            },

            save() {
                const url = '/users/' + this.user.id + '/picture';

                const file = new FormData();

                file.append('image', this.selectedFile, this.selectedFile.name);

                axios.post(url, file)
                .then((res) => {
                    console.log(res);
                    window.location.reload();

                })
                .catch((err) => {
                    console.log(err);
                });
            },

            //Affichage de l'image
            fetchPicture () {
                axios.get('/picture', {
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
            } */
        },

        /* mounted () {
            this.fetchPicture()
        }, */
    }
</script>


<style scoped>
    .width {
        width: 45rem;
        text-align: center;
    }

    .flexbox {
        display: flex;
        justify-content: space-between;
        padding-right: 15px;
        padding-left: 15px;
        padding-top: 20px;
        padding-bottom: 30px;
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

    .file {
        display: flex;
        flex-direction: column;
    }
</style>