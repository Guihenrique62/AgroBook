require('dotenv').config({path: '../../../.env'});

// CONFIGURAÇÃO DA CONEXÃO
var sqlConfig = async () => {
    var config = {
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        server: '192.168.4.10',
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
        options: {
            encrypt: false, // for azure
            trustServerCertificate: false // change to true for local dev / self-signed certs
        }
    }

    return config;
}

module.exports = function(){
    
    this.parmsConfigDB = async () => {
        const data = sqlConfig();
        return data;
    }

}