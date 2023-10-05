/*
  CRIADO POR: GUILHERME HENRIQUE PORTO DOS SANTOS
  EMAIL: guilhermeportosantos1@gmail.com
*/

/////////////////////////////////////////////
// ROTA PARA A PAGINA DE EDIÇÃO DE USUARIO //
/////////////////////////////////////////////

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import "../styles/editUser.css";
import EditUserForm from "./EditUserForm";
import AlertModal from "../../../commun_Components/alertModal/AlertModal";
import ErrorModal from "../../../commun_Components/error/ErrorModal";
import CorrectModal from "../../../commun_Components/correctModal/CorrectModal";

export default function EditUser() {
  const { userID } = useParams(); //Id do user para realizar requisição
  const [openModalAlert, setOpenModalAlert] = useState(false)
  const [openModalError, setOpenModalError] = useState(false)
  const [openModalSucess, setOpenModalSucess] = useState(false)
  const messageAlert = 'Deseja Mesmo Desabilitar este Usuário? Todos os livros vinculados a ele voltará a constar como disponível!'


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
      <button onClick={()=>setOpenModalAlert(!openModalAlert)}>openmodal</button>
      <AlertModal isOpen={openModalAlert} setIsOpen={setOpenModalAlert} LinkToSucess={'/user'} message={messageAlert} buttonMessageSucess={'Desabilitar'}></AlertModal>
      <ErrorModal/>
      <CorrectModal/>
    </div>
  );
}
