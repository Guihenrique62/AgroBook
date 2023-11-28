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
        <v-navigation-drawer v-model="reactiveVar.drawer" absolute temporary>
            <!-- DADOS PESSOAIS -->
            <v-list nav dense>

                <v-responsive class="ma-0 mt-6 pa-0" width="500">
                    <v-avatar color="primary" size="150"><div class="text-h4">JC</div></v-avatar>
                    <div class="mt-2 text-h6 text-truncate">JEAN CLEIDSON PEREIRA RODRIGUES</div>
                </v-responsive>

            </v-list>

            <!-- LINKS -->
            <v-list nav dense>
                
                <v-list-item to="/" prepend-icon="mdi-home-variant-outline">Tela inicial</v-list-item>
                <v-list-item to="/usuarios" prepend-icon="mdi-account-edit">Cadastros</v-list-item>
                <v-list-item to="/estoque" prepend-icon="mdi-bookshelf">Estoque</v-list-item>
                <v-list-item to="/biblioteca" prepend-icon="mdi-library">Minha Biblioteca</v-list-item>
                <v-list-item to="/pedidos" prepend-icon="mdi-order-bool-descending-variant">Pedidos</v-list-item>

                <v-list-group :value="1" title="item.name" class="d-none">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" :title="1"></v-list-item>
                    </template>
                    <v-list-item :loading="true" v-for="key, index in 10" :key="index" :value="1" :title="1" :append-icon="1" to="1" @click="1+1"></v-list-item>
                </v-list-group>

            </v-list>
        </v-navigation-drawer>

    </v-layout>
</template>

<!-- JAVASCRIPT -->
<script>
// SYSTEM
import { defineComponent, reactive } from 'vue';
import { vue3Debounce } from 'vue-debounce'

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
            console.log("asd")
            reactiveVar.filterBuscarLivroLoad = true;
        }

        return {
            reactiveVar,
            btnBuscarLivro
        }

    },
    directives: {
        debounce: vue3Debounce({ lock: true })
    }
});
</script>