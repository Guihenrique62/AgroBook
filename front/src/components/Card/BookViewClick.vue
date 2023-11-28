<!-- HTML -->
<template>
    <v-card width="200" heigth="150" color="white" style="cursor: pointer !important;" elevated="16">
        
        <v-card v-if="capa" height="250" class="rounded-0 ma-2" :image="capa"></v-card>
        <div class="text-subtitle-1 ma-2">{{ titulo }}</div>

    </v-card>
</template>

<!-- JAVASCRIPT -->
<script>
// SYSTEM
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        capa: String,
        titulo: String
    }
});
</script>