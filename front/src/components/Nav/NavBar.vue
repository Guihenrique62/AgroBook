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

        let fullName = JSON.parse(sessionStorage.getItem("uui.data"))["nome"];
        let reseteSenhaStatus = JSON.parse(sessionStorage.getItem("uui.data"))["resetar_senha"];
        let cargoUsuarioAtual = JSON.parse(sessionStorage.getItem("uui.data"))["cargo"];

        var reactiveVar = reactive(
            {   
                nome: fullName,
                nomeAbreviado: ((fullName).split(" ")[0]).slice(0,1) + ((fullName).split(" ")[1]).slice(0,1),
                reseteSenha: reseteSenhaStatus,
                cargoUsuario: cargoUsuarioAtual,
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
    components: {
        MenuLeftDefault
    },
    directives: {
        debounce: vue3Debounce({ lock: true })
    }
});
</script>