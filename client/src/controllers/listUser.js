/*
CRIADO: JEAN CLEIDSON PEREIRA RODRIGUES
MATRICULA: 202202257141
EMAIL: jeantng2016@gmail.com  
*/

// IMPORTA MODULO DO AXIOS
import axios from 'axios';

// DEFINE AS VARIAVIES DE AMBIENTE
var portApi = 57601;

// DEFINE A URL DA API BASEANDO NA URL ATUAL EX: [ localhost || 10.0.0.0 ]
axios.defaults.baseURL = `${window.location.protocol}//${window.location.hostname}:${portApi}`;

export default async function listarUsuario() {

  // let data = {
  //   filter: {
  //     nome: { $regex: "gui", $options: "i" }
  //   },
  //   sort: {
  //     _id: -1,
  //   },
  //   limit: 9999,
  // };

  // await axios
  //   .post("http://localhost:57601/api/user/list_user", data, {
  //     withCredentials: true,
  //   })
  //   .then((res) => {
  //     return res.data
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  
  // CRIA OS PARAMETROS DA REQUISIÇÃO
  let config = {
    method: 'POST',
    withCredentials: true, // ENVIA OS COOKIES
    url: '/api/user/list_user',
    headers: {
      'Accept': '*/*'
    }
  };

  // INICIALIA O AXIOS
  const getListUser = await axios.request(config)

    // TRATATIVA DE SUCESSO
    .then((response) => {

      // RESERVA TODAS AS INFORMAÇÃO DE ERRO RECEBIDA DO SERVIDOR
      let status = response.status;
      let dataSuccess = response.data;
      let codigo = response.data.codigo;
      let resposta = response.data.resposta;
      let mensagem = response.data.mensagem;

      return dataSuccess;

    })

    // TRATIVA DE ERRO
    .catch((error) => {

      // RESERVA TODAS AS INFORMAÇÃO DE ERRO RECEBIDA DO SERVIDOR
      let status = error.response.status;
      let dataErr = error.response.data;
      let codigo = dataErr.codigo;
      let resposta = dataErr.resposta;
      let mensagem = dataErr.mensagem;

      return dataErr;

    });

  return getListUser;

}
