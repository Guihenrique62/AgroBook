// Biblioteca: Axios: Axios é uma biblioteca popular baseada em promessas que permite fazer solicitações HTTP a partir de um navegador ou do Node.js. Ele fornece uma maneira fácil de interagir com serviços da web RESTful e executar operações como GET, POST, PUT e DELETE.
import axios from "axios";

// DEFINE AS VARIAVEIS DE AMBIENTE
const portApi = 57601;

// Mudar o endereço para servidor de hospedagem do cliente.
// DEFINE A URL DA API BASEANDO NA URL ATUAL EX: [ localhost || 10.0.0.0 ]
axios.defaults.baseURL = `http://192.168.1.12:${portApi}`;

// A função abaixo é usada para enviar uma solicitação de login para o servidor usando o Axios.

// login é uma função assíncrona que envia uma solicitação de login para o servidor.
// Parâmetros:
// - email: O endereço de e-mail do usuário.
// - senha: A senha do usuário.
const login = async (email, senha) => {
    try {
        // Define o corpo da solicitação com o email e senha fornecidos.
        const body = {
            email: email,
            senha: senha,
        };

        // Configura as opções da solicitação.
        const config = {
            method: "post",
            withCredentials: true,
            url: "/auth/singin",
            headers: {
                Accept: "*/*",
            },
            data: body,
        };

        // Envia a solicitação para o servidor e aguarda a resposta.
        const response = await axios.request(config);

        // Extrai os dados relevantes da resposta.
        const { status, data } = response;
        const { codigo, resposta, mensagem } = data;

        // Retorna o código e a mensagem da resposta.
        return { codigo, mensagem };
    } catch (error) {
        // Captura e trata quaisquer erros que ocorram durante a solicitação.
        if (error.response) {
            const { status, data } = error.response;
            const { codigo, resposta, mensagem } = data;
            console.error("Erro:", mensagem);
            console.error("Ocorreu um erro inesperado:", error);
            return { codigo, mensagem };
        }
    }
};

// Exporta a função de login para uso em outros arquivos.
export default login;
