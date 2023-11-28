<!-- HTML -->
<template>
    <v-container>
        <v-row no-gutters>

            <v-col :cols="cols[0]">

                <!-- FOTO DO LIVRO -->
                <BookViewDefault v-if="reactiveVar.carregamentoDadosLivro == false" cor="white" :capa="reactiveVar.book[0]['capa']" :elevacao="5" largura="200" altura="250"/>
                <BookViewDefaultLoad v-if="reactiveVar.carregamentoDadosLivro == true" cor="white" :elevacao="5" largura="200" altura="250"/>
                
            </v-col>

            <v-col :cols="cols[1]">

                <!-- DETALHES DO LIVRO -->
                <BookViewDetailDefault v-if="reactiveVar.carregamentoDadosLivro == false" cor="white" :elevacao="5" :titulo="reactiveVar.book[0]['titulo']" :autor="reactiveVar.book[0]['autor']" :sinopse="reactiveVar.book[0]['sinopse']"/>
                <BookViewDetailDefaultLoad v-if="reactiveVar.carregamentoDadosLivro == true" cor="white" :elevacao="5"/>
                

                <!-- BOTOES DE AÇÃO -->
                <v-card class="rounded-0 ma-2" color="transparent" elevation="0">
                    <v-row class="d-flex justify-start">
                        <v-col :cols="colsNav[0]" class="d-flex justify-start">

                            <v-chip-group column mandatory v-if="(reactiveVar.book[0]['categorias']).length > 2">
                                <v-chip class="x-small" label v-for="(chips, ci) in 2" :key="ci">{{ reactiveVar.book[0]['categorias'][ci] }}</v-chip>
                                <v-chip class="x-small" label>+ {{ (reactiveVar.book[0]['categorias']).length - 2 }}</v-chip>
                            </v-chip-group>

                            <v-chip-group column mandatory v-if="(reactiveVar.book[0]['categorias']).length <= 2">
                                <v-chip class="x-small" label v-for="(chips, ci) in reactiveVar.book[0]['categorias']" :key="ci">{{ chips }}</v-chip>
                            </v-chip-group>

                        </v-col>
                        <v-col :cols="colsNav[1]" class="d-flex justify-end">
                            <ButtonConfirm v-if="reactiveVar.botaoPedidosShow" class="mr-2" cor="info" texto="Pedidos" to="/pedidos" />
                            <ButtonConfirm cor="success" texto="Alugar" :carregando="reactiveVar.botaoFazerPedidoLoad" @click="showQuestCreateOrder()" />
                        </v-col>
                    </v-row>
                </v-card>

            </v-col>

        </v-row>
    </v-container>
</template>

<!-- JAVASCRIPT -->
<script>
// SYSTEM
import { defineComponent, reactive } from 'vue';

// COMPONENTS
import ButtonConfirm from '../components/Button/BtnConfirm.vue';
import BookViewDefault from '@/components/Card/BookViewDefault.vue';
import BookViewDefaultLoad from '@/components/Card/BookViewDefaultLoad.vue';
import BookViewDetailDefault from '@/components/Card/BookViewDetailDefault.vue';
import BookViewDetailDefaultLoad from '@/components/Card/BookViewDetailDefaultLoad.vue';

export default defineComponent({
    el: '#bookView',
    data() {

        // AXIOS - PARA REQUISIÇÃO DE API
        const axios = require('axios');
        axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + ":57601";

        var reactiveVar = reactive(
            {
                book: [{categorias: []}],
                orderResposta: [{}],
                carregamentoDadosLivro: true,
                botaoFazerPedidoLoad: false,
                botaoPedidosShow: false
            }
        );

        // PUXA LIVROS
        const puxarDadosDoLivro = async () => {

            let params = this.$router.currentRoute.value.params;

            let body = {
                "filter": {
                    "_id": { "$oid": params.id }
                },
                "sort": {
                    "_id": -1
                },
                "limit": 1
            }

            // HEADER
            let config = {
                method: 'POST',
                withCredentials: true,
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
                    let livro = response.data.data_base.result;
                    reactiveVar.book = livro;
                    reactiveVar.carregamentoDadosLivro = false;
                    Toast.fire("Dados do livro recuperado com sucesso", "", "success");
                })
                .catch((error) => {
                    let erroResponse;
                    try {
                        erroResponse = error.response.data.mensagem;
                    } catch (axiosErroLivro) {
                        erroResponse = "Erro ao ler dados do livro"
                    }
                    
                    reactiveVar.carregamentoDadosLivro = false;

                    Toast.fire(erroResponse, "", "error");
                });

        }

        // ALUGAR LIVRO
        const alugarLivro = async () => {

            // INICIA LOAD NO BOTAO FAZER PEDIDO
            reactiveVar.botaoFazerPedidoLoad = true;

            let params = this.$router.currentRoute.value.params;

            let body = {
                "livro": { "$oid": params.id },
                "data_vencimento": ""
            };

            // HEADER
            let config = {
                method: 'POST',
                withCredentials: true,
                url: '/api/order/create_order',
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
                    let alugarLivro = response.data.data_base.result;
                    reactiveVar.orderResposta = alugarLivro;
                    Toast.fire("Registro criado com sucesso!", "", "success");
                    reactiveVar.botaoPedidosShow = true;
                })
                .catch((error) => {

                    let erroResponse;
                    try {
                        erroResponse = error.response.data.mensagem;
                    } catch (axiosErroLivro) {
                        erroResponse = "Erro ao ler dados do livro"
                    }
                    
                    Toast.fire(erroResponse, "", "error");
                    reactiveVar.botaoPedidosShow = true;
                });

            // FINALIZA LOAD NO BOTAO FAZER PEDIDO
            reactiveVar.botaoFazerPedidoLoad = false;
        }

        puxarDadosDoLivro();

        return {
            reactiveVar,
            alugarLivro
        }

    },
    computed: {
        cols() {
            const { lg, md, xl } = this.$vuetify.display
            return lg ? [3, 9] : xl ? [3, 9] : md ? [3, 9] : [12, 12]
        },
        colsNav() {
            const { lg, md, xl } = this.$vuetify.display
            return lg ? [6, 6] : xl ? [6, 6] : md ? [6, 6] : [12, 12]
        }
    },
    components: {
        ButtonConfirm,
        BookViewDefault,
        BookViewDefaultLoad,
        BookViewDetailDefault,
        BookViewDetailDefaultLoad
    },
    methods: {
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
});

</script>