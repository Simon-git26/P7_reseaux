<template>
    <div class="mt-5 border border-secondary p-3 rounded">
        <h4 class="mb-3">Crée une publication...</h4>
        
        <textarea class="rounded w-100" id="createPost" v-model="post" type="text" placeholder="Crée votre publication..."></textarea>
        
        <div class="mt-3 d-flex justify-content-between">
            <div class="border-secondary">
                <input type="file" id="image" @change="onFileSelected" />
            </div>
            <button class="btn btn-primary" v-on:click="publish">Publier !</button>
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