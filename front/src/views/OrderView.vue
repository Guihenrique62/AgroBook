<!-- HTML -->
<template>
    <v-container>

        <!-- HEADER -->
        <v-row no-gutters>

            <!-- TABS -->
            <v-col :cols="header[0]" class="text-start mb-2">
                <ButtonOptions :texto="reactiveVar.botoaPedido.texto" :cor="reactiveVar.botoaPedido.cor" class="mr-2" @click="btnPedidos()"/>
                <ButtonOptions :texto="reactiveVar.botoaDevolucao.texto" :cor="reactiveVar.botoaDevolucao.cor" class="mr-2" @click="btnDevolucao()"/>
            </v-col>

            <!-- FILTRO -->
            <v-col :cols="header[1]" class="text-end">
                <FieldDefault v-if="reactiveVar.containerConfirmarPedido == false" v-model="reactiveVar.search" prependIcon="mdi-magnify" :carregar="false" texto="Buscar pedido..." cor="white" ></FieldDefault>
            </v-col>

        </v-row>

        <!-- CAIXA COM PEDIDOS -->
        <v-row no-gutters class="mt-2">

            <!-- LISTA DE PEDIDOS -->
            <v-col cols="12" class="text-start" v-if="reactiveVar.cardAtivo == 'pedidos'">
                <TableDefault
                    :itemsPorPagina="reactiveVar.itemsPerPage" 
                    :tamanhoItems="reactiveVar.totalItems"
                    :cabecalho="reactiveVar.headersPedidos"
                    :items="reactiveVar.listaPedidos"
                    :search="reactiveVar.search"
                    :carregando="reactiveVar.loading"
                    @rowClickTable="rowClicked">
                </TableDefault>
            </v-col>

            <!-- CONTAINER ACEITAR PEDIDO -->
            <v-col cols="12" class="text-start" v-if="reactiveVar.cardAtivo == 'aceitar_pedido'">
                <ContainerAcceptOrder 
                    @rowClickTableClose="closePedidos"
                    @rowReloadTablePedidos="reloadTablePedidos"
                    :pedidoSelecionado="reactiveVar.pedidoSelecionado">
                </ContainerAcceptOrder>
            </v-col>

            <!-- LISTA DE DEVOLUÇÃO -->
            <v-col cols="12" class="text-start" v-if="reactiveVar.cardAtivo == 'devolucao'">
                <TableDefault
                    :itemsPorPagina="reactiveVar.itemsPerPage" 
                    :tamanhoItems="reactiveVar.totalItems"
                    :cabecalho="reactiveVar.headersDevolucao"
                    :items="reactiveVar.listaPedidos"
                    :search="reactiveVar.search"
                    :carregando="reactiveVar.loading"
                    @rowClickTable="rowClicked">
                </TableDefault>
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
import FieldDefault from '@/components/Field/FieldDefault.vue';
import TableDefault from '@/components/Table/TableDefault.vue';
import ContainerAcceptOrder from '@/components/Container/ContainerAcceptOrder.vue';

