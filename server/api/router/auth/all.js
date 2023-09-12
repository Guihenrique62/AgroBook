/*
CRIADO: JEAN CLEIDSON PEREIRA RODRIGUES
MATRICULA: 202202257141
EMAIL: jeantng2016@gmail.com  
*/

const express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const md5 = require('md5');
const check_user = require('../../middleware/jwt/jwt');
const user = require('../../middleware/mongoDb/command/commands');
require('dotenv').config();

// *************** GET ***************
// Controla todas as entradas global no metodo GET
router.get("/", async (req, res) => {

    res.send({
        "status": "ok",
        "router": "global"
    });

});

// *************** GET ***************
// Controla todas as entrada de api no metodo GET
router.all("/api*", async (req, res, next) => {

    const check_data = new check_user();
    const result = await check_data.check(req);
    const cookieData = result[0]['validToken'];

    // VERIFICA SE O USUARIO ESTA DESLOGADO
    if (cookieData["hash_mail_pass"] == "false") {

        res.status(401).json({
            "codigo": process.env.CODE_FAIL,
            "resposta": process.env.MSG_FAIL,
            "mensagem": "O usuário não está autenticado, realize o login e tente novamente",
            "auth": cookieData,
            "data_base": ""
        });
        return false;

    }

    console.log(req.params);

    next();

});

module.exports = router;