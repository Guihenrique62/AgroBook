/*
CRIADO: JEAN CLEIDSON PEREIRA RODRIGUES
MATRICULA: 202202257141
EMAIL: jeantng2016@gmail.com  
*/

const express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const md5 = require('md5');
const check_user = require('../../middleware/auth/jwt_mongodb'); // PUXA FUNCAO QUE VALIDA SESSAO DO USUARIO
const command = require('../../middleware/mongoDb/command/commands'); // EXTRAR OS COMANDOS NO MONGODB
require('dotenv').config();

// *************** SAVE LOG ***************
// Registra todas as rotas de entrada
const saveLog = async (obj) => {

    const shell_commands = new command(); // CRIA UM CONSTRUTOR
    const insertData = await shell_commands.commandCreateData('books', 'log', obj); // EXECULTA COMANDO DE CRIAR REGISTRO
    return true;

}

// *************** GET ***************
// Controla todas as entradas global no metodo GET
router.get("/", async (req, res) => {

    res.send({
        "status": "ok",
        "router": "global"
    });

});

// *************** ALL ***************
// Controla todas as entrada de api de usuario
router.all("/api/user*", async (req, res, next) => {

    const check_data = new check_user(); // CRIA O CONTRUTOR
    const result = await check_data.initSyncSingIn(req); // EXECUTA A FUNCAO DO CONSTRUTOR
    const cookieData = result[0]['validToken']; // RECUPERA OS DADOS DA FUNÇÃO

    // VERIFICA SE O USUARIO NÃO É ADMIN
    if (cookieData["cargo"] !== 0) {
        
        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_SUCCESS_FAIL,
            "mensagem": "O seu login não tem permissão para realizar essa tarefa, contate o administrador para acessar esse recurso",
            "data_base": ""
        });
        return true;

    }

    next();
});

// *************** ALL ***************
// Controla todas as entrada de api
router.all("/api*", async (req, res, next) => {

    const check_data = new check_user(); // CRIA O CONTRUTOR
    const result = await check_data.initSyncSingIn(req); // EXECUTA A FUNCAO DO CONSTRUTOR
    const cookieData = result[0]['validToken']; // RECUPERA OS DADOS DA FUNÇÃO

    var obj = {}; // CRIA UM OBJETO VAZIO PARA SALVAR NO MONGO DB

    // INSERE VALORES NO OBJETO VAZIO
    obj.acao = "acessar_api";
    obj.rota = req.params;
    obj.responsavel_acao = !cookieData.id ? "" : cookieData.id;
    obj.responsavel_objeto = cookieData;
    obj.body = req.body;
    obj.id_usuario = "";
    obj.erro = cookieData.hash_mail_pass == "false" ? true : false;
    obj.message = cookieData.hash_mail_pass == "false" ? "Usuário não está autenticado, solicitação cancelada" : "Usuário com sessão validada, solicitação liberada"
    obj.acao_criada_em = new Date().getTime();
    obj.acao_atualizada_em = new Date().getTime();

    await saveLog(obj);
    
    // VERIFICA SE O USUARIO ESTA DESLOGADO
    if (cookieData["hash_mail_pass"] == "false") {

        res.status(403).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_FAIL,
            "mensagem": "Você não está autenticado, realize o login e tente novamente",
            "auth": cookieData,
            "data_base": ""
        });
        return false;

    }

    next();

});

module.exports = router;