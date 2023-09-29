import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuLateral from '../menu_lateral/MenuLateral'
import './HeaderStyle.css'

export default function Header({ user, search }) {
    const [openMenu, setOpenMenu] = useState(false)

  return (
    <div className='HeaderContainer'>
        <div>
            <button onClick={()=> setOpenMenu(true)}><i className='bx bx-menu'></i></button>
            
            {search ?     //RENDERIZA O BOTÃO CASO ELE TENHA FUNCIONALIDADE
              <div>
                <input type="text" placeholder='Buscar Livros...' />
                <button onClick={() => search()}><i className='bx bx-search'></i></button>
              </div>
              : null
            }

            <Link to={'/home'}> <img className='img-logo-header'src='/small-logo.png'></img> </Link>
        </div>
        <MenuLateral user={{nome: 'Guilherme Henrique', cargo:0}} isOpen={openMenu} setIsOpen={setOpenMenu}/>
    </div>
  )
}
