<!-- HTML -->
<template>
    <v-btn variant="text" :style="'border-bottom: 2px solid ' + cor + ' !important;'" rounded="0" :loading="carregando">
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