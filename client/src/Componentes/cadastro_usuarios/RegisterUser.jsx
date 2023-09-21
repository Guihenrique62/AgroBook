import React from 'react'
import Header from '../header/Header'
import listarUsuario from '../../controllers/listUser'

// const result = listarUsuario()
// const users = result.data.result
// console.log(users)

const users = [{nome: 'Guilherme Henrique', cargo: 0, id: 1},{nome: 'Pedro Henrique', cargo: 0, id: 2},{nome: 'Johnata Henrique', cargo: 0, id: 3}]

export default function RegisterUser() {

  
  return (
    <div>
      <div>
        <Header user={undefined} search={null}/>
        <div>
            <input type="text" placeholder='Buscar Livros...' />
            <button><i className='bx bx-search'></i></button>
        </div>
        <Link to='/registerUser/new'><button>Novo</button></Link>


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
                  <button >
                    <img src="edit-user-icon.png" alt="edit-user-icon" />
                  </button>
              </div>
              ))}

          </div>

        </div>
      </div>
    </div>
  )
}
