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
const check_user = require('../../middleware/jwt/jwt'); // EXTRAIR FUNÇOES PARA MANIPULAR O JWT
const command = require('../../middleware/mongoDb/command/commands'); // EXTRAR OS COMANDOS NO MONGODB

require('dotenv').config(); // SOLICITA AS VARIAVEIS DE AMBIENTE
// *************** GET ***************
// Controla todas as entradas da autenticação
router.get("/auth/singin", async (req, res) => {

    res.send({
        "status": "ok",
        "router": "global"
    });

});

// *************** ALL ***************
// Mensagem de erro personalizada para rotas nao existemte apartir de /singin
router.all("/auth/singin*", async (req, res) => {

    res.status(404).json({
        "codigo": process.env.CODE_FAIL,
        "resposta": process.env.MSG_SUCCESS_FAIL,
        "mensagem": `O linkk expirou ou não existe, experimente acessar a documentacao da API em ${process.env.HOST_API_DOC}/doc/create_user`,
        "data_base": ""
    });

});

module.exports = router;

// // COLETA O EMAIL E SENHA DO USUARIO
// const { user, password } = req.body;
// const saltRounds = 10;
// const newPassword = md5(password);

// // VERIFICA SE O LOGIN EXISTE
// const queryvalidar_user_db = new validar_user_db().query;
// const valueQuery = await queryvalidar_user_db({
//     "where_values": user,
//     "and_values": newPassword
// }).then((res) => {
//     return res
// });

// // TOTAL DE REGISTROS
// var rowQuery = (valueQuery[0]["result"]["recordsets"][0]).length;
// var rowQueryValue = (valueQuery[0]["result"]["recordsets"][0]);

// // DADOS DO LOGIN
// var dataRowQuery = valueQuery[0]["result"]["recordsets"];

// // VERIFICA SE EXISTE ALGUMA CORRESPONDENCIA
// if (rowQuery > 0) {
//     // CRIPTOGRAFA O EMAIL E SENHA
//     bcrypt.hash(user + '+' + password, saltRounds).then(function (hash) {
//         bcrypt.compare(user + '+' + password, hash).then(function (result) {

//             // SALVA NOS COKIES O HASH
//             if (result) {
//                 var token = jwt.sign(
//                     {
//                         "hash_mail_pass": hash,
//                         "login": user,
//                         "email": rowQueryValue[0]['usr_email'],
//                         "id": rowQueryValue[0]['usr_id'],
//                         "office": rowQueryValue[0]['usr_cargo'],
//                         "registration_id": rowQueryValue[0]['usr_matricula'],
//                         "active": rowQueryValue[0]['usr_ativo'],
//                         "company_id": rowQueryValue[0]['usr_empresa'],
//                         "goal": rowQueryValue[0]['usr_meta'],
//                         "reset_pw": rowQueryValue[0]['usr_reset_senha'],
//                         "name": rowQueryValue[0]['usr_nome'],
//                         "team_id": rowQueryValue[0]['usr_equipe'],
//                     },
//                     process.env.SECRET_JWT,
//                     {
//                         expiresIn: !JSON.parse(process.env.EXPIRATE_PROFILE)[0][dataRowQuery[0][0]["usr_cargo"]] ? "300s" : JSON.parse(process.env.EXPIRATE_PROFILE)[0][dataRowQuery[0][0]["usr_cargo"]],
//                     }
//                 );
//                 req.session.HASH_MAIL_PASS = token;
//             }

//             res.send([
//                 {
//                     "hash": hash,
//                     "checked": result,
//                     "expiresIn": JSON.parse(process.env.EXPIRATE_PROFILE)[0][dataRowQuery[0][0]["usr_cargo"]],
//                     "info": "saved in current session"
//                 }
//             ]);

//         });
//     });
// } else {
//     res.status(401).json([
//         {
//             "hash": "",
//             "checked": false,
//             "info": "no changes made"
//         }
//     ]);
// }