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
      const resposta = await axios.post(
        "http://20.226.73.46:57601/auth/singin/valid",
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
      var data = {
        email: "jeantng2016@gmail.com",
        senha: "trocar123",
      };
      let config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Expose-Headers": "set-cookie",
          "Access-Control-Allow-Credentials": true,
        },
      };
      const resposta = await axios.post(
        "http://20.226.73.46:57601/auth/singin",
        data,
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
