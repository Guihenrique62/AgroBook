import { useState, useEffect } from "react";
import Validar from "./routes/validar";
import React from "react";
import Login from "../../controllers/Login";
import swal from "sweetalert";
import error from "../error/error";
import Menu from "./routes/menu";
import { Link, Navigate, redirect } from "react-router-dom";
import Error from "../error/error";
import { Routes, Route } from "react-router-dom";

export default function Tela_de_Login() {
  let [email, setEmail] = useState("");
  let [senha, setSenha] = useState("");
  let [status, setStatus] = useState();
  let [mensgaemRetornada, setmensgaemRetornada] = useState();
  let [trocar, setTrocar] = useState();

 

  let handleSubmit = async (e) => {
   e.preventDefault();
    const res = Login(email, senha);
    res

      .then((res) => {
         setmensgaemRetornada(res);
         setStatus(res);
        
        
      })
      .catch((err) => {
        // setmensgaemRetornada("err");
        console.log(setTrocar(err.response.status)) ;
        //console.log(err);
        console.log(err)

      });
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
      <Validar ok={mensgaemRetornada} />
      {status === 200  ? <Navigate to="/menu" /> : "teste"}
    </form>
  );
}
