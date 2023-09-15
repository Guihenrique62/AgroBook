var express = require('express');
var compression = require('compression');
const https = require("https");
const http = require("http");
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const md5 = require('md5');
const multer = require('multer');
const cors = require('cors');
const Server = require('socket.io')

module.exports = function () {

    var app = express();
    var portApp = 57601;
    var portAppHttp = 57602;
    var corsOptions = {
        origin: [

            "http://localhost:8080",
            "http://localhost:57601",
            "http://localhost:57602",
            "http://localhost:5173",
            "http://20.226.73.46:8080",
            "http://20.226.73.46:57601",
            "http://20.226.73.46:57602",
            "http://20.226.73.46:5173"

        ],
        exposedHeaders: ["set-cookie"],
        credentials: true,
        optionsSuccessStatus: 200
    }

    /* CONFIG */
    app.set('port', portApp);
    app.disable('x-powered-by');
    app.use(bodyParser.json({
        limit: '1mb'
    }));
    app.use(bodyParser.urlencoded({
        extended: true, limit: '1mb'
    }));
    app.use(express.static('public'));
    app.use(express.static('files'));
    app.use(cookieParser());
    app.use(cookieSession({
        name: 'uia_wwtk',
        keys: [
            '$2b$10$j9LZO0sc1UXUxfd9j6ivu',
            '$2b$10$sMUZ4--hQEM0OWYoi6oONDJmJsA'
        ],
        maxAge: 1 * 60 * 60 * 1000 // 24 hours
    }));
    app.use(compression({
        level: 9,
    }));
    app.use(cors(corsOptions));

    // Carrega o certificado e a key necessários para a configuração.
    const options = {
        key: fs.readFileSync("https/certificate.key"),
        cert: fs.readFileSync("https/certificate.crt")
    };

    // Cria a instância do server e escuta na porta 3000
    http.createServer(options, app).listen(portApp);
    https.createServer(options, app).listen(portAppHttp);

    console.log(`Serve1 run in port ${portApp}`);
    console.log(`Serve2 run in port ${portAppHttp}`);

    return app;

};