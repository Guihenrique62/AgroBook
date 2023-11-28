<!-- HTML -->
<template>
    <v-container class="rounded text-center" style="border: 1px solid #656565;">
        <v-row dense="compact">
            <v-col cols="12">
                {{ reactiveVar.descupinhaDaVez }}
            </v-col>
            <v-col cols="12">
                <BtnIcon icone="mdi-refresh" @click="reiniciarSolicitacao()"/>
            </v-col>
        </v-row>
        
    </v-container>
</template>

<!-- SCRIPT -->
<script>
// SYSTEM
import { defineComponent, reactive } from 'vue';

import BtnIcon from '@/components/Button/BtnIcon.vue';

export default defineComponent({
    data() {

        var reactiveVar = reactive({
            listaDeDescupinha: [
                "Ocorreu um erro na comunicação",
                "Verifique sua conexão e tente novamente",
                "Servidor inacessível no momento",
                "Faha na comunicação, tente novamente em instantes",
                "Limite de requisição, tente novamente em instantes",
                "Erro ao receber pacotes do servidor, tente novamente",
                "Estamos trabalhando para solucionar o problema, tente reiniciar a conexão"
            ],
            descupinhaDaVez: ""
        });

        const selecionarUmaDescupinha = async () => {
            let randomIndex = Math.floor(Math.random() * reactiveVar.listaDeDescupinha.length);
            reactiveVar.descupinhaDaVez = reactiveVar.listaDeDescupinha[randomIndex];
        }

        selecionarUmaDescupinha();

        return {
            reactiveVar
        }
    },
    components: {
        BtnIcon
    },
    methods: {
        reiniciarSolicitacao: function (row) {
            this.$emit('reiniciarSolicitacao', row);
        }
    }
});
</script>

<!-- STYLE -->
<style scoped>
.v-table {
    background: rgb(var(--v-theme-white))
}
tr {
    transition: 0.3s ease-in-out;
}
tr:hover {
    background: #0000000f;
}
</style>