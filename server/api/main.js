/*
CRIADO: JEAN CLEIDSON PEREIRA RODRIGUES
MATRICULA: 202202257141
EMAIL: jeantng2016@gmail.com  
*/

const mainAppUse = require('./config/express');
const app = new mainAppUse;
const https = require('https');

/************* AGROBOOK [ START ] *************/

/************* AUTH [ START ] *************/
/* ROUTER AUTH - Controla todas rotas de entradas */
var ROUTER_AUTH_ALL = require('./router/auth/all');
app.use(ROUTER_AUTH_ALL);
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

/* ROUTER DELETE USER - Controla todas as ordem de apagar usuario */
var ROUTER_DELETE_USER = require('./router/user/delete_user');
app.use(ROUTER_DELETE_USER);
/************* USER [ END ] *************/

/************* TRELLO [ START ] *************/
/* ROUTER TRELLO CARD UPDATE - Controla todas as entradas de alteracao no trello */
var ROUTER_TRELLO_CARD_UPDATE = require('./router/trello/card_update');
app.use(ROUTER_TRELLO_CARD_UPDATE);
/************* TRELLO [ END ] *************/

/************* AGROBOOK [ END ] *************/