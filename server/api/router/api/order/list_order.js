/*
CRIADO: JEAN CLEIDSON PEREIRA RODRIGUES
MATRICULA: 202202257141
EMAIL: jeantng2016@gmail.com  
*/

const express = require("express"); // EXTRAI O MODULO DO EXPRESS
var router = express.Router(); // EXTRAI O MODULO DE ROTAS
const commands = require('../../../middleware/mongoDb/command/commands'); // EXTRAI OS COMANDOS NO MONGODB
require('dotenv').config(); // SOLICÍTA AS VARIÁVEIS DE AMBIENTE

// *************** POST ***************
// Controla todas as rotas de listar pedidos
router.post("/api/order/list_order", async (req, res) => {

    var { collections, filter, sort, limit } = req.body; // RESERVA TODAS AS VARIÁVEIS RECEBIDAS

    // VERIFICA VALORES RECEBIDOS
    if (collections && filter && sort && limit) {

        let listLookup = []; // RESERVA LISTA DE JOIN RECEBIDA DA API VIA [ collections ]

        // const shell_commands = new commands(); // CRIA UM CONSTRUTOR
        // const listOrderAgregate = await shell_commands.commandreadDataByIdAgregation('books', collections, filter, sort, limit); // EXCULTA FUNÇÃO EXPORTADA QUE AGREGA REGISTROS DO DB

        // console.log(collections, filter, sort, limit)
        for (row in collections) {
            console.log(collections[row])
        }

        // PASSOU NA VARREDURA
        res.status(200).json({
            "codigo": process.env.CODE_SUCCESS,
            "resposta": process.env.MSG_SUCCESS,
            "mensagem": "Lista de registros recuperada com sucesso",
            "data_base": "listOrderAgregate"
        });
        return true;

    } else {

        // REPROVOU NA VARREDURA
        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_FAIL,
            "mensagem": "Os dados informados não segue o padrão do sistema, revise-os e tente novamente",
            "data_base": ""
        });
        return true;

    }

});

// *************** ALL ***************
// Mensagem de erro personalizada para rotas não existente apartir de /create_user
router.all("/api/user/list_user*", async (req, res) => {

    res.status(404).json({
        "codigo": process.env.CODE_FAIL,
        "resposta": process.env.MSG_SUCCESS_FAIL,
        "mensagem": "O link expirou ou não existe, experimente acessar a documentação da API em htpp://localhost:57603/doc/create_user",
        "data_base": ""
    });

});

module.exports = router;