const { MongoClient } = require('mongodb'); // SOLICTA A BIBLIOTECA DO MONGO DB
const configDB = require('../database/conn'); // SOLICITA ARQUIVOS DE CONEXAO
require('dotenv').config(); // SOLICITA VARIAVEIS DO ARQUIVO .ENV

// C = CREATE | Função que cria um registro no mongoDb | Ex: [ db = 'books', collection = 'usuarios', obj = {nome: "user"} ]
const createData = async (db, collection, obj) => {

    const configParms = new configDB(); // RECUPERA A FUNCAO QUE VEIO DO AQUIVO DE CONEXAO
    const client = await configParms.parmsConfigDB(); // RESERVA APENAS A FUNCAO DE CONEXAO

    // FUNCAO PARA CRIAR UM REGISTRO
    async function execute() {

        await client.connect(); // AGUARDA A CONEXAO COM O CLIENT

        const db = client.db(db); // CRIA A CONECAO COM O BANCO
        const collection = db.collection(collection); // AGORA A CONEXAO COM A COLLECTION
        const insertData = await collection.insertOne(obj); // PARA FINALIZAR REALIZA A INSERÇÃO DE UM UNICO OBJETO
        
        const objArray = {}; // CRIA UM OBJETO PARA GUARDAR O OBJ PASSADO

        objArray.db = db; // RESERVA OS DADOS DE ENTRADA [ db ]
        objArray.collection = collection; // RESERVA OS DADOS DE ENTRADA [ collection ]
        objArray.obj = obj; // RESERVA OS DADOS DE ENTRADA [ obj ]
        objArray.result = objArray; // RESERVA O RESULTADO FINAL DO COMANDO

        return objArray; // RETORNA O RESULTADO DA OPERAÇÃO O ESPERADO É {"ok":1}

    }

    execute()
        .then((res) => {return res}) // EM CADO DE SUCESSO
        .catch((err) => {return err}) // EM CASO DE ERRO
        .finally(() => client.close()); // AO FINALIZAR FECHA A CONEXAO

}

const readData = async () => {

}

const updateData = async () => {

}

const deleteData = async () => {

}

// EXPORTA A FUNÇÃO PARA OUTRO ARQUIVO
module.exports = function () {

    this.commandCreateData = async (db, collection, obj) => {
        const data = await createData(db, collection, obj);
        return data;
    }

}