<!-- HTML -->
<template>
    <v-btn :color="cor" :loading="carregando">
      {{ texto }}
    </v-btn>
</template>

<!-- JAVASCRIPT -->
<script>
// SYSTEM
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        texto: String,
        cor: String,
        carregando: Boolean
    }
});
</script>