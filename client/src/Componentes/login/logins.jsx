import { useState } from "react";

export default function Tela_de_Login() {
  var [email, setEmail] = useState("");
  var [senha, setSenha] = useState("");
  var [add, setAdd] = useState([]);

  const adds = async (ev) => {
    ev.preventDefault();
    const addEmail = email;
    const addSenha = senha;
    setAdd = [...add, { adcionarEmail: addEmail, adcionarSenha: addSenha }];
    setEmail = "";
    setSenha = "";

    const axios = require("axios");
    let data = JSON.stringify({
      email: "jeantng2016@gmail.com",
      senha: "trocar123",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      withCredentials: true,
      url: "http://20.226.73.46:57601/auth/singin",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      data: data,
    };

    return await axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const requeridPassword = async (ev) => {
    if (senha.length !== 5 /*|| !/^[A-Za-z0-9]+$/.test(senha)*/) {
      alert(
        "Ah senha deve possuir 5 caracteres e sendo apenas letras e numero"
      );
      ev.preventDefault();
    } else {
      alert("foi logado com sucesso");
    }

    await adds();
  };

  return (
    <form action="javascript:void(0);">
      <label htmlFor="">
        <p>Email:</p>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
      </label>
      <label htmlFor="senha">
        <p>Senha:</p>
        <input
          type="password"
          name="senha"
          id="senha"
          minLength="5"
          maxLength="5"
          /*pattern="[A-Z a-z]+"*/
          value={senha}
          onChange={(ev) => setSenha(ev.target.value)}
        />
      </label>
      <button onClick={requeridPassword}>Logar</button>
    </form>
  );
}
