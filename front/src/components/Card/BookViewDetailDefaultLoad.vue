<!-- HTML -->
<template>
    <v-card class="rounded-0 ma-2" :color="cor" :elevation="elevacao">
        <v-card-item>
            <v-card-title class="d-flex justify-start">
                <v-skeleton-loader color="transparent" type="list-item" width="150"></v-skeleton-loader>
                <v-skeleton-loader color="transparent" type="list-item" width="100"></v-skeleton-loader>
            </v-card-title>
            <v-card-subtitle class="d-flex justify-start">
                <v-skeleton-loader color="transparent" type="list-item" width="100"></v-skeleton-loader>
                <v-skeleton-loader color="transparent" type="list-item" width="80"></v-skeleton-loader>
            </v-card-subtitle>
        </v-card-item>

        <v-card-text class="d-flex text-start">
            <v-skeleton-loader color="transparent" type="list-item" width="25%"></v-skeleton-loader>
            <v-skeleton-loader color="transparent" type="list-item" width="35%"></v-skeleton-loader>
            <v-skeleton-loader color="transparent" type="list-item" width="40%"></v-skeleton-loader>
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
        elevacao: Number
    }
});
</script>