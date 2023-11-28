const axios = require('axios'); // BIBLIOTECA DE REQUISICAO API
process.env.VUE_APP_VERSION = require('../../package.json').version

// CONFIGURA A API A URL INICIAL
axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + ":57601";

console.log(process.env);

export const requestApi = async (dataBody, url, tipo) => {
    
    // BODY
    let body = dataBody

    // HEADER
    let config = {
        method: tipo,
        withCredentials: true,
        url: url,
        timeout: process.env.VUE_APP_AXIOS_TIMEOUT,
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        data: body
    };

    // RUN AXIOS
    const response = await axios.request(config);

    return response
}