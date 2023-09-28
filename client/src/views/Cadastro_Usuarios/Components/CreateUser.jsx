/*
  CRIADO POR: GUILHERME HENRIQUE PORTO DOS SANTOS
  EMAIL: guilhermeportosantos1@gmail.com
*/

/////////////////////////////////////////////
// ROTA PARA A PAGINA DE CRIAÇÃO DE USUARIO //
/////////////////////////////////////////////




import React, { useState } from 'react'
import { Link } from 'react-router-dom'



export default function CreateUser(){
  const [cargoSelect,setCargoSelect] = useState()

  const handleChange = (e) => {
    setCargoSelect(e.target.value)
  }


  return (
    <>
      <div className='createUserComponent'>

        {/* Parte de cima do componente */}
        <div className="createUserHeader">
          <h2>Criar Usuário</h2>
          <Link to={'/user'}><i className='bx bx-x'></i></Link>
        </div>

        <form className="createUserMain">
          <div>
            <label htmlFor="cpf">Cpf: <b>*</b></label>
            <input type="text" name='cpf' id='cpf' required/>
          </div>
          
          <div>
            <label htmlFor="nome">Nome: <b>*</b></label>
            <input type="text" name='nome' id='nome' required />
          </div>

          <div>
            <label htmlFor="email">E-mail: <b>*</b></label>
            <input type="text" name='email' id='email' required />
          </div>

          <div>
            <label htmlFor="senha">Senha: <b>*</b></label>
            <input type="password" name='senha' id='senha' required />
          </div>

          <div>
            <select value={cargoSelect} onChange={handleChange}>
              <option value={0}>ADMINISTRADOR</option>
              <option value={1}>COLABORADOR</option>
            </select>
          </div>

          <button>Salvar</button>
        </form>    
      </div>
    </>
  )
}
