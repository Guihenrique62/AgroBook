/*
CRIADO: JEAN CLEIDSON PEREIRA RODRIGUES
MATRICULA: 202202257141
EMAIL: jeantng2016@gmail.com  
*/

const { MongoClient, ObjectId } = require('mongodb'); // SOLICTA A BIBLIOTECA DO MONGO DB
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
    async function execute(dataBase, collectionName, filter, sortFild, limitFild) {

        await client.connect(); // AGUARDA A CONEXAO COM O CLIENT

        const db = client.db(dataBase); // CRIA A CONECAO COM O BANCO
        const collection = db.collection(collectionName); // AGORA A CONEXAO COM A COLLECTION
        const findData = await collection.find(filter).sort(sortFild).limit(limitFild).toArray(); // PARA FINALIZAR REALIZA A INSERÇÃO DE UM UNICO OBJETO

        const objArray = {}; // CRIA UM OBJETO PARA GUARDAR O OBJ PASSADO

        objArray.dataBase = dataBase; // RESERVA OS DADOS DE ENTRADA [ db ]
        objArray.collectionName = collectionName; // RESERVA OS DADOS DE ENTRADA [ collection ]
        objArray.filter = filter; // PARAMETRO USANDO PARA FILTRAR QUERY
        objArray.sortFild = sortFild; // PARAMETRO USANDO PARA ORDENAR QUERY
        objArray.limitFild = limitFild; // PARAMETRO USANDO PARA LIMITAR NUMEROS DE REGISTRO QUERY
        objArray.result = findData; // RESERVA O RESULTADO FINAL DO COMANDO

        return objArray; // RETORNA O RESULTADO DA OPERAÇÃO O ESPERADO É {"ok":1}

    }

    return await execute(dataBase, collectionName, filter, sort, limit)
        .then((res) => { return res }) // EM CADO DE SUCESSO
        .catch((err) => { return err }) // EM CASO DE ERRO
        .finally(() => client.close()); // AO FINALIZAR FECHA A CONEXAO

}

// R.I = READ BY ID | Função que busca registro usando o ID
const readDataById = async (dataBase, collectionName, o_id) => {

    const configParms = new configDB(); // RECUPERA A FUNCAO QUE VEIO DO AQUIVO DE CONEXAO
    const client = await configParms.parmsConfigDB(); // RESERVA APENAS A FUNCAO DE CONEXAO

    // FUNCAO PARA LER REGISTROS
    async function execute(dataBase, collectionName, o_id) {

        await client.connect(); // AGUARDA A CONEXAO COM O CLIENT

        const db = client.db(dataBase); // CRIA A CONECAO COM O BANCO
        const collection = db.collection(collectionName); // AGORA A CONEXAO COM A COLLECTION
        const findData = await collection.findOne({ "_id": new ObjectId(o_id) }); // PARA FINALIZAR REALIZA A INSERÇÃO DE UM UNICO OBJETO

        const objArray = {}; // CRIA UM OBJETO PARA GUARDAR O OBJ PASSADO

        objArray.dataBase = dataBase; // RESERVA OS DADOS DE ENTRADA [ db ]
        objArray.collectionName = collectionName; // RESERVA OS DADOS DE ENTRADA [ collection ]
        objArray.filter = o_id; // PARAMETRO USANDO PARA FILTRAR QUERY
        objArray.sortFild = null; // PARAMETRO USANDO PARA ORDENAR QUERY
        objArray.limitFild = null; // PARAMETRO USANDO PARA LIMITAR NUMEROS DE REGISTRO QUERY
        objArray.result = findData; // RESERVA O RESULTADO FINAL DO COMANDO

        return objArray; // RETORNA O RESULTADO DA OPERAÇÃO O ESPERADO É {"ok":1}

    }

    return await execute(dataBase, collectionName, o_id)
        .then((res) => { return res }) // EM CADO DE SUCESSO
        .catch((err) => { return err }) // EM CASO DE ERRO
        .finally(() => client.close()); // AO FINALIZAR FECHA A CONEXAO

}

