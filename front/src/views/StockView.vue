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
                    prependIcon="mdi-magnify" :carregar="false" texto="Buscar livro..." cor="white" />
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

// COMPONENTS
import ButtonOptions from '@/components/Button/BtnOption.vue';
import ButtonConfirm from '@/components/Button/BtnConfirm.vue';
import FieldDefault from '@/components/Field/FieldDefault.vue';
import TableDefault from '@/components/Table/TableDefault.vue';
import ContainerAcceptOrder from '@/components/Container/ContainerAcceptOrder.vue';

export default defineComponent({
    data() {

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

        return {
            reactiveVar
        }
    },
    components: {
        ButtonOptions,
        ButtonConfirm,
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
});
</script>