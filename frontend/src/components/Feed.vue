<template>
    <div>
        <Publish />
        <Publication />
    </div>
</template>





<script>
    import Publish from './Publish'
    import Publication from './Publication'
   
    export default {
        name: 'Feed',

        components: {
            Publish,
            Publication
        }
    }

</script>




<style scoped>
    
</style>