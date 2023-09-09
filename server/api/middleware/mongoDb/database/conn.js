const { MongoClient } = require('mongodb'); // SOLICTA A BIBLIOTECA DO MONGO DB
require('dotenv').config(); // SOLICITA VARIAVEIS DE AMBIENTE

// CONFIGURAÇÃO DA CONEXÃO
const createConnMongo = async (db) => {

    const url = process.env.DB_CONECTION; // DEFINE A URL DA CONEXAO QUE ESTA NO AQUIVO .ENV

    const client = new MongoClient(url); // CRIA UMA NOVA CONEXAO USANDO A URL

    return client; // RETORNA A CONEXAO PARA EXPORTAR

}

// EXPORTA A FUNÇÃO PARA OUTRO ARQUIVO
module.exports = function(){
    
    this.parmsConfigDB = async () => {
        const data = createConnMongo();
        return data;
    }

}