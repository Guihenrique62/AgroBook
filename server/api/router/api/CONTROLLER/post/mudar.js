const express = require("express");
var router = express.Router();
const check_user = require('../../../../middleware/jwt/jwt');
const { MongoClient } = require('mongodb');
const { writeFileSync, readFile, promises } = require('fs');
const { join } = require('path');
const moment = require('moment');
const twix = require('twix');
moment.locale('pt-br');
require('dotenv').config();

// VARIABLE LOCAL
const url = process.env.DB_CONECTION;

// GET DATA MONGODB
// const getData = async (db, collec, query, project) => {

//     try {
//         const client = new MongoClient(url);
//         const collection = client.db(db).collection(collec);
//         await client.connect();
//         const result = await collection.find(query).sort({ update_date: -1 }).limit(1).project(project).toArray();
//         await client.close();
//         return result;
//     } catch (x) {
//         return false;
//     }

// }

// *************** POST ***************
router.post("/api/post/controller/mudar", async (req, res) => {

    res.send("ok").sendStatus(200)

});

module.exports = router;