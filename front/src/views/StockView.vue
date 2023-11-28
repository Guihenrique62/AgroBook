<!-- HTML -->
<template>
    <v-container>

        <!-- HEADER -->
        <v-row no-gutters>

            <!-- TABS -->
            <v-col :cols="header[0]" class="text-start mb-2">
                <ButtonConfirm
                    v-if="reactiveVar.containerCriarLivro == false" texto="Criar livro"
                    cor="success" class="mr-2" @click="btnCriarLivro()" >
                </ButtonConfirm>
            </v-col>

            <!-- FILTRO -->
            <v-col :cols="header[1]" class="d-flex align-center text-end">
                <p v-if="reactiveVar.containerCriarLivro == false" class="font-weight-medium mr-2"> ({{ (reactiveVar.listaLivrosEstoque).length }}) Registros </p>
                <FieldDefault 
                    v-if="reactiveVar.containerCriarLivro == false"
                    v-model="reactiveVar.search" prependIcon="mdi-magnify"
                    :carregar="false" texto="Buscar livro..." cor="white" >
                </FieldDefault>
            </v-col>

        </v-row>

        <!-- CAIXA COM LIVROS -->
        <v-row no-gutters class="mt-2">

            <!-- LISTA DE LIVROS -->
            <v-col cols="12" class="text-start" v-if="reactiveVar.cardAtivo == 'livros'">
                <TableDefault :itemsPorPagina="reactiveVar.itemsPerPage" :tamanhoItems="reactiveVar.totalItems"
                    :cabecalho="reactiveVar.headersEstoque" :items="reactiveVar.listaLivrosEstoque"
                    :search="reactiveVar.search" :carregando="reactiveVar.loading" @rowClickTable="rowClicked">
                </TableDefault>
            </v-col>

            <!-- CONTAINER CRIAR LIVRO -->
            <v-col cols="12" class="text-start" v-if="reactiveVar.cardAtivo == 'criar_livro'">
                <ContainerStockData @rowClickTableClose="closeCadastrarLivro">
                </ContainerStockData>
            </v-col>

            <!-- CONTAINER EDITAR LIVRO -->
            <v-col cols="12" class="text-start" v-if="reactiveVar.cardAtivo == 'editar_livro'">
                Editar livro
            </v-col>

        </v-row>

    </v-container>
</template>

<!-- SCRIPT -->
<script>
// SYSTEM
import { defineComponent, reactive } from 'vue';

// COMPONENTS
import ButtonOptions from '@/components/Button/BtnOption.vue';
import ButtonConfirm from '@/components/Button/BtnConfirm.vue';
import FieldDefault from '@/components/Field/FieldDefault.vue';
import TableDefault from '@/components/Table/TableDefault.vue';
import ContainerStockData from '@/components/Container/ContainerStockData.vue';

export default defineComponent({
    el: '#stockView',
    data() { // RESPONSAVEL PELA MANIPULAÇÃO DOS DADOS

        // AXIOS - PARA REQUISIÇÃO DE API
        const axios = require('axios');
        axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + ":57601";

        var reactiveVar = reactive(
            {
                search: "",
                cardAtivo: "livros",
                itemsPerPage: -1,
                totalItems: 0,
                livroSelecionado: [],
                listaLivrosEstoque: [],
                listaStatus: {
                    0: { titulo: "Aguardando", cor: "#CBDC07" },
                    1: { titulo: "Alugado", cor: "#070FDC" },
                    2: { titulo: "Entregue", cor: "#0BDC07" },
                    3: { titulo: "Vencido", cor: "#FF6B00" },
                    4: { titulo: "Recusado", cor: "#DC0707" }
                },
                headersEstoque: [
                    { title: 'Titulo:', key: 'titulo', align: 'start', sortable: true },
                    { title: 'Autor:', key: 'autor', align: 'start' },
                    { title: 'Idioma:', key: 'idioma', align: 'start' },
                    { title: 'Paginas:', key: 'paginas', tipo: 'int', align: 'start' },
                    { title: 'Estoque:', key: 'total_estoque', tipo: 'int', align: 'start' },
                    { title: 'Visualizar:', key: '', tipo: 'btnIcon', icone: 'mdi-eye', align: 'start' }
                ],
                loading: true,
                containerCriarLivro: false,
                listaLivroFalha: false
            }
        );

        // PUXA LIVROS
        const listaDeLivros = async () => {

            // INICIA O LOAD NA TABELA PEDIDOS
            reactiveVar.loading = true;
            reactiveVar.listaLivroFalha = false;

            let body = {
                "filter": {
                    "titulo": { "$regex": "a", "$options": "i" }
                },
                "sort": {
                    "_id": -1
                },
                "limit": 99
            };

            // HEADER
            let config = {
                method: 'POST',
                withCredentials: true,
                timeout: process.env.VUE_APP_AXIOS_TIMEOUT,
                url: '/api/book/list_book',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                },
                data: body
            };

            // RUN AXIOS
            await axios.request(config)
                .then((response) => {
                    let estoque = response.data.data_base.result;
                    let mensagem = response.data.mensagem;
                    Toast.fire(mensagem, "", "success");
                    reactiveVar.listaUsuariosFalha = false;
                    reactiveVar.listaLivrosEstoque = estoque;
                })
                .catch((error) => {

                    let erroResponse;
                    try {
                        erroResponse = error.response.data.mensagem;
                    } catch (axiosErr) {
                        erroResponse = "Erro ao solicitar dados da api"
                    }

                    reactiveVar.listaLivroFalha = true;
                    Toast.fire(erroResponse, "", "error");
                });

            // FINALIZA O LOAD NA TABELA PEDIDOS
            reactiveVar.loading = false;

        }

        listaDeLivros();

        return {
            reactiveVar,
            listaDeLivros
        }
    },
    methods: { // RESPONSAVEL POR CONTROLAR OS CLICK DE ELEMENTOS
        reloadTableLivros() { // RECARREGA A LISTA DE LIVROS
            this.listaDeLivros();
        },
        rowClicked(row) { // AO CLICAR NO BOTAO DENTRO DA TABELA
            this.reactiveVar.pedidoSelecionado = row;
            this.reactiveVar.botoaPedido.cor = "#52f6af";
            this.reactiveVar.botoaDevolucao.cor = "transparent";
            this.reactiveVar.cardAtivo = "editar_usuario";
            this.reactiveVar.containerUsuario = true;
        },
        btnCriarLivro() {
            this.reactiveVar.cardAtivo = "criar_livro";
            this.reactiveVar.containerCriarLivro = true;
        },
        closeCadastrarLivro() {
            this.reactiveVar.cardAtivo = "livros";
            this.reactiveVar.containerCriarLivro = false;
        },
    },
    components: { // RESPONSAVEL PELA IMPORTAÇÃO DOS COMPONENTES FILHO
        ButtonOptions,
        ButtonConfirm,
        FieldDefault,
        TableDefault,
        ContainerStockData
    },
    computed: { // RESPONSAVEL PELA RESPONSIVIDADE
        header() {
            const { lg, md, xl } = this.$vuetify.display
            return lg ? [7, 5] : xl ? [7, 5] : md ? [7, 5] : [12, 12]
        },
        colsNav() {
            const { lg, md, xl } = this.$vuetify.display
            return lg ? [6, 6] : xl ? [6, 6] : md ? [6, 6] : [12, 12]
        }
    },
});
</script>