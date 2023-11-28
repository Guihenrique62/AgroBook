<!-- HTML -->
<template>
    <v-container class="rounded" style="border: 1px solid #656565;">
        <v-row>

            <!-- TITULO -->
            <v-col cols="6" class="text-start d-flex align-center">
                <div class="text-truncate">Solicitação de pedido</div>
            </v-col>

            <!-- BOTAO DE FECHAR -->
            <v-col cols="6" class="text-end">
                <ButtonClosed @click="rowClick()" cor="white" />
            </v-col>

            <!-- NOME -->
            <v-col :cols="inputs[0]">
                <div>
                    <div class="text-truncate">Nome do colaborador:</div>
                    <FieldDefault :disabled="reactiveVar.fildsDisabled" v-model="reactiveVar.nome" prependIcon=""
                        :carregar="false" texto="" cor="white" />
                </div>
            </v-col>

            <!-- DOCUMENTO -->
            <v-col :cols="inputs[1]">
                <div>
                    <div class="text-truncate">Cpf:</div>
                    <FieldDefault :disabled="reactiveVar.fildsDisabled" v-model="reactiveVar.cpf" prependIcon=""
                        :carregar="false" texto="" cor="white" />
                </div>
            </v-col>

            <!-- CARGO -->
            <v-col :cols="inputs[2]">
                <div>
                    <div class="text-truncate">Cargo:</div>
                    <FieldDefault :disabled="reactiveVar.fildsDisabled" v-model="reactiveVar.cargo" prependIcon=""
                        :carregar="false" texto="" cor="white" />
                </div>
            </v-col>

            <!-- STATUS -->
            <v-col :cols="inputs[3]">
                <div>
                    <div class="text-truncate">Status:</div>
                    <FieldDefault :disabled="reactiveVar.fildsDisabled" v-model="reactiveVar.status" prependIcon=""
                        :carregar="false" texto="" cor="white" />
                </div>

            </v-col>

            <!-- TITULO LIVRO -->
            <v-col :cols="inputs[0]">
                <div>
                    <div class="text-truncate">Titulo do livro:</div>
                    <FieldDefault :disabled="reactiveVar.fildsDisabled" v-model="reactiveVar.tituloLivro" prependIcon=""
                        :carregar="false" texto="" cor="white" />
                </div>

            </v-col>

            <!-- ESTOQUE -->
            <v-col :cols="inputs[1]">
                <div>
                    <div class="text-truncate">Em estoque:</div>
                    <FieldDefault :disabled="reactiveVar.fildsDisabled" v-model="reactiveVar.estoqueLivro" prependIcon=""
                        :carregar="false" texto="" cor="white" />
                </div>
            </v-col>

            <!-- DATA DO PEDIDO -->
            <v-col :cols="inputs[2]">
                <div>
                    <div class="text-truncate">Data do pedido:</div>
                    <FieldDefault :disabled="reactiveVar.fildsDisabled" v-model="reactiveVar.dataPedido" prependIcon=""
                        :carregar="false" texto="" cor="white" />
                </div>
            </v-col>

            <!-- DATA VENCIMENTO -->
            <v-col :cols="inputs[3]">
                <div>
                    <div class="text-truncate">Data vencimento:</div>
                    <FieldDefault :disabled="reactiveVar.fildsDisabled" v-model="reactiveVar.dataVencimento" prependIcon=""
                        :carregar="false" texto="" cor="white" />
                </div>
            </v-col>

            <!-- LOGS PROCESSOS -->
            <v-col cols="12">
                <div>
                    <div class="text-truncate">Logs do processo:</div>
                    <TextAreaDefault v-model="reactiveVar.logsProcessos" prependIcon="" :carregar="false" texto=""
                        cor="white" />
                </div>
            </v-col>

            <!-- BOTAO AÇÃO -->
            <v-col cols="12" class="text-end">
                <ButtonConfirm :disabled="reactiveVar.loadUpdatePedido" :loading="reactiveVar.loadUpdatePedido"
                    @click="btnRecusar()" texto="Recusar" cor="error" class="mr-2" />
                <ButtonConfirm :disabled="reactiveVar.loadUpdatePedido" :loading="reactiveVar.loadUpdatePedido"
                    @click="btnAprovar()" texto="Aprovar" cor="success" />
            </v-col>

        </v-row>

    </v-container>
