<!-- HTML -->
<template>
    <v-layout app>

        <!-- NAV BAR -->
        <v-card rounded="0" width="100%" fixed>

            <v-toolbar color="transparent">

                <!-- MENU SANDUICHE -->
                <v-app-bar-nav-icon @click="reactiveVar.drawer = true" class="d-flex" title="Mostrar menu lateral">
                </v-app-bar-nav-icon>

                <!-- FILTRO -->
                <v-toolbar-title title="Digite o nome do livro" class="d-flex justify-center">
                    <v-responsive class="ma-0 pa-0" width="500">
                        <v-text-field v-model="reactiveVar.filterBuscarLivro" :loading="reactiveVar.filterBuscarLivroLoad" bg-color="white" class="ma-0 shrink" elevation="0" append-inner-icon="mdi-magnify" @click:append-inner="btnBuscarLivro()" v-debounce:600ms="btnBuscarLivro" density="compact" clearable label="Buscar livro..." variant="solo" hide-details></v-text-field>
                    </v-responsive>
                </v-toolbar-title>
                
                <!-- LOGO -->
                <v-card elevation="0" rounded="0" class="d-flex">
                    <v-toolbar color="transparent" >
                        <v-toolbar-title title="Agrobook - Alugue seu livro" class="mr-5">
                            <v-img :width="100" :heigth="100" src="@/assets/png/small-logo.png" alt=""></v-img>
                        </v-toolbar-title>
                    </v-toolbar>
                </v-card>
                

            </v-toolbar>

        </v-card>

        <!-- LATERAL MENU -->
        <MenuLeftDefault v-model="reactiveVar.drawer"/>

    </v-layout>
</template>

<!-- JAVASCRIPT -->
<script>
// SYSTEM
import { defineComponent, reactive } from 'vue';
import { vue3Debounce } from 'vue-debounce'

// COMPONENTS
import MenuLeftDefault from '@/components/Menu/MenuLeftDefault.vue';

export default defineComponent({
    data() {

        // AXIOS - PARA REQUISIÇÃO DE API
        const axios = require('axios');
        axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + ":57601";

        var reactiveVar = reactive(
            {
                filterBuscarLivro: "",
                filterBuscarLivroLoad: false,
                btnIndexLoad: null,
                indexPath: this.$route.fullPath,
                loadMenuBar: false,
                drawer: false,
                tab: null,
                itemsMenuBar: [],
                dataAgecob: [],
                forceReload: false
            }
        );

        const btnBuscarLivro = async () => {
            reactiveVar.filterBuscarLivroLoad = true;
            console.log("asd")
            reactiveVar.filterBuscarLivroLoad = false;
        }

        return {
            reactiveVar,
            btnBuscarLivro
        }

    },
    components: {
        MenuLeftDefault
    },
    directives: {
        debounce: vue3Debounce({ lock: true })
    }
});
</script>