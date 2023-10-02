/*
  CRIADO POR: GUILHERME HENRIQUE PORTO DOS SANTOS
  EMAIL: guilhermeportosantos1@gmail.com
*/


import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuLateral from '../menu_lateral/MenuLateral'
import './HeaderStyle.css'

export default function Header({ user, search }) {
    const [openMenu, setOpenMenu] = useState(false)
    const users = {
      "_id": "65045929ac12560039fd4ec0",
      "nome": "GUILHERME HENRIQUE PORTO DOS SANTOS",
      "documento": 71089729138,
      "email": "guilhermeportosantos1@gmail.com",
      "senha": "58e31ef634a56bfaea1525841d455e90",
      "cargo": 0,
      "status": 1,
      "resetar_senha": 0
    }

  return (
    <div className='HeaderContainer'>
        
            <button onClick={()=> setOpenMenu(true)} className='button-menu'><i className='bx bx-menu'></i></button>
            
            {search ?     //RENDERIZA O BOTÃO CASO ELE TENHA FUNCIONALIDADE
              <div>
                <input type="text" placeholder='Buscar Livros...' className='input-header'/>
                <button onClick={() => search()} className='button-search'><i className='bx bx-search'></i></button>
              </div>
              : null
            }

            <Link to={'/home'} className='Link-img-logo-header'> <img className='img-logo-header'src='/small-logo.png'></img> </Link>
        <MenuLateral user={users} isOpen={openMenu} setIsOpen={setOpenMenu}/>
    </div>
  )
}
