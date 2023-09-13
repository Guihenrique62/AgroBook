<<<<<<< HEAD
const mainAppUse = require("./config/express");
const app = new mainAppUse();
const fs = require("fs");
const https = require("https");

/* ROUTER AUTH - Controla todas as entradas */
var ROUTER_AUTH = require("./router/auth");
app.use(ROUTER_AUTH);
=======
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

/* ROUTER AUTH SINGIN - Controla todas rotas de entradas de login */
var ROUTER_AUTH_SINGIN = require('./router/auth/singin');
app.use(ROUTER_AUTH_SINGIN);
/************* AUTH [ END ] *************/

/************* USER [ START ] *************/
/* ROUTER CREATE USER - Controla todas as entradas de criação de usuario */
var ROUTER_CREATE_USER = require('./router/api/user/create_user');
app.use(ROUTER_CREATE_USER);

/* ROUTER READ USER - Controla todas as entradas de listagem de usuarios */
var ROUTER_READ_USER = require('./router/api/user/read_user');
app.use(ROUTER_READ_USER);

/* ROUTER UPDATE USER - Controla todas as entradas de atualizacao de usuario */
var ROUTER_UPDATE_USER = require('./router/api/user/update_user');
app.use(ROUTER_UPDATE_USER);

/* ROUTER DELETE USER - Controla todas as ordem de apagar usuario */
var ROUTER_DELETE_USER = require('./router/api/user/delete_user');
app.use(ROUTER_DELETE_USER);
/************* USER [ END ] *************/

/************* BOOKS [ START ] *************/
/* ROUTER BOOKS CREATE - Controla todas as entradas de criação de livro */
var ROUTER_BOOKS_CREATE = require('./router/api/book/create_book');
app.use(ROUTER_BOOKS_CREATE);

/* ROUTER READ BOOK - Controla todas as entradas de listagem de livros */
var ROUTER_READ_BOOK = require('./router/api/book/read_book');
app.use(ROUTER_READ_BOOK);
/************* BOOKS [ END ] *************/

/************* TRELLO [ START ] *************/
/* ROUTER TRELLO CARD UPDATE - Controla todas as entradas de alteracao no trello */
var ROUTER_TRELLO_CARD_UPDATE = require('./router/api/trello/card_update');
app.use(ROUTER_TRELLO_CARD_UPDATE);
/************* TRELLO [ END ] *************/

/************* AGROBOOK [ END ] *************/
>>>>>>> 2409325eb13004cdd1fcaea3a4d6b9a66b817142
