/*
CRIADO: JEAN CLEIDSON PEREIRA RODRIGUES
MATRICULA: 202202257141
EMAIL: jeantng2016@gmail.com  
*/

const express = require("express"); // EXTRAI O MODULO DO EXPRESS
var router = express.Router(); // EXTRAR O MODULO DE ROTAS
const commands = require('../../middleware/mongoDb/command/commands'); // EXTRAR OS COMANDOS NO MONGODB
require('dotenv').config(); // SOLICITA AS VARIAVEIS DE AMBIENTE

// *************** DELETE ***************
// Controla todas as entrada de apagar usuario
router.delete("/api/user/delete_user*", async (req, res) => {

    const { filter } = req.body;

    // VERIFICA SE A VARIAVEL [ filter ] NÃO ESTÁ VAZIA
    if (!filter || Object.keys(filter).length === 0 || typeof (filter) !== `object`) {
        
        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_SUCCESS_FAIL,
            "mensagem": `O campo [ filter ] não respeita uma ou mais regras de entrada, revise os dados e tente novamente`,
            "data_base": ""
        });
        return true;

    }

    res.status(200).json({
        "codigo": process.env.CODE_SUCCESS,
        "resposta": process.env.MSG_SUCCESS,
        "mensagem": `Olá mundo!!`,
        "data_base": ""
    });

});

// *************** ALL ***************
// Mensagem de erro personalizada para rotas não existemte apartir de /delete_user
router.all("/api/user/delete_user*", async (req, res) => {

    res.status(404).json({
        "codigo": process.env.CODE_FAIL,
        "resposta": process.env.MSG_SUCCESS_FAIL,
        "mensagem": `O linkk expirou ou não existe, experimente acessar a documentacao da API em ${process.env.HOST_API_DOC}/doc/delete_user`,
        "data_base": ""
    });

});

module.exports = router;