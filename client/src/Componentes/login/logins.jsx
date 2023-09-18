import { useState, useEffect } from "react";
import Validar from "./routes/validar";
import React from "react";
import Login from "../../controllers/Login";
import swal from "sweetalert";
import error from "../error/error";

export default function Tela_de_Login() {
  let [email, setEmail] = useState("");
  let [senha, setSenha] = useState("");
  let [status, setStatus] = useState(0);
  let [mensgaemRetornada, setmensgaemRetornada] = useState();
  let[trocar, setTrocar]=useState()

  // RELAIZA O LOGIN
  let handleSubmit = (e) => {
    e.preventDefault();
    const res = Login(email, senha);
    res
      .then((res) => {
        setmensgaemRetornada(res.data.mensagem);
        setStatus(res.status);
      })
      .catch((err) => {
        setmensgaemRetornada("err");
        setTrocar(err.status);
        
        console.log(err);

      });
  };

  const validStatus = () => {
    if (status === 200 || 0 || "200") {
      return mensgaemRetornada;
    } else {
      return swal("Oops!", "Something went wrong!", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">
        <p>Email:</p>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          required
          onChange={(ev) => setEmail(ev.target.value)}
        />
      </label>
      <label htmlFor="senha">
        <p>Senha:</p>
        <input
          type="password"
          name="senha"
          id="senha"
          minLength="8"
          maxLength="100"
          // pattern="[A-Z a-z]+"
          value={senha}
          required
          onChange={(ev) => setSenha(ev.target.value)}
        />
      </label>
      <button type="subimt">Logar</button>

      <div>
        {status === 200 || 0 || "200" ? mensgaemRetornada : mensgaemRetornada}
      </div>
      <Validar ok={trocar}/>
    </form>
  );
}
