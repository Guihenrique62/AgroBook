<!-- HTML -->
<template>
    <v-card class="rounded-0 ma-2" :color="cor" :elevation="elevacao">
        <v-card-item>
            <v-card-title class="d-flex justify-start">
                {{ titulo }}
            </v-card-title>
            <v-card-subtitle class="d-flex justify-start">
                {{ autor }}
            </v-card-subtitle>
        </v-card-item>

        <v-card-text class="text-start">
            {{ sinopse }}
        </v-card-text>
    </v-card>
</template>

<!-- SCRIPT -->
<script>
// SYSTEM
import { defineComponent, reactive } from 'vue';

export default defineComponent({
    props: {
        cor: String,
        elevacao: Number,
        titulo: String,
        autor: String,
        sinopse: String
    }
});
</script>