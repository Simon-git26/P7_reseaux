<template>
    <div>
        <h3>Bienvenu sur Groupomania !</h3>
        <p>Veuillez vous inscrire ou vous connecter</p>
        <div class="log">
            <a href="Login">Connection</a>
            <a href="Register">Inscription</a>
        </div>
    </div>
</template>



<script>

    export default {
        name: 'Home'
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
</style>


<style scoped>
.log {
    display: flex;
    justify-content: space-around;
}
</style>