</template>

<!-- JAVASCRIPT -->
<script>
// SYSTEM
import { defineComponent, reactive } from 'vue';

// COMPONENTS
import ButtonClosed from '@/components/Button/BtnClosed.vue';
import ButtonConfirm from '@/components/Button/BtnConfirm.vue';
import FieldDefault from '@/components/Field/FieldDefault.vue';
import TextAreaDefault from '@/components/TextArea/TextAreaDefault.vue';

export default defineComponent({
    data() {

        // AXIOS - PARA REQUISIÇÃO DE API
        const axios = require('axios');
        axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + ":57601";

        var reactiveVar = reactive(
            {
                fildsDisabled: true,
                loadUpdatePedido: false,
                nome: this.pedidoSelecionado.user[0]["nome"],
                cpf: this.pedidoSelecionado.user[0]["documento"],
                cargo: this.pedidoSelecionado.user[0]["cargo"],
                status: this.pedidoSelecionado.user[0]["status"],
                tituloLivro: this.pedidoSelecionado.book[0]["titulo"],
                estoqueLivro: this.pedidoSelecionado.book[0]["total_estoque"],
                dataPedido: this.pedidoSelecionado["data_aluguel"],
                dataVencimento: this.pedidoSelecionado["data_vencimento"],
                logsProcessos: ""
            }
        );

        // PUXA LIVROS
        const atualizarPedido = async (novoStatus) => {

            // INICIA O LOAD NO CONTAINER CONFIRMAR PEDIDO
            reactiveVar.loadUpdatePedido = true;

            let body = {
                "filter": {
                    "_id": {
                        "$oid": this.pedidoSelecionado["_id"]
                    }
                },
                "newValue": {
                    "status": novoStatus
                }
            };

            // HEADER
            let config = {
                method: 'POST',
                withCredentials: true,
                url: '/api/book/update_order',
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
                    this.$emit('rowReloadTablePedidos', true);
                    this.$emit('rowClickTableClose', true);
                })
                .catch((error) => {
                    let erroResponse = error.response.data.mensagem;
                    Toast.fire(erroResponse, "", "error");
                });

            // INICIA O LOAD NO CONTAINER CONFIRMAR PEDIDO
            reactiveVar.loadUpdatePedido = false;

        }

        return {
            reactiveVar,
            atualizarPedido
        }
    },
    components: {
        ButtonClosed,
        ButtonConfirm,
        FieldDefault,
        TextAreaDefault
    },
    computed: {
        inputs() {
            const { lg, md, xl } = this.$vuetify.display
            return lg ? [4, 3, 3, 2] : xl ? [4, 3, 3, 2] : md ? [4, 3, 3, 2] : [12, 12, 12, 12]
        },
        filter: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('data', val);
            }
        }
    },
    props: {
        pedidoSelecionado: Object
    },
    methods: {
        rowClick: function () {
            this.$emit('rowClickTableClose', true);
        },
        btnAprovar() {
            this.$swal({
                title: `Deseja Aprovar esta solicitação, com data de vencimento para ${this.pedidoSelecionado.data_vencimento}`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Aprovar",
                denyButtonText: "Cancelar",
                confirmButtonColor: "#3AB92F",
                cancelButtonColor: "#325EA1",
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.atualizarPedido(1)
                }
            });
        },
        btnRecusar() {
            this.$swal({
                title: `Deseja Recusar esta solicitação, com data de vencimento para ${this.pedidoSelecionado.data_vencimento}`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Recusar",
                denyButtonText: "Cancelar",
                confirmButtonColor: "#325EA1",
                cancelButtonColor: "info",
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.atualizarPedido(4)
                }
            });
        },
        showAlertToast(texto, tipo) {
            Toast.fire(texto, "", tipo);
        },
    },
});
</script>