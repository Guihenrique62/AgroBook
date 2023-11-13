/*
CRIADO: GUILHERME HENRIQUE PORTO DOS SANTOS
MATRICULA: 202204463091
EMAIL: guilhermeportosantos1@gmail.com
*/

const express = require("express"); // EXTRAI O MODULO DO EXPRESS
var router = express.Router(); // EXTRAI O MODULO DE ROTAS
const commands = require('../../../middleware/mongoDb/command/commands'); // EXTRAI OS COMANDOS NO MONGODB
require('dotenv').config(); // SOLICÍTA AS VARIÁVEIS DE AMBIENTE


// *************** POST ***************
// Controla todas as rotas de criação de usuário
router.post("/api/order/create_order", async (req, res) => {

    var {livro,usuario,data_vencimento} = req.body; // RESERVA TODAS AS VARIÁVEIS RECEBIDAS
    const dateNow = new Date().getTime();
    // VERIFICA VALORES RECEBIDOS
    if ( livro && usuario) {
        
        const query = { // CRIA O OBJETO
            "livro": { "$oid": livro},
            "usuario": { "$oid": usuario },
            "status": 1,
            "data_aluguel": dateNow,
            "data_vencimento": data_vencimento,
            "entregou": 0,
            "recebeu": 0
        }
        const shell_commands = new commands(); // CRIA UM CONSTRUTOR
        const createorder = await shell_commands.commandCreateData('books', 'pedidos', query); // INICIA A FUNÇÃO EXPORTADA

        // VERIFICA SE EXITE VALORES DUPLICADOS
        if (createorder.keyValue) {

            // PASSOU NA VARREDURA MAIS ENCONTROU ERRO [ CHAVES DUPLICADAS ]
            res.status(401).json({
                "codigo": process.env.CODE_FAIL,
                "resposta": process.env.MSG_SUCCESS_FAIL,
                "mensagem": "Pedido já existe, experimente redefinir a senha ou inserir outro usuário",
                "data_base": createorder
            });
            return true;

        }

        // PASSOU NA VARREDURA
        res.status(200).json({
            "codigo": process.env.CODE_SUCCESS,
            "resposta": process.env.MSG_SUCCESS,
            "mensagem": "Pedido criado com sucesso",
            "data_base": createorder
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
router.all("/api/user/create_user*", async (req, res) => {

    res.status(404).json({
        "codigo": process.env.CODE_FAIL,
        "resposta": process.env.MSG_SUCCESS_FAIL,
        "mensagem": "O link expirou ou não existe, experimente acessar a documentação da API em htpp://localhost:57603/doc/create_user",
        "data_base": ""
    });

});

module.exports = router;