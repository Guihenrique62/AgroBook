import React from 'react'
import Header from '../header/Header'
import listarUsuario from '../../controllers/listUser'

const user = listarUsuario()
console.log(user)

export default function RegisterUser() {


  //Valida o Cargo do Colaborador e converte para string
  var cargo
  if(user.cargo){
    const cargoMap = {0: 'Admin', 1: 'Colaborador'}
    cargo = cargoMap[user.cargo]
  }else{
    cargo = "undefined"
  }

  return (
    <div>
      <div>
        <Header user={undefined} search={null}/>
        <div>
            <input type="text" placeholder='Buscar Livros...' />
            <button><i className='bx bx-search'></i></button>
        </div>
        <button>Novo</button>
        <div className="usersContainer">
          <div className="headTable">
            <span>Nome:</span>
            <span>E-mail:</span>
            <span>Cargo:</span>
            <span>Editar:</span>
          </div>
        
          <div className='userTable'>

            <div className="user">
              <p>{user.nome}</p>
              <p>{user.email}</p>
              <p>{cargo}</p>
              <button >
                <img src="edit-user-icon.png" alt="edit-user-icon" />
              </button>
            </div>

            <div className="user">
              <p>{user.nome}</p>
              <p>{user.email}</p>
              <p>{cargo}</p>
              <button >
                <img src="edit-user-icon.png" alt="edit-user-icon" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
