<template>
  <div id="app" class="text-center w-100">
    <Nav />
    <notifications />

    <div class="d-flex justify-content-center flex-column text-left">
      <div class="bg-white-custom border border-dark border-2 rounded-3 mt-5 pt-5 pb-5 pl-3 pr-3 mx-auto container-lg">
        <router-view />
      </div>
    </div>

  </div>
</template>




<script>
import Nav from './components/importComponents/Nav.vue';


export default {
  name: "App",

  components: {
    Nav,
  },
}
</script>


<style>
  @import url(../style.css);
</style>