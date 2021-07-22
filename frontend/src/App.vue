<template>
  <div id="app" class="text-center w-100">
    <Nav />
    <notifications />

    <div class="d-flex justify-content-center flex-column text-left">
      <div class="mt-5 pt-3 pb-4 mx-auto container-lg">
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