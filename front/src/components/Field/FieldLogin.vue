<!-- HTML -->
<template>
    <v-text-field :color="cor" :type="tipo" :placeholder="texto" :label="texto" density="compact" elevation="0" hide-details variant="plain" rounded="0" style="border-bottom: solid 2px #02c00270">
    </v-text-field>
</template>

<!-- JAVASCRIPT -->
<script>
// SYSTEM
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        texto: String,
        cor: String,
        carregando: Boolean,
        tipo: String
    }
});
</script>

