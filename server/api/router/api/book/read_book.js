/*
CRIADO: GUILHERME HENRIQUE PORTO DOS SANTOS
MATRICULA: 202204463091
EMAIL: guilhermeportosantos1@gmail.com  
*/

const express = require("express"); // EXTRAI O MODULO DO EXPRESS
var router = express.Router(); // EXTRAR O MODULO DE ROTAS
const commands = require('../../../middleware/mongoDb/command/commands'); // EXTRAR OS COMANDOS NO MONGODB
require('dotenv').config(); // SOLICITA AS VARIAVEIS DE AMBIENTE

// *************** GET ***************
// Controla todas as rotas de listagem e login de usuario
router.get("/api/book/list_book", async (req, res) => {

    const { filter, sort, limit } = req.body; // RECUPERA OS DADOS DO BODY

    // VERIFICA SE O [ filter ] ESTÁ VAZIO E SE RESPEITA TODAS AS REGRAS DE ENTRADA
    if (!filter || Object.keys(filter).length === 0 || typeof (filter) !== `object`) {

        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_SUCCESS_FAIL,
            "mensagem": "O campo [ filter ] não respeita uma ou mais regras de entrada, revise os dados e tente novamente",
            "data_base": ""
        });
        return true;

    }

    // VERIFICA SE O [ sort ] ESTÁ VAZIO E SE RESPEITA TODAS AS REGRAS DE ENTRADA
    if (!sort || Object.keys(sort).length === 0 || typeof (sort) !== `object`) {

        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_SUCCESS_FAIL,
            "mensagem": "O campo [ sort ] não respeita uma ou mais regras de entrada, revise os dados e tente novamente",
            "data_base": ""
        });
        return true;

    }

    // VERIFICA SE O [ limit ] ESTÁ VAZIO E SE RESPEITA TODAS AS REGRAS DE ENTRADA
    if (!limit || typeof (limit) == `string` || typeof (limit) == `object`) {

        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_SUCCESS_FAIL,
            "mensagem": "O campo [ limit ] não respeita uma ou mais regras de entrada, revise os dados e tente novamente",
            "data_base": ""
        });
        return true;

    }

    const shell_commands = new commands(); // CRIA UM CONSTRUTOR
    const listBook = await shell_commands.commandReadData(`books`, `livros`, filter, sort, limit); // EXECULTA A FUNCAO QUE LER REGISTRO NO BANCO DE DADOS 

    console.log(listBook["result"].length);

    // VERIFICA SE RECEBEU UM VALOR VAZIO
    if (!listBook["result"].length) {

        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_SUCCESS_FAIL,
            "mensagem": "Nenhum registro localizado, tente realizar uma nova consulta mudando os paramêtros",
            "data_base": listBook
        });
        return true;

    }

    res.status(200).json({
        "codigo": process.env.CODE_SUCCESS,
        "resposta": process.env.MSG_SUCCESS,
        "mensagem": "Lista de usuarios recuperada com sucesso",
        "data_base": listBook
    });

});

// *************** ALL ***************
// Mensagem de erro personalizada para rotas não existemte apartir de /list_user
router.all("/api/book/list_book*", async (req, res) => {

    res.status(404).json({
        "codigo": process.env.CODE_FAIL,
        "resposta": process.env.MSG_SUCCESS_FAIL,
        "mensagem": `O linkk expirou ou não existe, experimente acessar a documentacao da API em ${process.env.HOST_API_DOC}/doc/list_user`,
        "data_base": ""
    });

});

module.exports = router;