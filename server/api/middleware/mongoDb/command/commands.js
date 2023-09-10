/*
CRIADO: JEAN CLEIDSON PEREIRA RODRIGUES
MATRICULA: 202202257141
EMAIL: jeantng2016@gmail.com  
*/

const { MongoClient } = require('mongodb'); // SOLICTA A BIBLIOTECA DO MONGO DB
const configDB = require('../database/conn'); // SOLICITA ARQUIVOS DE CONEXAO
require('dotenv').config(); // SOLICITA VARIAVEIS DO ARQUIVO .ENV

// C = CREATE | Função que cria um registro no mongoDb | Ex: [ db = 'books', collection = 'usuarios', obj = {nome: "user"} ]
const createData = async (dataBase, collectionName, obj) => {

    const configParms = new configDB(); // RECUPERA A FUNCAO QUE VEIO DO AQUIVO DE CONEXAO
    const client = await configParms.parmsConfigDB(); // RESERVA APENAS A FUNCAO DE CONEXAO

    // FUNCAO PARA CRIAR UM REGISTRO
    async function execute(dataBase, collectionName, obj) {

        await client.connect(); // AGUARDA A CONEXAO COM O CLIENT

        const db = client.db(dataBase); // CRIA A CONECAO COM O BANCO
        const collection = db.collection(collectionName); // AGORA A CONEXAO COM A COLLECTION
        const insertData = await collection.insertOne(obj); // PARA FINALIZAR REALIZA A INSERÇÃO DE UM UNICO OBJETO

        const objArray = {}; // CRIA UM OBJETO PARA GUARDAR O OBJ PASSADO

        objArray.dataBase = dataBase; // RESERVA OS DADOS DE ENTRADA [ db ]
        objArray.collectionName = collectionName; // RESERVA OS DADOS DE ENTRADA [ collection ]
        objArray.obj = obj; // RESERVA OS DADOS DE ENTRADA [ obj ]
        objArray.result = insertData; // RESERVA O RESULTADO FINAL DO COMANDO

        return objArray; // RETORNA O RESULTADO DA OPERAÇÃO O ESPERADO É {"ok":1}

    }

    return await execute(dataBase, collectionName, obj)
        .then((res) => { return res }) // EM CADO DE SUCESSO
        .catch((err) => { return err }) // EM CASO DE ERRO
        .finally(() => client.close()); // AO FINALIZAR FECHA A CONEXAO

}

// R = READ | Função que le um registro no mongoDb
const readData = async (dataBase, collectionName, filter, sort, limit) => {

    const configParms = new configDB(); // RECUPERA A FUNCAO QUE VEIO DO AQUIVO DE CONEXAO
    const client = await configParms.parmsConfigDB(); // RESERVA APENAS A FUNCAO DE CONEXAO

    // FUNCAO PARA LER REGISTROS
    async function execute(dataBase, collectionName, filter, sortfIld, limitfild) {

        await client.connect(); // AGUARDA A CONEXAO COM O CLIENT

        const db = client.db(dataBase); // CRIA A CONECAO COM O BANCO
        const collection = db.collection(collectionName); // AGORA A CONEXAO COM A COLLECTION
        const findData = await collection.find(filter).sort(sortfIld).limit(limitfild).toArray(); // PARA FINALIZAR REALIZA A INSERÇÃO DE UM UNICO OBJETO

        const objArray = {}; // CRIA UM OBJETO PARA GUARDAR O OBJ PASSADO

        objArray.dataBase = dataBase; // RESERVA OS DADOS DE ENTRADA [ db ]
        objArray.collectionName = collectionName; // RESERVA OS DADOS DE ENTRADA [ collection ]
        objArray.filter = filter; // PARAMETRO USANDO PARA FILTRAR QUERY
        objArray.sortfIld = sortfIld; // PARAMETRO USANDO PARA ORDENAR QUERY
        objArray.limitfild = limitfild; // PARAMETRO USANDO PARA LIMITAR NUMEROS DE REGISTRO QUERY
        objArray.result = findData; // RESERVA O RESULTADO FINAL DO COMANDO

        return objArray; // RETORNA O RESULTADO DA OPERAÇÃO O ESPERADO É {"ok":1}

    }

    return await execute(dataBase, collectionName, filter, sort, limit)
        .then((res) => { return res }) // EM CADO DE SUCESSO
        .catch((err) => { return err }) // EM CASO DE ERRO
        .finally(() => client.close()); // AO FINALIZAR FECHA A CONEXAO

}

// U = UPDATE | Função que atualiza um registro no mongodb usando o filter para localizar o registro e o updatefild para atualizar
const updateData = async (dataBase, collectionName, filter, updateFilds) => {

    const configParms = new configDB(); // RECUPERA A FUNCAO QUE VEIO DO AQUIVO DE CONEXAO
    const client = await configParms.parmsConfigDB(); // RESERVA APENAS A FUNCAO DE CONEXAO

    // FUNCAO PARA LER REGISTROS
    async function execute(dataBase, collectionName, filter, objetctNewFilds) {

        await client.connect(); // AGUARDA A CONEXAO COM O CLIENT

        const db = client.db(dataBase); // CRIA A CONECAO COM O BANCO
        const collection = db.collection(collectionName); // AGORA A CONEXAO COM A COLLECTION
        const updateData = await collection.updateOne(filter, { $set: objetctNewFilds }); // PARA FINALIZAR REALIZA A ALTERACAO USANDO UM FILTRO E UM NOVO OBJETO

        const objArray = {}; // CRIA UM OBJETO PARA GUARDAR O OBJ PASSADO

        objArray.dataBase = dataBase; // RESERVA OS DADOS DE ENTRADA [ db ]
        objArray.collectionName = collectionName; // RESERVA OS DADOS DE ENTRADA [ collection ]
        objArray.filter = filter; // PARAMETRO USANDO PARA FILTRAR QUERY
        objArray.objetctNewFilds = objetctNewFilds; // PARAMETRO USANDO PARA INSERIR UM NOVO VALOR
        objArray.result = updateData; // RESERVA O RESULTADO FINAL DO COMANDO

        return objArray; // RETORNA O RESULTADO DA OPERAÇÃO O ESPERADO É {"ok":1}

    }

    return await execute(dataBase, collectionName, filter, updateFilds)
        .then((res) => { return res }) // EM CADO DE SUCESSO
        .catch((err) => { return err }) // EM CASO DE ERRO
        .finally(() => client.close()); // AO FINALIZAR FECHA A CONEXAO

}

const deleteData = async () => {

}

// EXPORTA A FUNÇÃO PARA OUTRO ARQUIVO
module.exports = function () {

    this.commandCreateData = async (db, collection, obj) => {
        const data = await createData(db, collection, obj);
        return data;
    }

    this.commandReadData = async (dataBase, collectionName, filter, sort, limit) => {
        const data = await readData(dataBase, collectionName, filter, sort, limit);
        return data;
    }

    this.commandUpadateData = async (dataBase, collectionName, filter, newObj) => {
        const data = await updateData(dataBase, collectionName, filter, newObj);
        return data;
    }

}