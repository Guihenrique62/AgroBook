/*
  CRIADO POR: GUILHERME HENRIQUE PORTO DOS SANTOS
  EMAIL: guilhermeportosantos1@gmail.com
*/

/////////////////////////////////////////////
// ROTA PARA A PAGINA DE EDIÇÃO DE USUARIO //
/////////////////////////////////////////////

import React from "react";
import { Link, useParams } from "react-router-dom";

import "../styles/editUser.css";
import EditUserForm from "./EditUserForm";

export default function EditUser() {
  const { userID } = useParams();

  const user = {
    _id: "65047a74babdd7046c86e390",
    nome: "FELIPE",
    documento: 70657247197,
    email: "fillypecunha@gmail.com",
    senha: "9794d28317313a72eb0fd5e91bc63092",
    cargo: 0,
    status: 0,
    resetar_senha: 0,
  };

  return (
    <div className="editUserMasterComponent">
      <div className="editUserComponent">
        {/* Parte de cima do componente */}
        <div className="editUserHeader">
          <h2>Editar Usuário</h2>
          <Link to={"/user"}>
            <i className="bx bx-x"></i>
          </Link>
        </div>

        <EditUserForm status={user.status} user={user}></EditUserForm>
      </div>
    </div>
  );
}
