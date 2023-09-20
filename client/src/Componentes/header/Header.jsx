import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuLateral from '../menu_lateral/MenuLateral'

export default function Header({ user, search }) {
    const [openMenu, setOpenMenu] = useState(false)

  return (
    <>
        <div>
            <button onClick={()=> setOpenMenu(true)}><i className='bx bx-menu'></i></button>
            
            {search ?     //RENDERIZA O BOTÃO CASO ELE TENHA FUNCIONALIDADE
              <div>
                <input type="text" placeholder='Buscar Livros...' />
                <button onClick={() => search()}><i className='bx bx-search'></i></button>
              </div>
              : null
            }

            <Link to={'/menu'}> <img src='/small-logo.png'></img> </Link>
        </div>
        <MenuLateral user={user} isOpen={openMenu} setIsOpen={setOpenMenu}/>
    </>
  )
}
