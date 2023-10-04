/*
  CRIADO POR: GUILHERME HENRIQUE PORTO DOS SANTOS
  EMAIL: guilhermeportosantos1@gmail.com
*/

/////////////////////////////////////////////
// ROTA PARA A PAGINA DE CRIAÇÃO DE USUARIO //
/////////////////////////////////////////////




import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import '../styles/createUser.css'
import CorrectModal from '../../../commun_Components/correctModal/CorrectModal'
import ErrorModal from '../../../commun_Components/error/ErrorModal'



export default function CreateUser(){
  const [cargoSelect,setCargoSelect] = useState()
  const [openModal, setOpenModal] = useState(false)
  const handleChange = (e) => {
    setCargoSelect(e.target.value)
  }


  return (
    <div className='createUserMasterComponent'>
    <div className='createUserComponent'>
      {/* Parte de cima do componente */}
      <div className="createUserHeader">
        <h2>Criar Usuário</h2>
        <Link to={'/user'}><i className='bx bx-x'></i></Link>
      </div>
  
      <form className="createUserMain">
        <div className='firstcontainerinput'>
        <div className='inputName createFormInputs'>
            <label htmlFor="nome">Nome: <b>*</b></label>
            <input type="text" name='nome' id='nome' required />
          </div>
          <div className='inputCpf createFormInputs'>
            <label htmlFor="cpf">Cpf: <b>*</b></label>
            <input type="text" name='cpf' id='cpf' required/>
          </div>
          
        </div>
  
        <div className='secondcontainerinput'>
          <div className='inputEmail createFormInputs'>
            <label htmlFor="email">E-mail: <b>*</b></label>
            <input type="email" name='email' id='email' required />
          </div>
          <div className='inputPassword createFormInputs'>
            <label htmlFor="senha">Senha: <b>*</b></label>
            <input type="password" name='senha' id='senha' required />
          </div>
          <div className='containerCargo '>
            <label htmlFor="cargo">Cargo: <b>*</b></label>
            <select value={cargoSelect} onChange={handleChange}>
              <option value={0}>ADMINISTRADOR</option>
              <option value={1}>COLABORADOR</option>
            </select>
          </div>
        </div>
        <div className='thirdcontainerinput'><button className='saveButton'>Salvar</button></div>
      </form>
    </div>
    <CorrectModal isOpen={openModal} page={'/user'} message={'ola'}></CorrectModal>
    <ErrorModal isOpen={false} page={'/user'} message={'ola'}></ErrorModal>
  </div>
  )
}
