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
router.get("/api/", async (req, res) => {

    res.send({
        "status": "ok",
        "router": "api"
    })

});

module.exports = router;