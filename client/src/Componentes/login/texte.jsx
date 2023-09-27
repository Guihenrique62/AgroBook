import { useState } from "react";
import axios from "axios";
import validLogins from "../../controllers/Login";
import Login from "../../controllers/Login";
import validLogin from "../../controllers/validLogin";
import listarUsuario from "../../controllers/listUser";
import './stylizationLogin/login.css'

export default function Teste() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
  var [status, setStatus] = useState();
  const [mensagemRetornada, setMensagemRetornada] = useState();

  // RELAIZA O LOGIN
  let handleSubmit = (e) => {
    e.preventDefault();
    const res = Login();
    res
      .then((res) => {
        setMensagemRetornada(res.data.mensagem);
        setStatus(res.status);
      })
      .catch((err) => {
        setMensagemRetornada(err.data.mensagem);
        setStatus(err.status);
      });
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
        <button type="submit">Validar</button>
      </form>

      <form onSubmit={listarUsuario}>
        <button type="submit">Listar usuarios</button>
      </form>

      <div>
        <p>{status === 401 ? mensagemRetornada : mensagemRetornada}</p>
      </div>
    </div>
  );
}
