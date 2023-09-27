/*
  CRIADO POR: GUILHERME HENRIQUE PORTO DOS SANTOS
  EMAIL: guilhermeportosantos1@gmail.com
*/

////////////////////////////////////////////////////
// ROTA PARA A PAGINA MAIN DO CADASTRO DE USUARIO //
////////////////////////////////////////////////////


import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const users = [{
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
},
{
  "_id": {
    "$oid": "650387f904cc8b3df6c926f4"
  },
  "nome": "CNPJ MODELO",
  "documento": {
    "$numberLong": "60060938000129"
  },
  "email": "modelo@mail.com",
  "senha": "760370a93d730d7ab472a6dc4b940b4a",
  "cargo": 1,
  "status": 1,
  "resetar_senha": 1
},
{
  "_id": {
    "$oid": "65045929ac12560039fd4ec0"
  },
  "nome": "GUILHERME HENRIQUE PORTO DOS SANTOS",
  "documento": {
    "$numberLong": "71089729138"
  },
  "email": "guilhermeportosantos1@gmail.com",
  "senha": "58e31ef634a56bfaea1525841d455e90",
  "cargo": 0,
  "status": 1,
  "resetar_senha": 0
},
{
  "_id": {
    "$oid": "65047a74babdd7046c86e390"
  },
  "nome": "FELIPE",
  "documento": {
    "$numberLong": "70657247197"
  },
  "email": "fillypecunha@gmail.com",
  "senha": "9794d28317313a72eb0fd5e91bc63092",
  "cargo": 0,
  "status": 1,
  "resetar_senha": 0
}]

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
