<template>
    <div v-if="!!$root.user" class="card shadow-lg container-fluid pt-2 pb-2 w-100">
        <p v-if="passwordError">
            <strong>Le mot de passe ne correspond pas.</strong><br />
        </p>
        <div>
            <h3 class="border-bottom border-secondary color" v-if="$root.user">{{ $root.user.firstName }} {{ $root.user.lastName }}<span class="ml-1" v-if="$root.user.isAdmin == true"><em class="fs-5 fas fa-star"></em></span></h3>
        </div>

        <div class="card-body text-center border-bottom border-secondary pl-3 pr-3 pt-4 pb-4">
            <div class="row">
                <div class="col-lg-5 col-md-5 col-sm-12 border border-secondary rounded">
                    <h5 class="card-title">Photo de Profil</h5>
                    <div class="col-md-12 d-flex" v-if="$root.user.imagePath">
                        <img :src="`http://localhost:3000/${$root.user.imagePath}`" class="img-fluid rounded-circle mx-auto" alt="#">
                    </div>
                    <div v-if="!$root.user.imagePath">
                        <em class="fas fa-user-circle fs-0"></em>
                    </div>
                    
                    <div class=" border-secondary d-flex flex-column">
                        <label for="image">Changer ma photo de profil</label>
                        <input class="form-control" type="file" id="image" name="image" @change="onFileSelected" />
                    </div>

                    <div class="mt-3" v-if="selectedFile">
                        <h5>Sauvegarder les modifications apportées</h5>
                        <button class="btn btn-primary" v-on:click="savePicture">Sauvegarder</button>
                    </div>
                </div>


                <div class="col-lg-7 col-md-7 col-sm-12">
                    <h5>Email</h5>
                    <p>{{ $root.user.email }}</p>

                    <div>
                        <h5>Description</h5>
                        <p class="breakword text-break">{{ $root.user.description }}</p>
                    </div>

                    <button class="btn btn-primary btn-sm mt-2 col-md-5 mx-auto" @click.prevent="showChangeDescription = true, description = $root.user.description">
                        Changer ma description
                    </button>
                    
                    <div class="d-flex flex-column mt-3" v-if="showChangeDescription">
                        <textarea id="changeDescription" v-model="description" type="text" placeholder="Entrez votre nouvelle description..." name="monTexte"></textarea>
                    </div>

                    <div class="mt-3" v-if="description && description != $root.user.description">
                        <h5>Sauvegarder la nouvelle description</h5>
                        <button class="btn btn-primary" v-on:click="saveChangeDescription">Sauvegarder</button>
                    </div>
                    
                </div>
            </div>
        </div>

        <div class="pl-3 pr-3 pt-4 pb-2 border-bottom border-secondary text-center">
            <div class="row d-flex justify-content-between mb-4">
                <div class="col-lg-6 col-md-5 col-sm-12">
                    <h5>Changer votre Mot de passe</h5>
                    <form class="d-flex flex-column">
                        <div class="d-flex flex-column">
                            <label class="mb-0" for="password">Mot de passe actuel</label>
                            <input v-model="password" type="password" id="password" class="border-secondary border-top-0 border-start-0 border-end-0" />
                        </div>

                        <div class="d-flex flex-column mt-4">
                            <label class="mb-0" for="passwordconfirm">Nouveau mot de passe</label>
                            <input v-model="newPassword" type="password" id="passwordconfirm" class="border-secondary border-top-0 border-start-0 border-end-0" />
                        </div>
                    </form>

                    <div class="mt-3" v-if="newPassword">
                        <h5>Sauvegarder les modifications apportées</h5>
                        <button class="btn btn-primary" v-on:click="saveChangePassword">Sauvegarder</button>
                    </div>
                </div>

                <div class="col-lg-6 col-md-7 col-sm-12">
                    <h5>Supprimer mon compte</h5>
                    <button class="btn btn-danger" @click.prevent="deleteUser(user)">Supprimer</button>
                </div>
            </div>
        </div>
        <div class="mt-5">
            <button class="d-flex justify-content-center btn btn-primary btn-sm col-md-5 mb-3 mx-auto" @click.prevent="showPublications = true">
                Voir mes Publications
            </button>

            <div v-if="showPublications">
                <Publication v-for="post in posts" :key="post.id" :post="post" showBtn = false />
            </div>
        </div>
    </div>
</template>



<script>
    import axios from '../api'
    import Bus from '../bus'
    import Publication from './importComponents/Publication.vue'
    

    export default {
        name: 'Profil',

        components: {
            Publication
        },

        data() {
            return {
                user: null,
                password: null,
                newPassword: null,
                description: null,
                passwordError: false,
                selectedFile: null,
                imagePath: "",
                showChangeDescription: false,
                posts: [],
                showPublications: false,
                showBtn: false
            }
        },


        methods: {

            onFileSelected(event) {
                this.selectedFile = event.target.files[0];
                console.log('selectedFile', this.selectedFile);
            },

            saveChangeDescription() {

                const data = {
                    description: this.description,
                };

                axios.put("/users/" + this.$root.user.id, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {

                    this.description = ""
                    window.location.reload()

                    this.$notify({
                        title: 'Notifications',
                        text: 'Description Changée !'
                    })
                    
                })
                .catch((err) => {
                    console.log(err);
                })
            },

            saveChangePassword() {
                this.passwordError = false;
                const data = {
                    password: this.password,
                    newPassword: this.newPassword 
                };

                const url = '/users/' + this.$root.user.id + '/change-password';
                axios.put(url, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    this.password = ""
                    this.newPassword = ""
                    
                    this.$notify({
                        title: 'Notifications',
                        text: 'Mot de Passe Changé !'
                    })
                })
                .catch((err) => {
                    console.log(err);
                    this.passwordError = true;
                })
            },

            //Supprimer son compte + posts associés
            deleteUser(user) {

                const valid = window.confirm('Ete vous sur de vouloir supprimer votre compte ?')

                if (!valid) {
                    window.alert('Ok, vous avez fait le bon choix :)');
                } else {
                    const data = {
                    user: this.user
                    }

                    const url = '/users/' + this.$root.user.id + '/delete';

                    axios.delete(url, data, {
                        headers: {
                        "Content-Type": "application/json",
                        },
                    })

                    .then((response) => {
                        Bus.$emit('disconnected')
                    })

                    .catch((err) => {
                    console.log(err);
                    });
                } 
            },


            savePicture() {
                const url = '/users/' + this.$root.user.id + '/picture';

                const file = new FormData();

                file.append('image', this.selectedFile, this.selectedFile.name);

                axios.post(url, file)
                .then((res) => {
                    console.log(res);
                    this.$notify({
                        title: 'Notifications',
                        text: 'Image de Profil Sauvegardée !'
                    })
                    window.location.reload();

                })
                .catch((err) => {
                    console.log(err);
                });
            },

            //recuperer tous mes posts du user connecté
            fetchPosts () {
                axios.get('/user/' + this.$root.user.id + '/publications', {
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
        },

        mounted() {
            Bus.$on('connected', () => this.fetchPosts());
        }
    }
</script>


<style scoped>
    .img-fluid {
        max-width: 75%;
    }

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