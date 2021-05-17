<template>
    <div class="container">
        <div class="row">
            <h1>Mon headers</h1>
            <p>Je suis bien sur le {{ header }}</p>
        </div>
    </div>
</template>



<script>
    export default {
        name: "Header",
        data() {
            return {
                header: 'super header'
            }
        }
    }
</script>




<style scoped>
    h1 {
        background-color: green;
    }
</style>
