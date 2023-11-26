import axios from 'axios';

const listAllBooks = async (e) => {
  try {
    // BODY DA REQUISIÇÃO
    let data = {
      "filter": {
        "titulo": { "$regex": "a", "$options": "i" }
      },
      "sort": {
        "_id": -1
      },
      "limit": 100
    };
    const resposta = await axios.post("http://localhost:57601/api/book/list_book", data, { withCredentials: true });

    return resposta.data.data_base.result;
  } catch (err) {
    console.log(err);
  }
}

export default listAllBooks;
