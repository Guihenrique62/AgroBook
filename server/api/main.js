/*
CRIADO: JEAN CLEIDSON PEREIRA RODRIGUES
MATRICULA: 202202257141
EMAIL: jeantng2016@gmail.com  
*/

const mainAppUse = require('./config/express');
const app = new mainAppUse;
const https = require('https');

/************* AGROBOOK *************/

/************* AUTH [ START ] *************/
/* ROUTER AUTH - Controla todas as entradas */
var ROUTER_AUTH = require('./router/auth');
app.use(ROUTER_AUTH);
/************* AUTH [ END ] *************/

/************* USER [ START ] *************/
/* ROUTER CREATE USER - Controla todas as entradas de criação de usuario */
var ROUTER_CREATE_USER = require('./router/user/create_user');
app.use(ROUTER_CREATE_USER);

/* ROUTER READ USER - Controla todas as entradas de listagem de usuarios */
var ROUTER_READ_USER = require('./router/user/read_user');
app.use(ROUTER_READ_USER);

/* ROUTER UPDATE USER - Controla todas as entradas de atualizacao de usuario */
var ROUTER_UPDATE_USER = require('./router/user/update_user');
app.use(ROUTER_UPDATE_USER);
/************* USER [ END ] *************/

/************* TRELLO [ START ] *************/
/* ROUTER TRELLO CARD UPDATE - Controla todas as entradas de alteracao no trello */
var ROUTER_TRELLO_CARD_UPDATE = require('./router/trello/card_update');
app.use(ROUTER_TRELLO_CARD_UPDATE);
/************* TRELLO [ END ] *************/

/************* AGROBOOK [ END ] *************/