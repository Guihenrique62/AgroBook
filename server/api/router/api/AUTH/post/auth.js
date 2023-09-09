const express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const md5 = require('md5');
const check_user = require('../../../../middleware/jwt/jwt');
require('dotenv').config()

// *************** POST ***************
router.post("/api/post/controller/auth", async (req, res) => {

    res.send("ok").sendStatus(200);

});

module.exports = router;