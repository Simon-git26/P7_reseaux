<template>
    <div class="publication">
        <h4>Crée une publication...</h4>
        
        <textarea id="createPost" v-model="post" type="text" placeholder="Crée votre publication"></textarea>
        
        <div class="btn-pos">
            <div class="border-secondary">
                <input type="file" id="image" @change="onFileSelected" />
                <button @click="onUpload">Joindre l'image</button>
            </div>
            <button class="btn btn-primary" v-on:click="publish">Publier !</button>
        </div>
    </div>
</template>



<script>
    import axios from '../api'

    export default {
        name: 'Publish',

        data() {
            return {
                post: "",
                selectedFile: null,
                imageUrl: "",
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

            publish() {
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
                    window.location.reload();

                    })
                    .catch((err) => {
                    console.log(err);
                    });
            },

            onFileSelected(event) {
                this.selectedFile = event.target.files[0];
                console.log(this.selectedFile);
            },

            onUpload() {
                const url = '/users/' + this.user.id + '/publication';

                const data = {
                    imageUrl: this.imageUrl
                }

                const fd = new FormData();

                fd.append('image', this.selectedFile, this.selectedFile.name)
                axios.post(url, data, fd)
                .then(res => {
                    console.log(res);
                    console.log(this.selectedFile);
                })
            }
        },
    }

</script>


<style scoped>
    .publication {
        margin-top: 40px;
        border: 1px gray solid;
        padding: 15px;
        border-radius: 8px;
    }

    .publication h4 {
        margin-bottom: 20px;
    }

    #createPost {
        width: 100%;
        height: 100px;
    }

    .btn-pos {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
    }
</style>