export default defineComponent({
    el: '#orderView',
    data() {

        // AXIOS - PARA REQUISIÇÃO DE API
        const axios = require('axios');
        axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + ":57601";

        var reactiveVar = reactive(
            {
                search: "",
                cardAtivo: "pedidos",
                itemsPerPage: -1,
                totalItems: 0,
                pedidoSelecionado: [],
                listaPedidos: [],
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
                    { title: 'Nome:', key: 'user', objectKey: "nome", align: 'start' },
                    { title: 'Titulo:', key: 'book', objectKey: "titulo", align: 'start' },
                    { title: 'Data pedido:', key: 'data_aluguel', tipo: 'diaMesAno', align: 'start', sortable: true },
                    { title: 'Status:', key: 'status', tipo: "listaPersonalisada", listaPersonalizada: { 0: { titulo: "Aguardando", cor: "#CBDC07" }, 1: { titulo: "Alugado", cor: "#070FDC" }, 2: { titulo: "Entregue", cor: "#0BDC07" }, 3: { titulo: "Vencido", cor: "#FF6B00" }, 4: { titulo: "Recusado", cor: "#DC0707" } }, align: 'start' },
                    { title: 'Visualizar:', key: '', tipo: 'btnIcon', icone: 'mdi-eye', align: 'start' }
                ],
                headersDevolucao: [
                    { title: 'Nome:', key: 'user.0.nome', align: 'start', sortable: true },
                    { title: 'Titulo:', key: 'book.0.titulo', align: 'start' },
                    { title: 'Data da devolução:', key: 'data_aluguel', align: 'start' },
                    { title: 'Ação:', key: 'data_vencimento', align: 'start' }
                ],
                loading: true,
                containerConfirmarPedido: false
            }
        );

        // PUXA LIVROS
        const listaDePedidos = async () => {

            // INICIA O LOAD NA TABELA PEDIDOS
            reactiveVar.loading = true;

            let body = {
                "collections": [
                    {
                        "collection": "pedidos"
                    },
                    {
                        "from": "usuarios",
                        "localField": "usuario",
                        "foreignField": "_id",
                        "as": "user"
                    },
                    {
                        "from": "livros",
                        "localField": "livro",
                        "foreignField": "_id",
                        "as": "book"
                    }
                ],
                "filter": {
                    "status": {
                        "$in": [
                            0,
                            1,
                            2,
                            3,
                            4,
                            5
                        ]
                    }
                },
                "sort": { titulo: "", cor: "" },
                "limit": 99
            };

            // HEADER
            let config = {
                method: 'POST',
                withCredentials: true,
                url: '/api/order/list_order',
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
                    reactiveVar.listaPedidos = pedidos;
                })
                .catch((error) => {
                    let erroResponse = error.response.data.mensagem;
                    Toast.fire(erroResponse, "", "error");
                });

            // FINALIZA O LOAD NA TABELA PEDIDOS
            reactiveVar.loading = false;

        }

        listaDePedidos();

        return {
            reactiveVar,
            listaDePedidos
        }

    },
    methods: {
        loadItems({ page, itemsPerPage, sortBy }) {
        },
        reloadTablePedidos() {
            this.listaDePedidos();
        },
        rowClicked(row) {
            this.reactiveVar.pedidoSelecionado = row;
            this.reactiveVar.botoaPedido.cor = "#52f6af";
            this.reactiveVar.botoaDevolucao.cor = "transparent";
            this.reactiveVar.cardAtivo = "aceitar_pedido";
            this.reactiveVar.containerConfirmarPedido = true;
        },
        closePedidos() {
            this.reactiveVar.botoaPedido.cor = "#52f6af";
            this.reactiveVar.botoaDevolucao.cor = "transparent";
            this.reactiveVar.cardAtivo = "pedidos";
            this.reactiveVar.containerConfirmarPedido = false;
        },
        btnPedidos() {
            // VERIFICA SE EXISTE CONTAINER ABERTO
            let listaContainer = ['aceitar_pedido'];

            if (listaContainer.indexOf(this.reactiveVar.cardAtivo) == -1) {
                this.reactiveVar.botoaPedido.cor = "#52f6af";
                this.reactiveVar.botoaDevolucao.cor = "transparent";

                // VERIFICA SE O CONTAINER DE ACEITAR PEDIDOS ESTA ABERTO
                if (this.reactiveVar.containerConfirmarPedido) {
                    this.reactiveVar.cardAtivo = "aceitar_pedido";
                } else {
                    this.reactiveVar.cardAtivo = "pedidos";
                }
                
            }
            
        },
        btnDevolucao() {
            this.reactiveVar.botoaPedido.cor = "transparent";
            this.reactiveVar.botoaDevolucao.cor = "#52f6af";
            this.reactiveVar.cardAtivo = "devolucao";
        },
        showAlertToast(texto, tipo) {
            Toast.fire(texto, "", tipo);
        },
        showQuestCreateOrder() {
            this.$swal({
                title: "Deseja alugar esse livro?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Sim",
                denyButtonText: "Não",
                confirmButtonColor: "#3AB92F",
                cancelButtonColor: "#325EA1",
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.alugarLivro();
                } else if (result.isDenied) {
                    // this.$swal("Changes are not saved", "", "info");
                }
            });
        }
    },
    components: {
        ButtonOptions,
        FieldDefault,
        TableDefault,
        ContainerAcceptOrder
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