<template>
    <form>
        <h3>Connection</h3>

        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" placeholder="Email" />
        </div>

        <div class="form-group">
            <label>Mot de Passe</label>
            <input type="password" class="form-control" placeholder="Mot de passe" />
        </div>

        <button class="btn btn-primary btn-block">Connection</button>

        <p>Vous n'avez pas de compte ?<a href="Register">Inscrivez vous !</a></p>
    </form>
</template>



<script>
    export default {
        name: 'Login'
    }
</script>


<style scoped>
button {
    margin-bottom: 20px;
}
</style>