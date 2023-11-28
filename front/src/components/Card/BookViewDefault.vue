<!-- HTML -->
<template>
    <v-card :color="cor" :width="largura" :height="altura" class="rounded-0 ma-2" :image="capa" :elevation="elevacao"></v-card>
</template>

<!-- SCRIPT -->
<script>
// SYSTEM
import { defineComponent, reactive } from 'vue';

export default defineComponent({
    props: {
        cor: String,
        capa: String,
        elevacao: Number,
        largura: Number,
        altura: Number
    }
});
</script>