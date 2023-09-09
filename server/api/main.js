const mainAppUse = require('./config/express');
const app = new mainAppUse;
const fs = require('fs');
const https = require('https');

/* ROUTER AUTH - Controla todas as entradas */
var ROUTER_AUTH = require('./router/auth');
app.use(ROUTER_AUTH);