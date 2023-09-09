const sql = require('mssql');
const configDB = require('../../sql/connection/main');
require('dotenv').config({ path: '.env' });

const runQuery = async (keys) => {

    const configParms = new configDB();
    const config = await configParms.parmsConfigDB();

    return sql.connect(config).then(pool => {
        // VARIAVEIS
        var where_values = keys.where_values;
        var and_values = keys.and_values;
    
        // QUERY
        return pool.request()
        .input('where_values', sql.VarChar, where_values)
        .input('and_values', sql.VarChar, and_values)
        .query(`
            SELECT *
            FROM usuario
            WHERE usr_login = @where_values
            AND usr_senha = @and_values
        `);
    }).then(result => {
    
        sql.close();
        return [{ "err": false, "result": result }];
        
    }).catch(err => {
    
        sql.close();
        return [{ "err": err, "result": false }];
    
    });
}

module.exports = function(){
    
    this.query = async (query) => {
        const data = await runQuery(query);
        return data;
    }

}