<!-- HTML -->
<template>
    <v-container>

        <!-- HEADER -->
        <v-row no-gutters>

            <!-- TABS -->
            <v-col :cols="header[0]" class="text-start mb-2">
                <ButtonConfirm v-if="reactiveVar.containerUsuario == false" texto="Novo" cor="success" class="mr-2"
                    @click="btnCriarUsuario()" />
            </v-col>

            <!-- FILTRO -->
            <v-col :cols="header[1]" class="text-end">
                <FieldDefault v-if="reactiveVar.containerUsuario == false" v-model="reactiveVar.search"
                    prependIcon="mdi-magnify" :carregar="false" texto="Buscar colaborador..." cor="white" />
            </v-col>

        </v-row>

        <!-- CAIXA COM PEDIDOS -->
        <v-row no-gutters class="mt-2">

            <!-- LISTA DE PEDIDOS -->
            <v-col cols="12" class="text-start" v-if="reactiveVar.cardAtivo == 'usuarios'">
                <TableDefault v-if="reactiveVar.listaUsuariosFalha == false" :itemsPorPagina="reactiveVar.itemsPerPage" :tamanhoItems="reactiveVar.totalItems"
                    :cabecalho="reactiveVar.headersPedidos" :items="reactiveVar.listaUsuarios" :search="reactiveVar.search"
                    :carregando="reactiveVar.loading" @rowClickTable="rowClicked">
                </TableDefault>
                <TableDefaultReload v-if="reactiveVar.listaUsuariosFalha == true" @reiniciarSolicitacao="listaDeUsuarios()"/>
            </v-col>

            <!-- CONTAINER EDITAR USUARIO -->
            <v-col cols="12" class="text-start" v-if="reactiveVar.cardAtivo == 'editar_usuario'">
                <ContainerUserData @rowClickTableClose="closeCadastrarUsuario" @rowReloadTableUsuarios="reloadTableUsuarios()" tipo="editar" :pedidoSelecionado="reactiveVar.pedidoSelecionado"/>
            </v-col>

            <!-- CRIAR USUARIO -->
            <v-col cols="12" class="text-start" v-if="reactiveVar.cardAtivo == 'criar_usuario'">
                <ContainerUserData @rowClickTableClose="closeCadastrarUsuario" @rowReloadTableUsuarios="reloadTableUsuarios()" tipo="criar" :pedidoSelecionado="[]"/>
            </v-col>

        </v-row>

    </v-container>
</template>

<!-- SCRIPT -->
<script>
// SYSTEM
import { defineComponent, reactive } from 'vue';
import { vue3Debounce } from 'vue-debounce';

// COMPONENTS
import ButtonOptions from '@/components/Button/BtnOption.vue';
import ButtonConfirm from '@/components/Button/BtnConfirm.vue';
import FieldDefault from '@/components/Field/FieldDefault.vue';
import TableDefault from '@/components/Table/TableDefault.vue';
import TableDefaultReload from '@/components/Table/TableDefaultReload.vue';
import ContainerUserData from '@/components/Container/ContainerUserData.vue';

