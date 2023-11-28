<!-- HTML -->
<template>
    <v-container class="rounded" style="border: 1px solid #656565;">
        <!-- ROW PRINCIPAL -->
        <v-row>

            <!-- INICIO DO HEADER -->
            <v-col cols="6" class="text-start d-flex align-center"> <!-- TITULO -->
                <div class="text-truncate">Criar Usuário</div>
            </v-col>
            <v-col cols="6" class="text-end"> <!-- BOTAO DE FECHAR -->
                <ButtonClosed @click="closeCard()" cor="white" />
            </v-col>
            <!-- FIM DO HEADER -->


            <!-- INICIO DOS INPUTS COLUNA [1] -->
            <v-col :cols="inputsLine4[0]"> <!-- TITULO/NOME LIVRO -->
                <div>
                    <div class="text-truncate">Nome do livro:</div>
                    <FieldDefault tipo="text" :disabled="reactiveVar.fildsDisabled" v-model="reactiveVar.nomeLivro"
                        prependIcon="" :carregar="false" texto="" cor="white">
                    </FieldDefault>
                </div>
            </v-col>
            <v-col :cols="inputsLine4[1]"> <!-- CAPA -->
                <div>
                    <div class="text-truncate">Capa:</div>
                    <FieldDefault tipo="url" :disabled="reactiveVar.fildsDisabled" v-model="reactiveVar.capa" prependIcon=""
                        :carregar="false" texto="" cor="white">
                    </FieldDefault>
                </div>
            </v-col>
            <v-col :cols="inputsLine4[2]"> <!-- PAGINAS -->
                <div>
                    <div class="text-truncate">Nº de páginas:</div>
                    <FieldDefault tipo="number" :disabled="reactiveVar.fildsDisabled" v-model="reactiveVar.paginas"
                        prependIcon="" :carregar="false" texto="" cor="white">
                    </FieldDefault>
                </div>
            </v-col>
            <v-col :cols="inputsLine4[3]"> <!-- ESTOQUE -->
                <div>
                    <div class="text-truncate">Nº livro(s) estoque:</div>
                    <FieldDefault tipo="number" :disabled="reactiveVar.fildsDisabled" v-model="reactiveVar.estoque"
                        prependIcon="" :carregar="false" texto="" cor="white">
                    </FieldDefault>
                </div>
            </v-col>
            <!-- FIM DOS INPUTS COLUNA [1] -->


            <!-- INICIO DOS INPUTS COLUNA [2] -->
            <v-col :cols="inputsLine4[0]"> <!-- AUTOR -->
                <div>
                    <div class="text-truncate">Nome do autor:</div>
                    <FieldDefault tipo="text" :disabled="reactiveVar.fildsDisabled" v-model="reactiveVar.nomeAutor"
                        prependIcon="" :carregar="false" texto="" cor="white">
                    </FieldDefault>
                </div>
            </v-col>
            <v-col :cols="inputsLine4[1]"> <!-- LANÇAMENTO -->
                <div>
                    <div class="text-truncate">Data lançamento:</div>
                    <FieldDefault tipo="date" :disabled="reactiveVar.fildsDisabled" v-model="reactiveVar.dataLancamento"
                        prependIcon="" :carregar="false" texto="" cor="white">
                    </FieldDefault>
                </div>
            </v-col>
            <v-col :cols="inputsLine4[2]"> <!-- IDIOMA -->
                <div>
                    <div class="text-truncate">Idioma:</div>
                    <FieldOptions
                        :items="reactiveVar.opcaoIdioma"
                        :disabled="reactiveVar.fildsDisabled" v-model="reactiveVar.cargo" prependIcon="" :carregar="false"
                        texto="" cor="white">
                    </FieldOptions>
                </div>
            </v-col>
            <v-col :cols="inputsLine4[2]"> <!-- CATEGORIAS -->
                <div>
                    <div class="text-truncate">Categoria(s):</div>
                    <ComboboxDefault
                        :items="reactiveVar.opcaoCategoria"
                        :disabled="reactiveVar.fildsDisabled"
                        :carregar="false"
                        v-model="reactiveVar.categoriaLivro"
                        cor="white"
                        prependIcon=""
                        texto="">
                    </ComboboxDefault>
                </div>
            </v-col>
            
            <!-- FIM DOS INPUTS COLUNA [2] -->


            <!-- INICIO DOS BOTAO COLUNA [1] -->
            <v-col cols="12" class="text-end" v-if="tipo == 'criar'"> <!-- BOTAO AÇÃO [ CRIAR ] -->
                <ButtonConfirm :disabled="reactiveVar.loadSavarUsuario" :loading="reactiveVar.loadSavarUsuario"
                    @click="btnCriarUsuario()" texto="Salvar" cor="success" />
            </v-col>
            <!-- FIM DOS BOTAO COLUNA [1] -->


            <!-- INICIO DOS BOTAO COLUNA [2] -->
            <v-col cols="12" class="text-end" v-if="tipo == 'editar'"> <!-- BOTAO AÇÃO [ EXCUIR + EXCLUIR ] -->
                <ButtonConfirm class="mr-2" :disabled="reactiveVar.loadEditarUsuario"
                    :loading="reactiveVar.loadEditarUsuario" @click="btnExcluirUsuario()" texto="Excluir" cor="error" />
                <ButtonConfirm :disabled="reactiveVar.loadEditarUsuario" :loading="reactiveVar.loadEditarUsuario"
                    @click="btnEditarUsuario()" texto="Editar" cor="success" />
            </v-col>
            <!-- FIM DOS BOTAO COLUNA [2] -->

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
import FieldOptions from '@/components/Field/FildOptions.vue';
import TextAreaDefault from '@/components/TextArea/TextAreaDefault.vue';
import ComboboxDefault from '@/components/Combobox/ComboboxDefault.vue';

