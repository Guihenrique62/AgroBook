/*
CRIADO: GUILHERME HENRIQUE PORTO DOS SANTOS
MATRICULA: 202204463091
EMAIL: guilhermeportosantos1@gmail.com
*/

const express = require("express"); // EXTRAI O MODULO DO EXPRESS
var router = express.Router(); // EXTRAR O MODULO DE ROTAS
const commands = require('../../../middleware/mongoDb/command/commands'); // EXTRAR OS COMANDOS NO MONGODB
require('dotenv').config(); // SOLICITA AS VARIAVEIS DE AMBIENTE

// *************** POST ***************
// Controla todas as rotas de listagem e login de livros
router.post("/api/book/update_book", async (req, res) => {

    const { filter, newValue } = req.body; // RESERVA VALORES DO BODY

    // VERIFICA SE A VARIAVEL FILTER ESTÁ VAZIA
    if (!filter || Object.keys(filter).length === 0 || typeof (filter) !== `object`) {

        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_SUCCESS_FAIL,
            "mensagem": "O campo [ filter ] não respeita uma ou mais regras de entrada, revise os dados e tente novamente",
            "data_base": ""
        });
        return true;

    }

    // VERIFICA SE O NOVO VALOR ESTÁ VAZIO
    if (!newValue || Object.keys(newValue).length === 0 || typeof (newValue) !== `object`) {

        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_SUCCESS_FAIL,
            "mensagem": "O campo [ newValue ] não respeita uma ou mais regras de entrada, revise os dados e tente novamente",
            "data_base": ""
        });
        return true;

    }

    // VERIFICA SE FOI SOLICITADO A ALTERACAO DO ID
    if (newValue["_id"] || newValue["id"]) {

        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_SUCCESS_FAIL,
            "mensagem": "O campo do tipo _id ou id não pode ser alterado, revise os dados e tente novamente",
            "data_base": ""
        });
        return true;

    }


    const shell_commands = new commands(); // CRIA O CONSTRUTOR
    const updateBook = await shell_commands.commandUpadateData('books', 'livros', filter, newValue); // INICIAR A FUNCAO ATUALIZAR REGISTRO NO MONGO DB

    // VERIFICA EXISTE VALORES DUPLICADOS
    if (updateBook["keyValue"]) {

        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_SUCCESS_FAIL,
            "mensagem": "Nenhum registro foi alterado, revise os dados e tente novamente",
            "data_base": updateBook
        });
        return false;

    }

    // VERIFICA SE NÃO FOI FEITA NENHUMA ALTERAÇÃO
    if (!updateBook["result"]["modifiedCount"]) {

        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_SUCCESS_FAIL,
            "mensagem": "Nenhum registro foi alterado, verifique os valores informado e tente novamente",
            "data_base": updateBook
        });
        return false;

    }

    res.status(200).json({
        "codigo": process.env.CODE_SUCCESS,
        "resposta": process.env.MSG_SUCCESS,
        "mensagem": "Registro atualizado com sucesso",
        "data_base": updateBook
    });

});

// *************** ALL ***************
// Mensagem de erro personalizada para rotas não existemte apartir de /update_user
router.all("/api/user/update_book*", async (req, res) => {

    res.status(404).json({
        "codigo": process.env.CODE_FAIL,
        "resposta": process.env.MSG_SUCCESS_FAIL,
        "mensagem": `O linkk expirou ou não existe, experimente acessar a documentacao da API em ${process.env.HOST_API_DOC}/doc/update_user`,
        "data_base": ""
    });

});

module.exports = router;