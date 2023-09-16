import { useState } from "react";
import axios from "axios";

export default function Teste() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");

  // VALIDA O LOGIN
  let validLogin = async (e) => {
    e.preventDefault();

    let data = {};

    await axios.post('http://localhost:57601/auth/singin/valid', data, {
      withCredentials: true
    }).then((res) => {
      setMessage(`status: ${res.status} ${res.data.mensagem}`);
    })
      .catch((err) => {
        setMessage(`status: ${err.response.status} ${err.response.data.mensagem}`);
      });

  };

  // LISTART USUARIOS
  let listarUsuarios = async (e) => {
    e.preventDefault();

    let data = {
      "filter": {
        "nome": { "$regex": "gui", "$options": "i" }
      },
      "sort": {
        "_id": -1
      },
      "limit": 100
    };

    await axios.post('http://localhost:57601/api/user/list_user', data, {
      withCredentials: true
    }).then((res) => {
      setMessage(`status: ${res.status} ${res.data.mensagem}\n${JSON.stringify(res.data.data_base)}`);
    })
      .catch((err) => {
        setMessage(`status: ${err.response.status} ${err.response.data.mensagem}`);
      });

  };

  // RELAIZA O LOGIN
  let handleSubmit = async (e) => {
    e.preventDefault();

    try {

      let data = {
        email: "jeantng2016@gmail.com",
        senha: "nova@trocar123",
      };

      await axios.post('http://localhost:57601/auth/singin', data, {
        withCredentials: true
      }).then((res) => {
        setMessage(`status: ${res.status} ${res.data.mensagem}`);
      })
        .catch((err) => {
          setMessage(`status: ${err.response.status} ${err.response.data.mensagem}`);
        });


    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={mobileNumber}
          placeholder="Mobile Number"
          onChange={(e) => setMobileNumber(e.target.value)}
        />

        <button type="submit">Loga</button>

      </form>

      <form onSubmit={validLogin}>
        <button type="submit">Valida</button>
      </form>

      <form onSubmit={listarUsuarios}>
        <button type="submit">Listar usuários</button>
      </form>


      <div className="message">{message ? <p>{message}</p> : null}</div>

    </div>
  );
}
