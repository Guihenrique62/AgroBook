const express = require("express"); // EXTRAI O MODULO DO EXPRESS
var router = express.Router(); // EXTRAR O MODULO DE ROTAS
const md5 = require('md5'); // EXTRAR O MODULO MD5 PARA CRIPTOGRAFAR SENHA
const commands = require('../../middleware/mongoDb/command/commands'); // EXTRAR OS COMANDOS NO MONGODB
const { cpf, cnpj } = require('cpf-cnpj-validator'); // EXTRAI BIBLIOTECA PARA VALIDAR DOCUMENTO
const { validate } = require("email-validator"); // EXTRAI BIBLIOTECA PARA VALIDAR EMAIL
require('dotenv').config(); // SOLICITA AS VARIAVEIS DE AMBIENTE

// *************** POST ***************
// Controla todas as rotas de criação de usuario
router.post("/api/user/create_user", async (req, res) => {

    var { nome, documento, email, senha, cargo, status } = req.body; // RESERVA TODAS AS VARIAVIS RECEBIDAS

    // VERIFICA SE O DOCUMENTO NÃO ESTÁ VAZIO
    if (!documento) {
        documento = "00000000000";
    }

    const validDocument = JSON.stringify(documento).length >= 11 ? cpf.isValid(JSON.stringify(documento)) : cnpj.isValid(JSON.stringify(documento)); // VERIFICA SE O VALOR NA ENTRADA [ DOCUMENTO ] É VÁLIDO
    const validEmail = validate(email); // VALIDA A ENTRADA DE ENMAIL USANDO BIBLIOTECA EXTERNA

    // VERIFICA SE O DOCUMENTO E INVALIDO
    if (!validDocument) {
        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_SUCCESS_FAIL,
            "mensagem":"O documento informado e invalido",
            "data_base": ""
        });
        return true;
    }

    // VERIFICA SE O EMAIL E INVALIDO
    if (!validEmail) {
        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_SUCCESS_FAIL,
            "mensagem":"O e-mail informado e invalido",
            "data_base": ""
        });
        return true;
    }

    // VERIFICA VALORES RECEBIDOS
    if (
        nome // VERIFICA SE O NOME NAO ESTÁ VAZIO
        && ( BigInt(documento) && (BigInt(documento)).toString().length >= BigInt(process.env.DOCUMENT_MIN) ) // VERIFICA SE O DOCUMENTO E INTEIRO E MAIOR QUE 10
        && email // VERIFICA SE O EMAIL NAO ESTA VAZIO
        && ( senha && senha.toString().length >= BigInt(process.env.PWD_MIN ) ) /* VERIFICA SE A SENHA NÃO ESTA VAZIA E SE E MAIOR QUE 8 */ ) {
            
            const query = { // CRIA O OBJETO
                "nome": nome,
                "documento": documento,
                "email": email,
                "senha": md5(process.env.PWD_PREFIX + senha), // CONVERTE EM MD5 COM O PREFIXO QUE ESTA NO .ENV
                "cargo": cargo,
                "status": status,
            }
            const shell_commands = new commands(); // CRIA UM CONSTRUTOR
            const createUser = await shell_commands.commandCreateData('books', 'usuarios', query); // INICIAR A FUNÇÃO EXPORTADA

            // VERIFICA SE EXITES VALORES DUPLICADOS
            if (createUser.keyValue) {

                // PASSOU NA VARREDURA MAIS ENCONTROU ERRRO [ CHAVES DUPLICADAS ]
                res.status(401).json({
                    "codigo": process.env.CODE_FAIL,
                    "resposta": process.env.MSG_SUCCESS_FAIL,
                    "mensagem":"Usuario ja existe, experimente redefinir a senha ou inserir outro usuario",
                    "data_base": createUser
                });
                return true;

            } else {

                // PASSOU NA VARREDURA
                res.status(200).json({
                    "codigo": process.env.CODE_SUCCESS,
                    "resposta": process.env.MSG_SUCCESS,
                    "mensagem":"Usuario criado com sucesso",
                    "data_base": createUser
                });
                return true;

            }
    } else {
        
        // REPROVOU NA VARREDURA
        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_FAIL,
            "mensagem":"Os dados informados nao segue o padrao do sistem, revise-os e tente novamente",
            "data_base": ""
        });
        return true;

    }

});

module.exports = router;