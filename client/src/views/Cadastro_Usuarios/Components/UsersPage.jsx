/*
  CRIADO POR: GUILHERME HENRIQUE PORTO DOS SANTOS
  EMAIL: guilhermeportosantos1@gmail.com
*/

////////////////////////////////////////////////////
// ROTA PARA A PAGINA MAIN DO CADASTRO DE USUARIO //
////////////////////////////////////////////////////


import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import listarUsuario from '../../../controllers/listUser'
import '../styles/usersPage.css'

var users = [ /* array que recebe resposta API */ ];



export default function UsersPage() {

  const [searchTerm, setSearchTerm] = useState('');
  
  listarUsuario().then((res) => {
    users = res.data_base.result;
    console.log(users, res.data_base.result)
  });

  // Função para filtrar usuários com base na string de busca
  const filteredUsers = users.filter(user =>
    user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.cargo === 0 ? 'Admin' : 'Colaborador').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='containerUsersMain'>
      <div className='inputsUsersContainer'>
        <div className='SearchUserContainer'>
          <input
            type="text"
            placeholder='Buscar por Nome Cargo ou Email...'
            className='inputSearchUser'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className='buttonSearchUser'><i className='bx bx-search'></i></button>
        </div>
        <Link to='newUser' className='LinkCreateUser'><button>Novo</button></Link>
      </div>

      <div className="usersContainer">
        <div className="headTableUsers">
          <span>Nome:</span>
          <span className='emailSpan'>E-mail:</span>
          <span className='cargoSpan'>Cargo:</span>
          <span className='editarSpan'>Editar:</span>
        </div>

        <div className='userTable'>
          {filteredUsers.length > 0 ? filteredUsers.map(user => (
            <div className="user" key={user._id}>
              <p>{user.nome}</p>
              <p className='userEmail'>{user.email}</p>
              <p className='userCargo'>{user.cargo === 0 ? 'Admin' : 'Colaborador'}</p>
              <Link to={`editUser/${user._id}`} className='editUserLink'>
                <img src="edit-user-icon.png" alt="edit-user-icon" />
              </Link>
            </div>
          )) : <div>Nenhum Usuário Cadastrado...</div>}
        </div>
      </div>
    </div>
  );
}