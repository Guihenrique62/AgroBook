/*
  CRIADO POR: GUILHERME HENRIQUE PORTO DOS SANTOS
  EMAIL: guilhermeportosantos1@gmail.com
*/

////////////////////////////////////////////////////
// ROTA PARA A PAGINA MAIN DO CADASTRO DE USUARIO //
////////////////////////////////////////////////////


import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const users = [{nome: 'Guilherme Henrique', cargo: 0, id: 1, email: '@email.com'},{nome: 'Pedro Henrique', cargo: 0, id: 2, email: '@email.com'},{nome: 'Johnata Henrique', cargo: 0, id: 3, email: '@email.com'}]

export default function UsersPage() {

  
  return (
    <div>
      <div>
        <div>
            <input type="text" placeholder='Buscar Livros...' />
            <button><i className='bx bx-search'></i></button>
        </div>
        <Link to='newUser'><button>Novo</button></Link>


        <div className="usersContainer">
          <div className="headTable">
            <span>Nome:</span>
            <span>E-mail:</span>
            <span>Cargo:</span>
            <span>Editar:</span>
          </div>
        
          <div className='userTable'>

              {users.map((user)=> (
                <div className="user" key={user.id}>
                  <p>{user.nome}</p>
                  <p>{user.email}</p>
                  <p>{user.cargo == 0 ? 'Admin': 'Colaborador'}</p>
                  <Link to={`editUser/${user.id}`}>
                    <img src="edit-user-icon.png" alt="edit-user-icon" />
                  </Link>
              </div>
              ))}

          </div>

        </div>
      </div>
    </div>
  )
}
