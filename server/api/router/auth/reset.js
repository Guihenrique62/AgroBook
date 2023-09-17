/*
CRIADO: JEAN CLEIDSON PEREIRA RODRIGUES
MATRICULA: 202202257141
EMAIL: jeantng2016@gmail.com  
*/

const express = require("express"); // EXTRAI O MODULO DO EXPRESS
var router = express.Router(); // EXTRAI O MODULO DE ROTAS
const bcrypt = require("bcryptjs"); // EXTRAI O MODULO PARA CRIPTOGRAFAR
const jwt = require("jsonwebtoken"); // EXTRAI O MODULO JSON WEB TOKEN PARA CRIPTOGRAFAR SESSÃO
const md5 = require('md5'); // EXTRAI O MODULO MD5 PARA CRIPTOGRAFAR SENHA
const session = require('express-session'); // EXTRAI MODULO PARA CONTROLAR SESSÕES NO EXPRESS
const check_user = require('../../middleware/jwt/jwt'); // EXTRAIR FUNÇÕES PARA MANIPULAR O JWT
const command = require('../../middleware/mongoDb/command/commands'); // EXTRAI OS COMANDOS NO MONGO DB
const { validate } = require("email-validator"); // EXTRAI BIBLIOTECA PARA VÁLIDAR EMAIL
require('dotenv').config(); // SOLICITA AS VARIÁVEIS DE AMBIENTE

// *************** ALL ***************
// Mensagem de erro personalizada para rotas não existente apartir de /password
router.all("/auth/resete/password*", async (req, res) => {

    res.status(404).json({
        "codigo": process.env.CODE_FAIL,
        "resposta": process.env.MSG_SUCCESS_FAIL,
        "mensagem": `O link expirou ou não existe, experimente acessar a documentação da API em ${process.env.HOST_API_DOC}/doc/singin`,
        "data_base": ""
    });

});