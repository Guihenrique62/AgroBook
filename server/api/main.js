const mainAppUse = require('./config/express');
const app = new mainAppUse;
const fs = require('fs');
const https = require('https');

/* ROUTER DEFAULT [GET - GET] */
var ROUTER_DEFAULT_GET = require('./router/api/DEFAULT/get');
app.use(ROUTER_DEFAULT_GET);

/* ROUTER AUTH [POST - AUTH] */
var ROUTER_AUTH = require('./router/api/AUTH/post/auth');
app.use(ROUTER_AUTH);

/* ROUTER CONTROLLER [POST - MUDAR] */
var ROUTER_CONTROLLER_POST_MUDAR = require('./router/api/CONTROLLER/post/mudar');
app.use(ROUTER_CONTROLLER_POST_MUDAR);