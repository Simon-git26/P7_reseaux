<template>
  <div id="app" class="text-center w-100">
    <Nav />
    <notifications group="foo" />

    <div class="d-flex justify-content-center flex-column text-left">
      <div class="bg-white rounded-3 w-50 mt-5 pt-5 pb-5 pl-3 pr-3 mx-auto">
        <router-view />
      </div>
    </div>

  </div>
</template>




<script>
import Nav from './components/Nav.vue'


export default {
  name: "App",

  components: {
    Nav,
  },

  data() {
    return {
      user: null,
    }
  },
}
</script>


<style>
  @import url(../style.css);
</style>