// IMPORTA MODULO DO AXIOS
import axios from 'axios';

// DEFINE AS VARIAVIES DE AMBIENTE
var portApi = 57601;

// DEFINE A URL DA API BASEANDO NA URL ATUAL EX: [ localhost || 10.0.0.0 ]
axios.defaults.baseURL = `${window.location.protocol}//${window.location.hostname}:${portApi}`

export default async function Login(email, senha) {

  // CRIA OS DADOS DO BODY
  let body = {
    email: email,
    senha: senha,
  };

  // CRIA OS PARAMETROS DA REQUISIÇÃO
  let config = {
    method: 'POST',
    withCredentials: true, // ENVIA OS COOKIES
    url: '/auth/singin',
    headers: {
      'Accept': '*/*'
    },
    data: body
  };

  // INICIALIA O AXIOS
  const singIn = await axios.request(config)

    // TRATATIVA DE SUCESSO
    .then((response) => {

      // RESERVA TODAS AS INFORMAÇÃO DE ERRO RECEBIDA DO SERVIDOR
      let status = response.status;
      let dataSuccess = response.data;
      let codigo = response.data.codigo;
      let resposta = response.data.resposta;
      let mensagem = response.data.mensagem;

      // VERIFICA SE DESEJA SEGUIR A DIANTE
      var ASK = window.confirm(mensagem);
      if (ASK) {
        window.location.href = '/home'; // DIRECIONA PARA A TELA DE HOME
      }
      else {
        window.location.reload(); // ATUALIZA A PAGINA
      }

    })

    // TRATIVA DE ERRO
    .catch((error) => {

      // RESERVA TODAS AS INFORMAÇÃO DE ERRO RECEBIDA DO SERVIDOR
      let status = error.response.status;
      let dataErr = error.response.data;
      let codigo = dataErr.codigo;
      let resposta = dataErr.resposta;
      let mensagem = dataErr.mensagem;

      // APRESENTA MENSAGEM DE ERRO
      var ASK = window.confirm(mensagem);
      if (ASK) {
        // FAZ NADA
      }
      else {
        window.location.reload(); // ATUALIZA A PAGINA
      }

    });

}
