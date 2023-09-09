const mainAppUse = require('./config/express');
const app = new mainAppUse;
const fs = require('fs');
const https = require('https');

/* ROUTER AUTH - Controla todas as entradas */
var ROUTER_AUTH = require('./router/auth');
app.use(ROUTER_AUTH);

/* ROUTER CREATE USER - Controla todas as entradas de criação de usuario */
var ROUTER_CREATE_USER = require('./router/user/create_user');
app.use(ROUTER_CREATE_USER);
