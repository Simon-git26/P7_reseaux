<template>
  <div class="inscription">
    <!-- Integrer mon composant Headers ici -->
    <Header />

  </div>
</template>




<script>

// Importer mon Composant Header
import Header from '@/components/Header.vue'

export default {
  name: 'Inscription',
  components: {
    Header //Preciser que je veux ce composant Header
  }
}
</script>