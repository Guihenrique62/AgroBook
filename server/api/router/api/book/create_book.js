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
// Controla todas as rotas de criação de usuario
router.post("/api/book/create_book", async (req, res) => {

    var { titulo, capa, sinopse, qtdPaginas, categorias, autor, datLancamento, qtdEstoque } = req.body; // RESERVA TODAS AS VARIAVIS RECEBIDAS

    // VERIFICA VALORES RECEBIDOS
    if (
        titulo // VERIFICA SE O TITULO NAO ESTÁ VAZIO
        && sinopse // VERIFICA SE A SINOPSE NAO ESTA VAZIO
       ) {

        const query = { // CRIA O OBJETO
            "titulo": titulo,
            "capa": capa,
            "sinopse": sinopse,
            "qtdPaginas": qtdPaginas,
            "categorias": categorias,
            "autor": autor,
            "datLancamento": datLancamento,
            "qtdEstoque": qtdEstoque
        }
        const shell_commands = new commands(); // CRIA UM CONSTRUTOR
        const createBook = await shell_commands.commandCreateData('books', 'livros', query); // INICIAR A FUNÇÃO EXPORTADA

        // VERIFICA SE EXITES VALORES DUPLICADOS
        if (createBook.keyValue) {

            // PASSOU NA VARREDURA MAIS ENCONTROU ERRRO [ CHAVES DUPLICADAS ]
            res.status(401).json({
                "codigo": process.env.CODE_FAIL,
                "resposta": process.env.MSG_SUCCESS_FAIL,
                "mensagem": "Livro ja existente no sistema",
                "data_base": createBook
            });
            return true;

        } else {

            // PASSOU NA VARREDURA
            res.status(200).json({
                "codigo": process.env.CODE_SUCCESS,
                "resposta": process.env.MSG_SUCCESS,
                "mensagem": "Livro criado com sucesso",
                "data_base": createBook
            });
            return true;

        }
    } else {

        // REPROVOU NA VARREDURA
        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_FAIL,
            "mensagem": "Os dados informados nao segue o padrao do sistema, revise-os e tente novamente",
            "data_base": ""
        });
        return true;

    }

});

// *************** ALL ***************
// Mensagem de erro personalizada para rotas nao existemte apartir de /create_book
router.all("/api/user/create_book*", async (req, res) => {

    res.status(404).json({
        "codigo": process.env.CODE_FAIL,
        "resposta": process.env.MSG_SUCCESS_FAIL,
        "mensagem": `O linkk expirou ou não existe, experimente acessar a documentacao da API em ${process.env.HOST_API_DOC}/doc/create_user`,
        "data_base": ""
    });

});

module.exports = router;