<!-- HTML -->
<template>
    <div class="bg">
        <v-card width="270" height="24em" class="rounded pa-6" color="white" elevation="6" style="border: solid 1px #00000093;">
            <v-row>

                <!-- LOGO -->
                <v-col cols="12" class="d-flex justify-center mt-8">
                    <div v-if="reactiveVar.mostrarRedirecionamento == false">
                        <v-img :width="100" :height="100" src="../assets/logo.png"></v-img>
                    </div>
                    <div v-if="reactiveVar.mostrarRedirecionamento == true">
                        <AvatarLoad v-if="reactiveVar.carregarAvatar == true" texto="" cor="primary" tamanho="100"/>
                        <AvatarDefault v-if="reactiveVar.carregarAvatar == false" :texto="reactiveVar.nome" cor="primary" tamanho="100" />
                    </div>
                </v-col>

                <!-- EMAIL -->
                <v-col cols="12" v-if="reactiveVar.mostrarRedirecionamento == false">
                    <FildDefaultLogin v-model="reactiveVar.email" texto="E-mail" cor="white" tipo="text" />
                </v-col>

                <!-- SENHA -->
                <v-col cols="12" v-if="reactiveVar.mostrarRedirecionamento == false">
                    <FildDefaultLogin v-model="reactiveVar.senha" texto="Senha" cor="white" tipo="password" />
                </v-col>

                <!-- BOTAO LOGAR -->
                <v-col cols="12" v-if="reactiveVar.mostrarRedirecionamento == false">
                    <ButtonDefaultConfirm texto="Logar" cor="success" :carregando="reactiveVar.botaoLogarLoad"
                        @click="realizarLogin" />
                </v-col>

                <!-- TEXTO CONTINUAR DE ONDE PAROU -->
                <v-col cols="12" v-if="reactiveVar.mostrarRedirecionamento == true">
                    <div class="text-h6 text-md-h6 text-lg-h5">
                        Deseja continuar de onde parou?
                    </div>
                </v-col>

                <!-- BOTAO CONTINUAR DE ONDE PAROU -->
                <v-col cols="6" v-if="reactiveVar.mostrarRedirecionamento == true">
                    <ButtonDefaultConfirm texto="Não" cor="error" :to="reactiveVar.pathRedirecionarDeafault" />
                </v-col>
                <v-col cols="6" v-if="reactiveVar.mostrarRedirecionamento == true">
                    <ButtonDefaultConfirm texto="Sim" cor="success" :to="reactiveVar.pathRedirecionar" />
                </v-col>

            </v-row>

        </v-card>
    </div>
</template>

<!-- JAVASCRIPT -->
<script>
// SYSTEM
import { defineComponent, reactive } from 'vue';

// COMPONENTS
import FildDefaultLogin from '@/components/Field/FieldLogin.vue';
import ButtonDefaultConfirm from '@/components/Button/BtnConfirm.vue';
import AvatarDefault from '@/components/Avatar/AvatarDefault.vue';
import AvatarLoad from '@/components/Avatar/AvatarLoad.vue';

// MODULOS
import * as API_DEFAULT from "@/api/main";

export default defineComponent({
    data() {

        // AXIOS - PARA REQUISIÇÃO DE API
        const axios = require('axios');
        axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + ":57601";

        var reactiveVar = reactive(
            {
                email: "",
                senha: "",
                nome: "",
                pathRedirecionar: "/",
                pathRedirecionarDeafault: process.env.VUE_APP_HOME_PAGE,
                mostrarRedirecionamento: false,
                carregarAvatar: true,
                botaoLogarLoad: false
            }
        );

        const realizarLogin = async () => {

            // INICIA LOAD BOTAO LOGAR
            reactiveVar.botaoLogarLoad = true;

            // RESERVA A LISTA DE QUERY RECEBIDA NA URL
            let listaQueryUrl = this.$router.currentRoute.value.query;

            let body = {
                "email": reactiveVar.email,
                "senha": reactiveVar.senha
            };

            // HEADER
            let config = {
                method: 'POST',
                withCredentials: true,
                timeout: process.env.VUE_APP_AXIOS_TIMEOUT,
                url: '/auth/singin',
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

                    let login = response.data.data_base.result;
                    let userData = {};
                    let mensagem = response.data.mensagem;

                    // CRIA UM NOVO OBJETO
                    userData.nome = login[0].nome;
                    userData.cargo = login[0].cargo;
                    userData.status = login[0].status;
                    userData.resetar_senha = login[0].resetar_senha;

                    Toast.fire(mensagem, "", "success"); // MOSTRA ALERTA
                    sessionStorage.setItem("uui.data", JSON.stringify(userData)) // SALVA DADOS DO USUARIO PARA SER LIDOS NO SESSION STORAGE

                    // VERIFICA SE EXISTE HISTORICO E SE E PARA PERGUNTAR SE QUER CONTINUAR DE ONDE PAROU
                    if (Object.keys(listaQueryUrl).indexOf("redirect") > -1) {
                        reactiveVar.pathRedirecionar = listaQueryUrl["redirect"];
                        reactiveVar.mostrarRedirecionamento = true;

                        // TENTA DEFINIR O NOME QUE VAI APARECER NO AVATAR
                        try {
                            reactiveVar.nome = ((userData.nome).split(" ")[0]).slice(0, 1) + ((userData.nome).split(" ")[1]).slice(0, 1);
                        } catch (erroSelectNomeSobreNome) {
                            try {
                                reactiveVar.nome = ((userData.nome).split(" ")[0]).slice(0, 1);
                            } catch (erroSelectNome) {
                                reactiveVar.nome = "😊";
                            }
                        }

                        reactiveVar.nome = ((userData.nome).split(" ")[0]).slice(0, 1) + ((userData.nome).split(" ")[1]).slice(0, 1);
                        reactiveVar.carregarAvatar = false;

                    } else {
                        window.location.href = process.env.VUE_APP_HOME_PAGE;
                    }

            })
            .catch((error) => {
                let erroResponse;
                try {
                    erroResponse = error.response.data.mensagem;
                } catch (axiosErr) {
                    erroResponse = "Erro ao solicitar dados da api"
                }

                console.log(error);
                Toast.fire(erroResponse, "", "error");
                reactiveVar.mostrarRedirecionamento = false;
            });

            // PAUSAR LOAD BOTAO LOGAR
            reactiveVar.botaoLogarLoad = false;

        }

        return {
            reactiveVar,
            realizarLogin
        }
    },
    components: {
        FildDefaultLogin,
        ButtonDefaultConfirm,
        AvatarDefault,
        AvatarLoad
    }
});
</script>

<!-- ESTILO -->
<style scope>
.bg {
    display: grid;
    place-items: center;
    background-color: #ffffff;
    height: 100vh;
    background: url(../assets/jpeg/loginBackground.jpeg)no-repeat;
    background-position: center;
    background-size: cover;
}
</style>