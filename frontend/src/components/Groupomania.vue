<template>
  <div>
    <h3>Groupomania</h3>
  </div>
</template>




<script>
import axios from "../api";

export default {
  name: "Groupomania",

  async created() {
    const res = await axios.get("User", {
      headers: {
        Authorization: "Bearer" + localStorage.getItem("token"),
      },
    });

    console.log(res);
  },
};
</script>





<style scoped>
</style>