// R.I.A = READ BY ID USING AGREGATION | Função que agrega dados de uma ou mais collection
const readDataByIdAgregation = async (dataBase, collections, filter, sortFild, limitFild) => {

    const configParms = new configDB(); // RECUPERA A FUNCAO QUE VEIO DO AQUIVO DE CONEXAO
    const client = await configParms.parmsConfigDB(); // RESERVA APENAS A FUNCAO DE CONEXAO

    // FUNCAO PARA LER REGISTROS
    async function execute(dataBase, collections, filter, sortFild, limitFild) {

        await client.connect(); // AGUARDA A CONEXAO COM O CLIENTE
        
        let aggregateQuery = [] // VARIAVEL PARA MONTAR UMA QUERY DINAMICA EX: 1 OU MAIS JOIN PARA DIFERENTES REQUISIÇÃO

        for (listLookup in collections) { // REALIZA UMA VARREDURA NA LISTA DE COLLECTION RECEBIDA PARA REALIZAR O JOIN EM 1 OU MAIS RELACIONAMENTOS
            print(collections[listLookup])
        }
        // [
        //     {'$match':{'usuario': new ObjectId('652df7076638ebf86ae252c3')}},
        //     {'$lookup': {'from':'usuarios','localField':'usuario','foreignField':'_id','as':'user'}},
        //     {'$lookup': {'from':'livros','localField':'livro','foreignField':'_id','as':'book'}}
        // ]

        const db = client.db(dataBase); // CRIA A CONECAO COM O BANCO
        const collection = db.collection(collections[0]); // PEGA O PRIMEIRO INDICE DO ARRAY, VALOR ESPERADO => [ 'collection1', 'collection2' ..., 'collection10' ]
        const findData = await collection.aggregate(aggregateQuery).toArray(); // REALIZA A AGREGAÇÃO USANDO O COMANDO LOOKUP COMO PREDOMINANTE

        const objArray = {}; // CRIA UM OBJETO PARA GUARDAR O OBJ PASSADO

        objArray.dataBase = dataBase; // RESERVA OS DADOS DE ENTRADA [ db ]
        objArray.collectionName = collections; // RESERVA OS DADOS DE ENTRADA [ collection ]
        objArray.filter = filter; // PARAMETRO USANDO PARA FILTRAR QUERY
        objArray.sortFild = sortFild; // PARAMETRO USANDO PARA ORDENAR QUERY
        objArray.limitFild = limitFild; // PARAMETRO USANDO PARA LIMITAR NUMEROS DE REGISTRO QUERY
        objArray.result = findData; // RESERVA O RESULTADO FINAL DO COMANDO

        return objArray; // RETORNA O RESULTADO DA OPERAÇÃO O ESPERADO É {"ok":1}

    }

    return await execute(dataBase, collections, filter, sortFild, limitFild)
        .then((res) => { return res }) // EM CADO DE SUCESSO
        .catch((err) => { return err }) // EM CASO DE ERRO
        .finally(() => client.close()); // AO FINALIZAR FECHA A CONEXAO

}

