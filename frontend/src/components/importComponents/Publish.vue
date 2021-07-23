<template>
    <div class="mt-5">
        <div class="card text-center border border-secondary">
            <div class="card-body pt-4">
                <textarea class="rounded w-100" id="createPost" v-model="post" type="text" placeholder="Créer votre publication..."></textarea>
            </div>

            <div class="card-footer text-muted">
                 <div class="mt-3 col-12">
                    <div class="row">
                        <div class="border-secondary col-12 col-md-8">
                            <input class="form-control" type="file" id="image" @change="onFileSelected">
                        </div>
                        <button class="col-12 col-md-4 btn btn-primary" v-on:click="publish">Publier !</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
    import axios from '../../api';

    export default {
        name: 'Publish',

        data() {
            return {
                post: "",
                selectedFile: null,
                imagePath: "",
                user: null,
            }
        },

        methods : {

            onFileSelected(event) {
                this.selectedFile = event.target.files[0];
                console.log('selectedFile', this.selectedFile);
            },


            publish() {
                const url = '/users/' + this.$root.user.id + '/publication';
                const fd = new FormData();

                if (this.selectedFile) {
                    fd.append('image', this.selectedFile, this.selectedFile.name);
                }

                if (!this.post && !this.selectedFile) {
                    return 
                }

                fd.append('post', this.post);

                axios.post(url, fd)
                .then((res) => {
                    
                    this.$notify({
                        title: 'Notifications',
                        text: ' Publication réalisée !'
                    })
                    
                    // Affichage de mes posts dynamique grace à l'appelle au parent (Feed) de la fonction fetchPosts()
                    this.$parent.fetchPosts()
                    this.post = ""
                    
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        },
    }

</script>


<style scoped>
    #createPost {
        height: 100px;
    }
</style>