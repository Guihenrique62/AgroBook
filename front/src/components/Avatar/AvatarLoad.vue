<!-- HTML -->
<template>
    <v-skeleton-loader type="ossein" class="rounded-circle" :color="cor" :width="tamanho" :height="tamanho" ></v-skeleton-loader>
</template>

<!-- SCRIPT -->
<script>
// SYSTEM
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        texto: String,
        cor: String,
        tamanho: String
    }
});
</script>