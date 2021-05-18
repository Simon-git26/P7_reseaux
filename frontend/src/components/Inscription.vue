<template>
    <form @submit="handleSubmit">
        <h3>Inscription</h3>

        <div class="form-group">
            <label>Votre Nom</label>
            <input type="text" class="form-control" v-model="nom" placeholder="Votre nom" />
        </div>

        <div class="form-group">
            <label>Votre Prenom</label>
            <input type="text" class="form-control" v-model="prenom" placeholder="Votre Prenom" />
        </div>

        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="email" placeholder="Email" />
        </div>

        <div class="form-group">
            <label>Mot de Passe</label>
            <input type="password" class="form-control" v-model="mot_de_passe" placeholder="Mot de passe" />
        </div>

        <div class="form-group">
            <label>Confirmez le Mot de Passe</label>
            <input type="password" class="form-control" v-model="mot_de_passe_confirmation" placeholder="Confirmez le Mot de passe" />
        </div>

        <button class="btn btn-primary btn-block">Inscription !</button>
    </form>
</template>




<script>

    export default {
        name: 'Inscription',

        data() {
            return {
                nom: "",
                prenom: "",
                email: "",
                mot_de_passe: "",
                mot_de_passe_confirmation: ""
            }
        },

        methods: {
            handleSubmit(e) {
                e.preventDefault()

                const data = {
                    nom: this.nom,
                    prenom: this.prenom,
                    email: this.email,
                    mot_de_passe: this.mot_de_passe,
                    mot_de_passe_confirmation: this.mot_de_passe_confirmation,
                };

                console.log(data);
            }
        }
    }

</script>
