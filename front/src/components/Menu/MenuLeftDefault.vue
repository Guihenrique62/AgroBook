<!-- HTML -->
<template>
    <v-navigation-drawer color="white">

        <!-- DADOS PESSOAIS -->
        <v-list nav dense>

            <v-responsive class="ma-0 pa-0" width="500">
                <v-avatar color="primary" size="150">
                    <div class="text-h4">{{ reactiveVar.nomeAbreviado }}</div>
                </v-avatar>
                <div class="mt-2 text-h6 text-truncate">{{ reactiveVar.nome }}</div>
            </v-responsive>

        </v-list>

        <!-- LINKS PARA USUARIOS [ ADM ] SEM RESETE DE SENHA -->
        <v-list nav dense v-if="reactiveVar.reseteSenha != 1 && reactiveVar.cargoUsuario == 0">

            <v-list-item to="/" prepend-icon="mdi-home-variant-outline">Tela inicial</v-list-item>
            <v-list-item to="/usuarios" prepend-icon="mdi-account-edit">Cadastros</v-list-item>
            <v-list-item to="/estoque" prepend-icon="mdi-bookshelf">Estoque</v-list-item>
            <v-list-item to="/biblioteca" prepend-icon="mdi-library">Minha Biblioteca</v-list-item>
            <v-list-item to="/pedidos" prepend-icon="mdi-order-bool-descending-variant">Pedidos</v-list-item>

            <v-list-group :value="1" title="item.name" class="d-none">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" :title="1"></v-list-item>
                </template>
                <v-list-item :loading="true" v-for="key, index in 10" :key="index" :value="1" :title="1" :append-icon="1"
                    to="1" @click="1 + 1"></v-list-item>
            </v-list-group>

        </v-list>

        <v-list nav dense v-if="reactiveVar.reseteSenha != 1 && reactiveVar.cargoUsuario == 1">

            <v-list-item to="/" prepend-icon="mdi-home-variant-outline">Tela inicial</v-list-item>
            <v-list-item to="/biblioteca" prepend-icon="mdi-library">Minha Biblioteca</v-list-item>
            <v-list-item to="/pedidos" prepend-icon="mdi-order-bool-descending-variant">Pedidos</v-list-item>

        </v-list>

        <!-- LINKS PARA USUARIOS [ ADM ] COM RESETE DE SENHA -->
        <v-list nav dense v-if="reactiveVar.reseteSenha == 1">
            <v-list-item to="/resetar_senha" prepend-icon="mdi-key">Mudar senha</v-list-item>
        </v-list>

    </v-navigation-drawer>
</template>

<!-- JAVASCRIPT -->
<script>
// SYSTEM
import { defineComponent, reactive } from 'vue';

export default defineComponent({
    data() {

        let fullName = JSON.parse(sessionStorage.getItem("uui.data"))["nome"];
        let reseteSenhaStatus = JSON.parse(sessionStorage.getItem("uui.data"))["resetar_senha"];
        let cargoUsuarioAtual = JSON.parse(sessionStorage.getItem("uui.data"))["cargo"];
        let nomeAbreviadoSlice;
        try {
            nomeAbreviadoSlice = ((fullName).split(" ")[0]).slice(0, 1) + ((fullName).split(" ")[1]).slice(0, 1);
        } catch (errNomeAbreviacao) {
            nomeAbreviadoSlice = ((fullName).split(" ")[0]).slice(0, 1)
        }

        var reactiveVar = reactive(
            {
                nome: fullName,
                nomeAbreviado: nomeAbreviadoSlice,
                reseteSenha: reseteSenhaStatus,
                cargoUsuario: cargoUsuarioAtual
            }
        );

        return {
            reactiveVar
        }

    }
});
</script>