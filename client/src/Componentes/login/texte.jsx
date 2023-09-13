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

    try {
      let config = {
        headers: {
          "Access-Control-Allow-Origin": "same-origin"
        },
      };
      const resposta = await axios.post(
        "http://localhost:57601/auth/singin/valid",
        config,
        {
          withCredentials: true,
        }
      );

      console.log(resposta);
    } catch (err) {
      console.log(err);
    }
    
  };

  // RELAIZA O LOGIN
  let handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // BODY DA SOLICITAÇÃO
      var data = {
        email: "jeantng2016@gmail.com", // EMAIL DA SOLICITAÇÃO
        senha: "trocar123", // SENHA
      };

      // CONFIGURA A SOLICITAÇÃO
      let config = {
        headers: {
          "Access-Control-Allow-Origin": "same-origin" // DEFINE ACESSO
        },
        withCredentials: true // PASSA O COOKIE PARA O SERVIDOR
      };

      // REALIZA A SOLICITAÇÃO
      const resposta = await axios.post(
        "http://localhost:57601/auth/singin",
        data,
        config
      );

      console.log(resposta);
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

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
      <form onSubmit={validLogin}>
        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}
