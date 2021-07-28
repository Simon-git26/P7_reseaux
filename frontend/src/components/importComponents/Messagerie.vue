<template>
    <transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-dialog-scrollable mx-auto" role="document">
                <div class="modal-content shadow-lg">

                    <div class="modal-header">
                        <h5 class="d-flex justify-content-center">Conversations entre {{ $root.user.firstName }} {{ $root.user.lastName }} et </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" v-on:click="$emit('modalMessage')">&times;</span>
                        </button>
                    </div>

                <div class="modal-body">

                    <div>
                        <ul id="messages"></ul>
                        <!--v-model="message"--><input  type="text" class="style border border-dark rounded" id="envoyer" /> <button class="send rounded btn btn-sm btn-primary">Envoyer</button>
                    </div>

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"  v-on:click="$emit('modalMessage')">Fermer</button>
                </div>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>



<script>

    export default {
        name: 'Messagerie',

        props: {
            users: {
                type: Array,
                required: true
            },
        },
    }

</script>


<style scoped>
    .style {
        width: 90%;
    }

    .send {
        width: 9%;
    }
</style>
