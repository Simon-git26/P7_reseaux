<template>
    <div class="container">
        <div class="popup d-flex justify-content-between rounded align-items-center pl-3 pr-3" v-if="isDisplay">
            <p class="mt-3 fs-5" v-if="$root.user">Bienvenue {{ $root.user.firstName }} {{ $root.user.lastName }}</p>
            <button v-on:click="show" type="button" class="btn"><em class="text-dark fs-1 d-flex justify-content-center align-content-center far fa-times-circle"></em></button>
        </div>

        <Feed />
    </div>
</template>



<script>
    import Feed from './Feed.vue'

    export default {
        name: 'Home',

        components: {
            Feed
        },

        data() {
            return {
                user: null,
                isDisplay: true,
            }
        },
        
        methods : {
            show: function () {
                this.isDisplay = false;
            },
        }
    }

</script>



<style scoped>
    .popup {
        background-color: #c2d8ff;
        border: 1px #6f84a8 solid;
    }
</style>