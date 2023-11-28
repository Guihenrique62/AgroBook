<!-- HTML -->
<template>
    <v-skeleton-loader type="ossein" :color="cor" :width="largura" :height="altura" class="rounded-0 ma-2" :elevation="elevacao"></v-skeleton-loader>
</template>

<!-- SCRIPT -->
<script>
// SYSTEM
import { defineComponent, reactive } from 'vue';

export default defineComponent({
    props: {
        cor: String,
        elevacao: Number,
        largura: Number,
        altura: Number
    }
});
</script>