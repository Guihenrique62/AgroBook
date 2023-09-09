const express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const md5 = require('md5');
require('dotenv').config()

// *************** GET ***************
router.get("/api/get/default", async (req, res) => {

    res.send("ok").sendStatus(200);

});

module.exports = router;