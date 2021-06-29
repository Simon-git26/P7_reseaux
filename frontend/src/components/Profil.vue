<template>
    <div v-if="!!user" class="container-fluid w-100 text-center">
        <p v-if="passwordError">
            <strong>Le mot de passe ne correspond pas.</strong><br />
        </p>
        <div>
            <h3 class="border-bottom border-secondary color" v-if="user">{{ user.firstName }} {{ user.lastName }}</h3>
        </div>

        <div class="border-bottom border-secondary pl-3 pr-3 pt-4 pb-5">
            <div class="row d-flex justify-content-between">
                <div class="col-lg-7 col-sm-6 col-12 border border-secondary rounded">
                    <!-- <img :src="user.imageUrl" class="img-fluid rounded-start" alt="#"> -->
                    <h5>Photo de Profil</h5>
                    <div class="rounded d-flex flex-column border-secondary">
                        <em class="fas fa-user-circle fs-0"></em>
                        <div class="border-top border-secondary d-flex flex-column">
                            <label for="image">Changer ma photo de profil</label>
                            <input type="file" id="image" name="image" /> <!-- @change="onFileSelected" -->
                        </div>
                    </div>
                </div>

                <div class="col-lg-5 col-sm-6 col-12">
                    <h5>Email</h5>
                    <p>{{ user.email }}</p>

                    <div>
                        <h5>Description</h5>
                        <p class="breakword text-break">{{ user.description }}</p>
                    </div>
                    
                    <div class="d-flex flex-column">
                        <label class="border-top border-left border-right border-secondary pt-2 pb-2 mb-0" name="lab" for="changeDescription">Changer ma description</label>
                        <textarea id="changeDescription" v-model="description" type="text" @keyup.enter="changeDescription" placeholder="Entrez votre nouvelle description" name="monTexte"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <div class="border-bottom border-secondary pl-3 pr-3 pt-4 pb-5">
            <div class="row d-flex justify-content-between">
                <div class="col-lg-7 col-sm-6 col-12">
                    <h5>Changer votre Mot de passe</h5>
                    <form class="d-flex flex-column">
                        <div class="d-flex flex-column">
                            <label class="mb-0" for="password">Mot de passe actuel</label>
                            <input v-model="password" type="password" id="password" class="border-secondary border-top-0 border-start-0 border-end-0" @keyup.enter="changePassword" />
                        </div>

                        <div class="d-flex flex-column mt-4">
                            <label class="mb-0" for="passwordconfirm">Nouveau mot de passe</label>
                            <input v-model="newPassword" type="password" id="passwordconfirm" class="border-secondary border-top-0 border-start-0 border-end-0" @keyup.enter="changePassword" />
                        </div>
                    </form>
                </div>

                <div class="col-lg-5 col-sm-6 col-12">
                    <h5>Supprimer mon compte</h5>
                    <button class="btn btn-danger" @click.prevent="deleteUser(user)">Supprimer</button>
                </div>
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
    .color {
        color: #1c599e;
    }

    .fa-user-circle {
        font-size: 150px;
        color: #c74040;
    }

    textarea {
        max-height: 200px;
    }

    label[name=lab] {
        background-color: #8aafff;
    }

    #password, #passwordconfirm {
        height: 20px;
    }
</style>