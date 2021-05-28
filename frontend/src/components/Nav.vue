<template>

    <nav class="navbar navbar-expand navbar-light fixed-top">
      <div class="container">
        <a href="/" class="navbar-brand">Accueil</a>
        <div class="img">
          <img src="@/assets/iconegroupo.png"/>
        </div>
        
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a href="Login" class="nav-link color">Connection</a>
            </li>
            <li class="nav-item">
              <a href="Register" class="nav-link color">Inscription</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>




<script>
  export default {
    name: 'Nav',
  }
</script>


<style scoped>
  .color {
    color: black !important;
  }

  .color:hover {
    color: #545454 !important;
    text-decoration: underline;
    font-size: 17px;
  }

  .img {
    margin-left: 30px;
  }

</style>