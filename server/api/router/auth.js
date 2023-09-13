const express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const check_user = require("../middleware/jwt/jwt");
const commands = require("../middleware/mongoDb/command/commands");
require("dotenv").config();

const a = new commands();
const b = a.commandCreateData();

// *************** GET ***************
// Controla todas as entradas global no metodo GET
// router.get("/*", async (req, res) => {
//     res.send({
//         status: "ok",
//         router: "global",
//     });
// });

// *************** GET ***************
// Controla todas as entrada de api no metodo GET
// a.router.get("/api/*", async (req, res) => {
//     res.send({
//         status: "ok",
//         router: "api",
//     });
// });
router.get("/", async (req, res, next) => {
    res.status(200).send({
        testando: [
            {
                id: 1,
                nome: "ihury",
                idade: 31,
                descript: "Teste Concluido.",
                stats: true,
            },
        ],
    });
    next();
});

router.get("/testx", async (req, res) => {
    res.status(200).json({ stats: "Ativado", title: "Api Ativado" });
});

module.exports = router;
