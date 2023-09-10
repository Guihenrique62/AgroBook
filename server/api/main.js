const mainAppUse = require('./config/express');
const app = new mainAppUse;
const https = require('https');

/************* AGROBOOK *************/
/* ROUTER AUTH - Controla todas as entradas */
var ROUTER_AUTH = require('./router/auth');
app.use(ROUTER_AUTH);

/* ROUTER CREATE USER - Controla todas as entradas de criação de usuario */
var ROUTER_CREATE_USER = require('./router/user/create_user');
app.use(ROUTER_CREATE_USER);

/* ROUTER READ USER - Controla todas as entradas de listagem e login de usuario */
var ROUTER_READ_USER = require('./router/user/read_user');
app.use(ROUTER_READ_USER);

/************* TRELLO *************/
/* ROUTER TRELLO CARD UPDATE - Controla todas as entradas de alteracao no trello */
var ROUTER_TRELLO_CARD_UPDATE = require('./router/trello/card_update');
app.use(ROUTER_TRELLO_CARD_UPDATE);