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
    "_id": "65047a74babdd7046c86e390",
    "nome": "FELIPE",
    "documento": 70657247197,
    "email": "fillypecunha@gmail.com",
    "senha": "9794d28317313a72eb0fd5e91bc63092",
    "cargo": 0,
    "status": 1,
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
            <input type="number" name='cpf' id='cpf' required value={user.documento}/>
          </div>
          
          <div>
            <label htmlFor="nome">Nome: <b>*</b></label>
            <input type="text" name='nome' id='nome' required value={user.nome}/>
          </div>

          <div>
            <label htmlFor="email">E-mail: <b>*</b></label>
            <input type="email" name='email' id='email' required value={user.email} />
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
