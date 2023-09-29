/*
  CRIADO POR: GUILHERME HENRIQUE PORTO DOS SANTOS
  EMAIL: guilhermeportosantos1@gmail.com
*/

/////////////////////////////////////////////
// ROTA PARA A PAGINA DE EDIÇÃO DE USUARIO //
/////////////////////////////////////////////




import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function EditUser() {

  const { userID } = useParams()

  const user = {
    "_id": {
      "$oid": "650353c79ba693038e773576"
    },
    "email": "jeantng2016@gmail.com",
    "senha": "0f3f2c85a67b613214b4c95066f622b9",
    "cargo": 0,
    "status": 1,
    "documento": {
      "$numberLong": "70460827154"
    },
    "nome": "JEAN",
    "resetar_senha": 0
  }

  return (
    <>
      <div className='editUserComponent'>

        {/* Parte de cima do componente */}
        <div className="editUserHeader">
          <h2>Editar Usuário</h2>
          <Link to={'/user'}><i className='bx bx-x'></i></Link>
        </div>

        <form className="editUserMain">
          <div>
            <label htmlFor="cpf">Cpf: <b>*</b></label>
            <input type="text" name='cpf' id='cpf' required value={+user.documento}/>
          </div>
          
          <div>
            <label htmlFor="nome">Nome: <b>*</b></label>
            <input type="text" name='nome' id='nome' required value={user.nome}/>
          </div>

          <div>
            <label htmlFor="email">E-mail: <b>*</b></label>
            <input type="text" name='email' id='email' required value={user.email} />
          </div>

          <div>
            <label htmlFor="senha">Senha: <b>*</b></label>
            <input type="password" name='senha' id='senha' required />
          </div>

          <div>
            <select >
              <option value={0}>ADMINISTRADOR</option>
              <option value={1}>COLABORADOR</option>
            </select>
          </div>

          <div className="logEditUserContainer">
            <p>Usuário Criado por GUILHERME HENRIQUE PORTO DOS SANTOS em 01/01/2023 há 3 meses atrás</p>
          </div>

          <button>Salvar</button>
        </form>    
      </div>
    </>
  )
}
