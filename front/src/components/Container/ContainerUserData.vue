<!-- HTML -->
<template>
    <v-container class="rounded" style="border: 1px solid #656565;">
        <!-- ROW PRINCIPAL -->
        <v-row>

            <!-- TITULO -->
            <v-col cols="6" class="text-start d-flex align-center">
                <div class="text-truncate">Criar Usuário</div>
            </v-col>

            <!-- BOTAO DE FECHAR -->
            <v-col cols="6" class="text-end">
                <ButtonClosed @click="rowClick()" cor="white" />
            </v-col>

            <!-- NOME -->
            <v-col :cols="inputsLine2[0]">
                <div>
                    <div class="text-truncate">Nome do colaborador:</div>
                    <FieldDefault :disabled="reactiveVar.fildsDisabled" v-model="reactiveVar.nome" prependIcon=""
                        :carregar="false" texto="" cor="white">
                    </FieldDefault>
                </div>
            </v-col>

            <!-- DOCUMENTO -->
            <v-col :cols="inputsLine2[1]">
                <div>
                    <div class="text-truncate">Cpf:</div>
                    <FieldDefault :disabled="tipo == 'editar'" v-model="reactiveVar.cpf" prependIcon="" :carregar="false"
                        texto="" cor="white">
                    </FieldDefault>
                </div>
            </v-col>

            <!-- EMAIL -->
            <v-col :cols="inputsLine3[0]">
                <div>
                    <div class="text-truncate">E-mail:</div>
                    <FieldDefault :disabled="tipo == 'editar'" v-model="reactiveVar.email" prependIcon="" :carregar="false"
                        texto="" cor="white">
                    </FieldDefault>
                </div>
            </v-col>

            <!-- SENHA -->
            <v-col :cols="inputsLine3[1]">
                <div>
                    <div class="text-truncate">Senha:</div>
                    <FieldDefault :disabled="reactiveVar.fildsDisabled" v-model="reactiveVar.senha" prependIcon=""
                        :carregar="false" texto="" tipo="password" cor="white">
                    </FieldDefault>
                </div>
            </v-col>

            <!-- CARGO -->
            <v-col :cols="inputsLine3[2]">
                <div>
                    <div class="text-truncate">Cargo:</div>
                    <FieldOptions :disabled="reactiveVar.fildsDisabled" v-model="reactiveVar.cargo" prependIcon=""
                        :carregar="false" texto="" cor="white">
                    </FieldOptions>
                </div>
            </v-col>

            <!-- BOTAO AÇÃO [ CRIAR ] -->
            <v-col cols="12" class="text-end" v-if="tipo == 'criar'">
                <ButtonConfirm :disabled="reactiveVar.loadSavarUsuario" :loading="reactiveVar.loadSavarUsuario"
                    @click="btnCriarUsuario()" texto="Salvar" cor="success" />
            </v-col>

            <!-- BOTAO AÇÃO [ EXCUIR + EXCLUIR ] -->
            <v-col cols="12" class="text-end" v-if="tipo == 'editar'">
                <ButtonConfirm class="mr-2" :disabled="reactiveVar.loadEditarUsuario"
                    :loading="reactiveVar.loadEditarUsuario" @click="btnExcluirUsuario()" texto="Excluir" cor="error" />
                <ButtonConfirm :disabled="reactiveVar.loadEditarUsuario" :loading="reactiveVar.loadEditarUsuario"
                    @click="btnEditarUsuario()" texto="Editar" cor="success" />
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
import FieldOptions from '@/components/Field/FildOptions.vue';
import TextAreaDefault from '@/components/TextArea/TextAreaDefault.vue';

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
                nome: this.tipo == 'editar' ? this.pedidoSelecionado.nome : '',
                cpf: this.tipo == 'editar' ? this.pedidoSelecionado.documento : '',
                email: this.tipo == 'editar' ? this.pedidoSelecionado.email : '',
                senha: '',
                cargo: this.tipo == 'editar' ? this.pedidoSelecionado.cargo : ''
            }
        );

        // CRIAR O USUARIO
        const salvarUsuario = async () => {

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

        // CRIAR O USUARIO
        const editaUsuario = async () => {

            // INICIA O LOAD DE EDITAR USUÁRIO
            reactiveVar.loadEditarUsuario = true;

            let body = {
                "filter": {
                    "_id": { "$oid": this.pedidoSelecionado["_id"] }
                },
                "newValue": {}
            };

            if (reactiveVar.nome) { body.newValue = { "nome": reactiveVar.nome } };
            if (reactiveVar.senha) { body.newValue = { "senha": reactiveVar.senha } };
            if (reactiveVar.cargo.value) { body.newValue = { "cargo": reactiveVar.cargo } }

            // HEADER
            let config = {
                method: 'POST',
                withCredentials: true,
                timeout: process.env.VUE_APP_AXIOS_TIMEOUT,
                url: '/api/user/update_user',
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
                    reactiveVar.editarUsuario = usuario;
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

            // PARA O LOAD DE EDITAR USUÁRIO
            reactiveVar.loadEditarUsuario = false;

        }

        // EXCLUIR O USUARIO
        const excluirUsuario = async () => {

            // INICIA O LOAD DE EDITAR USUÁRIO
            reactiveVar.loadEditarUsuario = true;

            let body = {
                "filter": {
                    "_id": { "$oid": this.pedidoSelecionado["_id"] }
                }
            };

            // HEADER
            let config = {
                method: 'DELETE',
                withCredentials: true,
                timeout: process.env.VUE_APP_AXIOS_TIMEOUT,
                url: '/api/user/delete_user',
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
                    reactiveVar.excluirUsuario = usuario;
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

            // PARA O LOAD DE EDITAR USUÁRIO
            reactiveVar.loadEditarUsuario = false;

        }

        return {
            reactiveVar,
            salvarUsuario,
            editaUsuario,
            excluirUsuario
        }

    },
    components: {
        ButtonClosed,
        ButtonConfirm,
        FieldDefault,
        FieldOptions,
        TextAreaDefault
    },
    computed: {
        inputsLine2() {
            const { lg, md, xl } = this.$vuetify.display
            return lg ? [8, 4] : xl ? [8, 4] : md ? [8, 4] : [12, 12]
        },
        inputsLine3() {
            const { lg, md, xl } = this.$vuetify.display
            return lg ? [6, 3, 3] : xl ? [6, 3, 3] : md ? [6, 3, 3] : [12, 12, 12]
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
        pedidoSelecionado: Object,
        tipo: String
    },
    methods: {
        rowClick: function () {
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