/*
CRIADO: JEAN CLEIDSON PEREIRA RODRIGUES
MATRICULA: 202202257141
EMAIL: jeantng2016@gmail.com  
*/

const express = require("express"); // EXTRAI O MODULO DO EXPRESS
var router = express.Router(); // EXTRAR O MODULO DE ROTAS
const commands = require('../../../middleware/mongoDb/command/commands'); // EXTRAR OS COMANDOS NO MONGODB
require('dotenv').config(); // SOLICITA AS VARIAVEIS DE AMBIENTE

// *************** POST ***************
// Controla todas entrada de movimentacao no trello card [ EM ANDAMENTO ]
router.post("/api/trello/card/update", async (req, res) => {

    // VERIFICA SE O BORY CHEGOU VAZIO
    if (Object.keys(req.body).length === 0) {

        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_SUCCESS_FAIL,
            "mensagem":"O objeto recebido pela Trello esta incompleto ou invalido, revise-os e verifique o webhook novamente",
            "data_base": ""
        });
        return true;

    }

    const shell_commands = new commands(); // CRIA UM CONSTRUTOR
    const createTrelloRegister = await shell_commands.commandCreateData('books', 'card_status', req.body); // INICIAR A FUNÇÃO EXPORTADA

    res.status(200).json({
        "codigo": process.env.CODE_SUCCESS,
        "resposta": process.env.MSG_SUCCESS,
        "mensagem":"Comando recebido com sucesso e salvo no banco de dados",
        "data_base": createTrelloRegister
    });

});

// *************** ALL ***************
// Mensagem de erro personalizada para rotas nao existemte apartir de /trello
router.all("/api/trello/card/update*", async (req, res) => {

    res.status(404).json({
        "codigo": process.env.CODE_FAIL,
        "resposta": process.env.MSG_SUCCESS_FAIL,
        "mensagem":"O linkk expirou ou nao existe, experimente acessar a documentacao da API em htpp://localhost:57603/doc/trello",
        "data_base": ""
    });

});

module.exports = router;