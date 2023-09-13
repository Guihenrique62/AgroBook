S/*
CRIADO: JEAN CLEIDSON PEREIRA RODRIGUES
MATRICULA: 202202257141
EMAIL: jeantng2016@gmail.com  
*/

const express = require("express"); // EXTRAI O MODULO DO EXPRESS
<<<<<<< HEAD:server/api/router/user/read_user.js
var router = express.Router(); // EXTRAI O MODULO DE ROTAS
const commands = require('../../middleware/mongoDb/command/commands'); // EXTRAI OS COMANDOS NO MONGODB
require('dotenv').config(); // SOLICÍTA AS VARIÁVEIS DE AMBIENTE

// *************** GET ***************
// Controla todas as rotas de listagem e login de usuário
router.get("/api/user/list_user", async (req, res) => {

    // VERIFICA SE O BODY ESTÁ VAZIO
=======
var router = express.Router(); // EXTRAR O MODULO DE ROTAS
const commands = require('../../../middleware/mongoDb/command/commands'); // EXTRAR OS COMANDOS NO MONGODB
require('dotenv').config(); // SOLICITA AS VARIAVEIS DE AMBIENTE

// *************** POST ***************
// Controla todas entrada de movimentacao no trello card [ EM ANDAMENTO ]
router.post("/api/trello/card/update", async (req, res) => {

    // VERIFICA SE O BORY CHEGOU VAZIO
>>>>>>> 568cf1f05a8692e25930fa70cd93243713c37c6c:server/api/router/api/trello/card_update.js
    if (Object.keys(req.body).length === 0) {

        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_SUCCESS_FAIL,
<<<<<<< HEAD:server/api/router/user/read_user.js
            "mensagem":"Nenhum valor foi recebido pelo BODY, revise sua solicitação e tente novamente",
=======
            "mensagem":"O objeto recebido pela Trello esta incompleto ou invalido, revise-os e verifique o webhook novamente",
>>>>>>> 568cf1f05a8692e25930fa70cd93243713c37c6c:server/api/router/api/trello/card_update.js
            "data_base": ""
        });
        return true;

    }

    const shell_commands = new commands(); // CRIA UM CONSTRUTOR
<<<<<<< HEAD:server/api/router/user/read_user.js
    const listUser = await shell_commands.commandReadData(`books`, `usuarios`, filter, sort, limit); // EXECULTA A FUNÇÃO QUE LER REGISTRO NO BANCO DE DADOS 
=======
    const createTrelloRegister = await shell_commands.commandCreateData('books', 'card_status', req.body); // INICIAR A FUNÇÃO EXPORTADA
>>>>>>> 568cf1f05a8692e25930fa70cd93243713c37c6c:server/api/router/api/trello/card_update.js

    res.status(200).json({
        "codigo": process.env.CODE_SUCCESS,
        "resposta": process.env.MSG_SUCCESS,
<<<<<<< HEAD:server/api/router/user/read_user.js
        "mensagem":"Lista de usuários recuperada com sucesso",
        "data_base": listUser
=======
        "mensagem":"Comando recebido com sucesso e salvo no banco de dados",
        "data_base": createTrelloRegister
>>>>>>> 568cf1f05a8692e25930fa70cd93243713c37c6c:server/api/router/api/trello/card_update.js
    });

});

// *************** ALL ***************
<<<<<<< HEAD:server/api/router/user/read_user.js
// Mensagem de erro personalizada para rotas não existente apartir de /list_user
router.all("/api/user/list_user*", async (req, res) => {
=======
// Mensagem de erro personalizada para rotas nao existemte apartir de /trello
router.all("/api/trello/card/update*", async (req, res) => {
>>>>>>> 568cf1f05a8692e25930fa70cd93243713c37c6c:server/api/router/api/trello/card_update.js

    res.status(404).json({
        "codigo": process.env.CODE_FAIL,
        "resposta": process.env.MSG_SUCCESS_FAIL,
<<<<<<< HEAD:server/api/router/user/read_user.js
        "mensagem":"O link expirou ou não existe, experimente acessar a documentação da API em htpp://localhost:57603/doc/list_user",
=======
        "mensagem":"O linkk expirou ou nao existe, experimente acessar a documentacao da API em htpp://localhost:57603/doc/trello",
>>>>>>> 568cf1f05a8692e25930fa70cd93243713c37c6c:server/api/router/api/trello/card_update.js
        "data_base": ""
    });

});

module.exports = router;