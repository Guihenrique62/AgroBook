<!-- HTML -->
<template>
    <v-btn :color="cor" :icon="icone" :loading="carregando" variant="plain"></v-btn>
</template>

<!-- JAVASCRIPT -->
<script>
// SYSTEM
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        carregando: Boolean,
        icone: String,
        cor: String
    }
});
</script>