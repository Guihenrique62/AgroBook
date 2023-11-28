<!-- HTML -->
<template>
    <v-avatar :color="cor" :size="tamanho">
        <div class="text-h4">{{ texto }}</div>
    </v-avatar>
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