export default defineComponent({
    data() {

        // AXIOS - PARA REQUISIÇÃO DE API
        const axios = require('axios');
        axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + ":57601";

        var reactiveVar = reactive(
            {
                fildsDisabled: false,
                loadSavarUsuario: false,
                loadEditarUsuario: false,
                salvarUsuario: [],
                editarUsuario: [],
                excluirUsuario: [],
                opcaoIdioma: [
                    { title: 'Portugues', value: "portugues" },
                    { title: 'Inglês', value: "ingles" },
                    { title: 'Japônes', value: "japones" }
                ],
                opcaoCategoria: [
                    'Ação',
                    'Drama',
                    'Suspense',
                    'Comédia'
                ],
                nome: this.tipo == 'editar' ? this.pedidoSelecionado.nome : '',
                cpf: this.tipo == 'editar' ? this.pedidoSelecionado.documento : '',
                email: this.tipo == 'editar' ? this.pedidoSelecionado.email : '',
                senha: '',
                cargo: this.tipo == 'editar' ? this.pedidoSelecionado.cargo : ''
            }
        );

        // CRIAR O USUARIO
        const salvarLivro = async () => {

            // INICIA O LOAD DE SALVAR USUARIO
            reactiveVar.loadSavarUsuario = true;

            let body = {
                "nome": reactiveVar.nome,
                "documento": reactiveVar.cpf,
                "email": reactiveVar.email,
                "senha": reactiveVar.senha,
                "cargo": reactiveVar.cargo.value,
                "status": 1
            }

            // HEADER
            let config = {
                method: 'POST',
                withCredentials: true,
                timeout: process.env.VUE_APP_AXIOS_TIMEOUT,
                url: '/api/user/create_user',
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
                    let usuario = response.data.data_base.result;
                    let mensagem = response.data.mensagem;
                    Toast.fire(mensagem, "", "success");
                    reactiveVar.salvarUsuario = usuario;
                    this.$emit('rowReloadTableUsuarios', true);
                    this.$emit('rowClickTableClose', true);
                })
                .catch((error) => {

                    let erroResponse;
                    try {
                        erroResponse = error.response.data.mensagem;
                    } catch (axiosErr) {
                        erroResponse = "Erro ao solicitar dados da api"
                    }

                    console.log(error)
                    Toast.fire(erroResponse, "", "error");
                });

            // PARA O LOAD DE SALVAR USUARIO
            reactiveVar.loadSavarUsuario = false;

        }

        return {
            reactiveVar,
            salvarLivro
        }

    },
    components: { // RESPONSAVEL POR TODOS OS COMPONENTES FILHOS USADO NO SCOPO ATUAL
        ButtonClosed,
        ButtonConfirm,
        FieldDefault,
        FieldOptions,
        TextAreaDefault,
        ComboboxDefault
    },
    computed: { // RESPONSAVEL PELA RESPONSIVIDADE
        inputsLine4() {
            const { lg, md, xl } = this.$vuetify.display
            return lg ? [5, 3, 2, 2] : xl ? [5, 3, 2, 2] : md ? [5, 3, 2, 2] : [12, 12, 12, 12]
        },
        inputsLine3() {
            const { lg, md, xl } = this.$vuetify.display
            return lg ? [6, 3, 3] : xl ? [6, 3, 3] : md ? [6, 3, 3] : [12, 12, 12]
        }
    },
    props: { // VARIAVEIS RECEBIDA DO PAI
        titulo: String, // TITULO DO CARD
        pedidoSelecionado: Object, // JSON RECEBIDO COM INFORMAÇÃO DO LIVRO
        tipo: String // RECEBE SE E PARA EDITAR OU PARA CRIAR [ 'editar', 'criar' ]
    },
    methods: { // CONTROLA TODOS OS CLICK NO SCOPO ATUAL
        closeCard: function () {
            // VERIFICA SE FOI CRIADO O USUARIO
            if (!this.reactiveVar.nome && !this.reactiveVar.cpf && !this.reactiveVar.email && !this.reactiveVar.senha && !this.reactiveVar.cargo) {
                this.$emit('rowClickTableClose', true);
            } else {
                this.$swal({
                    title: "Deseja descartar toda alteração feita?",
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: "Sim",
                    denyButtonText: "Não",
                    confirmButtonColor: "#3AB92F",
                    cancelButtonColor: "#325EA1",
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        this.$emit('rowClickTableClose', true);
                    }
                });
            }
        },
        btnCriarUsuario() {
            this.$swal({
                title: "Deseja criar esse usuário?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Sim",
                denyButtonText: "Não",
                confirmButtonColor: "#3AB92F",
                cancelButtonColor: "#325EA1",
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.salvarUsuario()
                }
            });
        },
        btnEditarUsuario() {
            this.$swal({
                title: "Deseja atualizar esse usuário?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Sim",
                denyButtonText: "Não",
                confirmButtonColor: "#3AB92F",
                cancelButtonColor: "#325EA1",
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.editaUsuario()
                }
            });
        },
        btnExcluirUsuario() {
            this.$swal({
                title: "Tem certeza que deseja excluir esse usuario?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Sim",
                denyButtonText: "Não",
                confirmButtonColor: "#3AB92F",
                cancelButtonColor: "#325EA1",
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.excluirUsuario()
                }
            });
        },
    },
});
</script>

<!-- STYLE APENAS NO SCOPO ATUAL, REMOVE 'scoped' PARA AS APLICAÇÃO SEREM GLOBAL -->
<style scoped></style>