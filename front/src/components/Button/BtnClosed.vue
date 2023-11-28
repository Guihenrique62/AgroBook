<!-- HTML -->
<template>
    <v-btn :color="cor" icon="mdi-close" :loading="carregando" variant="plain">
    </v-btn>
</template>

<!-- JAVASCRIPT -->
<script>
// SYSTEM
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        carregando: Boolean
    }
});
</script>