export default defineComponent({
    el: '#usersView',
    data() {

        // AXIOS - PARA REQUISIÇÃO DE API
        const axios = require('axios');
        axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + ":57601";

        var reactiveVar = reactive(
            {
                search: "",
                cardAtivo: "usuarios",
                itemsPerPage: -1,
                totalItems: 0,
                pedidoSelecionado: [],
                listaUsuarios: [],
                listaUsuariosFalha: false,
                botoaPedido: {
                    texto: "Pedidos", cor: "#52f6af"
                },
                botoaDevolucao: {
                    texto: "Devolução", cor: "transparent"
                },
                listaStatus: {
                    0: { titulo: "Aguardando", cor: "#CBDC07" },
                    1: { titulo: "Alugado", cor: "#070FDC" },
                    2: { titulo: "Entregue", cor: "#0BDC07" },
                    3: { titulo: "Vencido", cor: "#FF6B00" },
                    4: { titulo: "Recusado", cor: "#DC0707" }
                },
                headersPedidos: [
                    { title: 'Nome:', key: 'nome', objectKey: "nome", align: 'start', sortable: true },
                    { title: 'E-mail:', key: 'email', objectKey: "email", align: 'start' },
                    { title: 'Cargo:', key: 'cargo', tipo: "listaPersonalisada", listaPersonalizada: { 0: { titulo: "Administrado", cor: "#CBDC07" }, 1: { titulo: "Colaborador", cor: "#070FDC" }, 2: { titulo: "Entregue", cor: "#0BDC07" }, 3: { titulo: "Vencido", cor: "#FF6B00" }, 4: { titulo: "Recusado", cor: "#DC0707" } }, align: 'start' },
                    { title: 'Editar:', key: 'email', tipo: "btnIcon", align: 'start' },
                ],
                loading: true,
                containerUsuario: false,
                containerEditarUsuario: false
            }
        );

        // PUXA USUARIOS
        const listaDeUsuarios = async () => {

            // INICIA O LOAD NA TABELA PEDIDOS
            reactiveVar.loading = true;
            reactiveVar.listaUsuariosFalha = false;

            let body = {
                "filter": {
                    "email": { "$regex": "@", "$options": "i" }
                },
                "sort": {
                    "_id": -1
                },
                "limit": 100
            };

            // HEADER
            let config = {
                method: 'POST',
                withCredentials: true,
                timeout: process.env.VUE_APP_AXIOS_TIMEOUT,
                url: '/api/user/list_user',
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
                    let pedidos = response.data.data_base.result;
                    let mensagem = response.data.mensagem;
                    Toast.fire(mensagem, "", "success");
                    reactiveVar.listaUsuariosFalha = false;
                    reactiveVar.listaUsuarios = pedidos;
                })
                .catch((error) => {

                    let erroResponse;
                    try {
                        erroResponse = error.response.data.mensagem;
                    } catch (axiosErr) {
                        erroResponse = "Erro ao solicitar dados da api"
                    }

                    reactiveVar.listaUsuariosFalha = true;
                    Toast.fire(erroResponse, "", "error");
                });

            // FINALIZA O LOAD NA TABELA PEDIDOS
            reactiveVar.loading = false;

        }

        listaDeUsuarios();

        return {
            reactiveVar,
            listaDeUsuarios
        }

    },
    methods: {
        loadItems({ page, itemsPerPage, sortBy }) {
        },
        reloadTableUsuarios() {
            this.listaDeUsuarios();
        },
        rowClicked(row) {
            this.reactiveVar.pedidoSelecionado = row;
            this.reactiveVar.botoaPedido.cor = "#52f6af";
            this.reactiveVar.botoaDevolucao.cor = "transparent";
            this.reactiveVar.cardAtivo = "editar_usuario";
            this.reactiveVar.containerUsuario = true;
        },
        closeCadastrarUsuario() {
            this.reactiveVar.cardAtivo = "usuarios";
            this.reactiveVar.containerUsuario = false;
        },
        btnCriarUsuario() {
            this.reactiveVar.cardAtivo = "criar_usuario";
            this.reactiveVar.containerUsuario = true;
        }
    },
    components: {
        ButtonOptions,
        ButtonConfirm,
        FieldDefault,
        TableDefault,
        TableDefaultReload,
        ContainerUserData
    },
    computed: {
        header() {
            const { lg, md, xl } = this.$vuetify.display
            return lg ? [8, 4] : xl ? [8, 4] : md ? [8, 4] : [12, 12]
        },
        colsNav() {
            const { lg, md, xl } = this.$vuetify.display
            return lg ? [6, 6] : xl ? [6, 6] : md ? [6, 6] : [12, 12]
        }
    },
    directives: {
        debounce: vue3Debounce({ lock: true })
    }
});
</script>

<style scoped>
.v-table {
    background: white;
}
</style>