// U = UPDATE | Função que atualiza um registro no mongodb usando o filter para localizar o registro e o updatefild para atualizar
const updateData = async (dataBase, collectionName, filter, updateFilds) => {

    const configParms = new configDB(); // RECUPERA A FUNCAO QUE VEIO DO AQUIVO DE CONEXAO
    const client = await configParms.parmsConfigDB(); // RESERVA APENAS A FUNCAO DE CONEXAO

    // FUNCAO PARA ATUALIZAR REGISTROS
    async function execute(dataBase, collectionName, filter, objectNewFilds) {

        await client.connect(); // AGUARDA A CONEXAO COM O CLIENT

        const db = client.db(dataBase); // CRIA A CONECAO COM O BANCO
        const collection = db.collection(collectionName); // AGORA A CONEXAO COM A COLLECTION
        const updateData = await collection.updateOne(filter, { $set: objectNewFilds }); // PARA FINALIZAR REALIZA A ALTERACAO USANDO UM FILTRO E UM NOVO OBJETO

        const objArray = {}; // CRIA UM OBJETO PARA GUARDAR O OBJ PASSADO

        objArray.dataBase = dataBase; // RESERVA OS DADOS DE ENTRADA [ db ]
        objArray.collectionName = collectionName; // RESERVA OS DADOS DE ENTRADA [ collection ]
        objArray.filter = filter; // PARAMETRO USANDO PARA FILTRAR QUERY
        objArray.objectNewFilds = objectNewFilds; // PARAMETRO USANDO PARA INSERIR UM NOVO VALOR
        objArray.result = updateData; // RESERVA O RESULTADO FINAL DO COMANDO

        return objArray; // RETORNA O RESULTADO DA OPERAÇÃO O ESPERADO É {"ok":1}

    }

    return await execute(dataBase, collectionName, filter, updateFilds)
        .then((res) => { return res }) // EM CADO DE SUCESSO
        .catch((err) => { return err }) // EM CASO DE ERRO
        .finally(() => client.close()); // AO FINALIZAR FECHA A CONEXAO

}

// D = DELETE | Função que apaga um registro no mongodb usando o filter para localizar o registro
const deleteData = async (dataBase, collectionName, filter) => {

    const configParms = new configDB(); // RECUPERA A FUNCAO QUE VEIO DO AQUIVO DE CONEXAO
    const client = await configParms.parmsConfigDB(); // RESERVA APENAS A FUNCAO DE CONEXAO

    // FUNCAO PARA APAGAR REGISTROS
    async function execute(dataBase, collectionName, filter) {

        await client.connect(); // AGUARDA A CONEXAO COM O CLIENT

        const db = client.db(dataBase); // CRIA A CONECAO COM O BANCO
        const collection = db.collection(collectionName); // AGORA A CONEXAO COM A COLLECTION
        const deleteData = await collection.deleteOne(filter); // PARA FINALIZAR REALIZA A EXCLUSÃO USANDO UM FILTRO

        console.log(deleteData);

        const objArray = {}; // CRIA UM OBJETO PARA GUARDAR O OBJ PASSADO

        objArray.dataBase = dataBase; // RESERVA OS DADOS DE ENTRADA [ db ]
        objArray.collectionName = collectionName; // RESERVA OS DADOS DE ENTRADA [ collection ]
        objArray.filter = filter; // RESERVA OS DADOS DE ENTRADA [ filter ]
        objArray.result = deleteData; // RESERVA O RESULTADO FINAL DO COMANDO

        return objArray; // RETORNA O RESULTADO DA OPERAÇÃO O ESPERADO É {"ok":1}

    }

    return await execute(dataBase, collectionName, filter)
        .then((res) => { return res }) // EM CADO DE SUCESSO
        .catch((err) => { return err }) // EM CASO DE ERRO
        .finally(() => client.close()); // AO FINALIZAR FECHA A CONEXAO

}

// EXPORTA A FUNÇÃO PARA OUTRO ARQUIVO
module.exports = function () {

    // C - CREATE
    this.commandCreateData = async (db, collection, obj) => {
        const data = await createData(db, collection, obj);
        return data;
    }

    // R - READ
    this.commandReadData = async (dataBase, collectionName, filter, sort, limit) => {
        const data = await readData(dataBase, collectionName, filter, sort, limit);
        return data;
    }

    // R.I - READ BY ID
    this.commandReadDataById = async (dataBase, collectionName, objId) => {
        const data = await readDataById(dataBase, collectionName, objId);
        return data;
    }

    // U - UPDATE
    this.commandUpadateData = async (dataBase, collectionName, filter, newObj) => {
        const data = await updateData(dataBase, collectionName, filter, newObj);
        return data;
    }

    // D - DELETE
    this.commandDeleteData = async (dataBase, collectionName, filter) => {
        const data = await deleteData(dataBase, collectionName, filter);
        return data;
    }

}