import { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./menu";
import updateUser from "../../../controllers/updateUser";

export default function Validar({ ok }) {
  let [newSenha, setnewSenha] = useState("");
  let [salvandoSenha, setsalvandoSenha] = useState([]);
  let [mensageApi, setmensageApi] = useState("");

  let createPassowrd = async (ev) => {
    const novasenha = newSenha;
    setsalvandoSenha = [...salvandoSenha, { adcionarnova: novasenha }];
    setnewSenha("");
    return listUsers;
  };

  //lista usuarios
  let listUsers = async (e) => {
    e.preventDefault();
 
    try {
      let data = {
        filter: {
          email: { $regex: "a", $options: "i" },
          resetar_senha: 1,
        },
        sort: {
          _id: -1,
        },
        limit: 10,
      };

      const resposta = await axios.post(
        "http://localhost:57601/api/user/list_user",
        data,
        {
          withCredentials: true,
        }
      );

      console.log(resposta);
    } catch (err) {
      console.log(err.response.status, err.response.data.mensagem);
    }
    const updatepass = updateUser(newSenha)
     updatepass()
  };

  if (ok === 401 ) {
    return (
      <div>
        <h2>REDEFINE sua senha</h2>
        <p>insfira sua nova senha</p>
        <input
          type="password"
          name="senha"
          id="senha"
          onChange={(ev) => setnewSenha(ev.target.value)}
        />
        <Link to={"/menu"}>
          {" "}
          <button onClick={createPassowrd}> trocar de senha </button>
        </Link>
      </div>
    );
  } else {
    
  }
}
//para listar nova senha precisa so da senha nova ou vcs colocaram algo mais? 
//Listar a senha que ta no BD não tem como, por segurança
//O que tem q fazer nessa tela é dar update na senha
//Ai tu precisa so do nome
//ja volto peri
//ok
