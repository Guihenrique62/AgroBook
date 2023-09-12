/*
CRIADO: JEAN CLEIDSON PEREIRA RODRIGUES
MATRICULA: 202202257141
EMAIL: jeantng2016@gmail.com  
*/

const express = require("express"); // EXTRAI O MODULO DO EXPRESS
var router = express.Router(); // EXTRAR O MODULO DE ROTAS
const bcrypt = require("bcryptjs"); // EXTRAR O MODULO PARA CRIPTOGRAFAR
const jwt = require("jsonwebtoken"); // EXTRAR O MODULO JSON WEB TOKEN PARA CRIPTOGRAFAR SESSÃO
const md5 = require('md5'); // EXTRAR O MODULO MD5 PARA CRIPTOGRAFAR SENHA
const session = require('express-session'); // EXTRAI MODULO PARA CONTROLAR SESSOES NO EXPRESS
const check_user = require('../../middleware/jwt/jwt'); // EXTRAIR FUNÇOES PARA MANIPULAR O JWT
const command = require('../../middleware/mongoDb/command/commands'); // EXTRAR OS COMANDOS NO MONGODB
const { validate } = require("email-validator"); // EXTRAI BIBLIOTECA PARA VALIDAR EMAIL
require('dotenv').config(); // SOLICITA AS VARIAVEIS DE AMBIENTE

// *************** DLC [ GERAR HASH ] ***************
// Essa arrow function recebe os dados do usuario e gerar um hash usando [ JWT + BCRYPT ] com validade de acordo com o perfil do usuario
const gerarHash = async (email, senha, user, req) => {

    const saltRounds = 10; // TOTAL DE NUMEROS PARA O HASH

    // CRIPTOGRAFA O EMAIL E SENHA
    return bcrypt.hash(email + '+' + senha, saltRounds).then(function (hash) {

        return bcrypt.compare(email + '+' + senha, hash).then(function (result) {

            // SALVA NOS COKIES O HASH
            if (result) {

                var token = jwt.sign({
                    "hash_mail_pass": hash,
                    "id": user["_id"],
                    "nome": user["nome"],
                    "documento": user["documento"],
                    "email": user["email"],
                    "cargo": user["cargo"],
                    "status": user["status"],
                },
                    process.env.SECRET_JWT,
                    {
                        expiresIn: "1h",
                    }
                );

                req.session.HASH_MAIL_PASS = token;
                return token;

            }

        });

    });

}

// *************** POST ***************
// Controla todas as entradas da autenticação
router.post("/auth/singin", async (req, res) => {

    const { email, senha } = req.body; // RECUPERA OS DADOS DO BODY
    const newPassword = md5(process.env.PWD_PREFIX + senha); // CONVERTE A SENHA PARA O FORMATO EM PREFIXO + MD5 

    const emailValidate = validate(email); // VALIDA SE O EMAIL E VALIDO OU NAO USANDO BIBLIOCA EXTERNA

    // VERIFICA SE O EMAIL RECEBIDO E INVALIDO
    if (!emailValidate) {

        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_SUCCESS_FAIL,
            "mensagem": "O email recebido nao e valido, verifique os dados e tente novamente",
            "data_base": ""
        });
        return true;

    }

    const filter = { // CRIA O FILTRO DA BUSCA
        "email": email,
        "senha": newPassword,
    };
    const sort = { // [ sort ] O MESMO QUE [ order by ] NO SQL
        "_id": -1
    };
    const limit = 1; // LIMITE DE RETORNO DA BUSCA O MESMO QUE [ top 1 ou limit 1 ] NO SQL
    const shell_commands = new command(); // CRIA UM CONSTRUTOR
    const readData = await shell_commands.commandReadData(`books`, `usuarios`, filter, sort, limit);

    // VERIFICA SE O EMAIL E SENHA ESTA INCORRETO
    if (readData["result"].length === 0) { // VERIFICA SE RECEBEU UM OBJETO VAZIO

        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_SUCCESS_FAIL,
            "mensagem": "Email ou senha incorreto, revise os dados e tente novamente",
            "data_base": readData
        });
        return true;

    }

    // VERIFICA SE O USUARIO ESTA COM STATUS [ 0 ]
    if (readData["result"][0]["status"] === 0) { // VERIFICA SE RECEBEU UM ATRIBUTO [ status ] COMO [ 0 ]

        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_SUCCESS_FAIL,
            "mensagem": "Esse usuario nao esta autorizado a relizar o login, contate seu administrador para liberar o acesso",
            "data_base": ""
        });
        return true;

    }

    const hash = await gerarHash(email, newPassword, readData["result"][0], req); // PASSA OS PARAMETROS PARA UMA ARROW FUCTION QUE GERAR UM HASH USANDO [ JWT + BCRYPT ]

    res.status(200).json({
        "codigo": process.env.CODE_SUCCESS,
        "resposta": process.env.MSG_SUCCESS,
        "mensagem": "Dados do usuario recuperado com sucesso",
        "data_base": readData,
        "hash": hash
    });

});

// *************** POST ***************
// Controla todas as entradas de validacao da autenticação
router.post("/auth/singin/valid", async (req, res) => {

    const check_data = new check_user();
    const result = await check_data.check(req);
    const cookieData = result[0]['validToken'];

    // VERIFICA SE O USUARIO ESTA DESLOGADO
    if (cookieData["hash_mail_pass"] == "false") {

        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_FAIL,
            "mensagem": "O usuario nao esta autenticado, realize o login e tente novamente",
            "auth": cookieData,
            "data_base": ""
        });
        return false;

    }

    res.status(200).json({
        "codigo": process.env.CODE_SUCCESS,
        "resposta": process.env.MSG_SUCCESS,
        "mensagem": "O usuario esta com a sessao valida",
        "auth": cookieData,
        "data_base": ""
    });

});

// *************** DELETE ***************
// Controla todas as entradas de exclusao da sessao
router.delete("/auth/singin/logout", async (req, res) => {

    req.session = null; // LIMPA SESSAO SALVA

    res.status(200).json({
        "codigo": process.env.CODE_SUCCESS,
        "resposta": process.env.MSG_SUCCESS,
        "mensagem": "A sessao foi desconectada com sucesso",
        "data_base": ""
    });

});

// *************** ALL ***************
// Mensagem de erro personalizada para rotas nao existemte apartir de /singin
router.all("/auth/singin*", async (req, res) => {

    res.status(404).json({
        "codigo": process.env.CODE_FAIL,
        "resposta": process.env.MSG_SUCCESS_FAIL,
        "mensagem": `O link expirou ou não existe, experimente acessar a documentacao da API em ${process.env.HOST_API_DOC}/doc/singin`,
        "data_base": ""
    });

});

module.exports = router;