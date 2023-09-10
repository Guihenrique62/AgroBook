/*
CRIADO: JEAN CLEIDSON PEREIRA RODRIGUES
MATRICULA: 202202257141
EMAIL: jeantng2016@gmail.com  
*/

const express = require("express"); // EXTRAI O MODULO DO EXPRESS
var router = express.Router(); // EXTRAR O MODULO DE ROTAS
require('dotenv').config(); // SOLICITA AS VARIAVEIS DE AMBIENTE

// *************** GET ***************
// Controla todas as rotas de listagem e login de usuario
router.get("/api/user/list_user", async (req, res) => {

    res.status(200).json({
        "codigo": process.env.CODE_SUCCESS,
        "resposta": process.env.MSG_SUCCESS,
        "mensagem":"Boas-vindas!",
        "data_base": ""
    });

});

// *************** ALL ***************
// Mensagem de erro personalizada para rotas nao existemte apartir de /list_user
router.all("/api/user/list_user*", async (req, res) => {

    res.status(404).json({
        "codigo": process.env.CODE_FAIL,
        "resposta": process.env.MSG_SUCCESS_FAIL,
        "mensagem":"O linkk expirou ou nao existe, experimente acessar a documentacao da API em htpp://localhost:57603/doc/list_user",
        "data_base": ""
    });

});

module.exports = router;