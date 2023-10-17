/*
  CRIADO POR: GUILHERME HENRIQUE PORTO DOS SANTOS
  EMAIL: guilhermeportosantos1@gmail.com
*/


import React, { useState, useEffect  } from 'react'
import { Link } from 'react-router-dom'
import MenuLateral from '../menu_lateral/MenuLateral'
import './HeaderStyle.css'
import FilterBooK from '../../views/Home/components/filterBook'

export default function Header({ search }) {
    const [openMenu, setOpenMenu] = useState(false)
    const [user, setUser] = useState({})

    useEffect(() => {
      // Recuperar dados da sessionStorage ao carregar o componente
      const dataUserFromSession = sessionStorage.getItem('dataUser');
  
      if (dataUserFromSession) {
        const userData = JSON.parse(dataUserFromSession);
        setUser(userData);
      }else{
        window.location.href = '/'
      }
    }, []); // O array vazio faz com que esse efeito colateral seja executado apenas uma vez, ao montar o componente
  
    FilterBooK()


  return (
    <div className='HeaderContainer'>
        
            <button onClick={()=> setOpenMenu(true)} className='button-menu'><i className='bx bx-menu'></i></button>
            
            {search ?     //RENDERIZA O BOTÃO CASO ELE TENHA FUNCIONALIDADE
              <div>
                <Link to={"filter"}>
                <input onClick={FilterBooK} type="text" placeholder='Buscar Livros...' className='input-header'/>
                </Link>
                 
                <button onClick={() => search()} className='button-search'><i className='bx bx-search'></i></button>
              </div> 
              : null
            }

            <Link to={'/home'} className='Link-img-logo-header'> <img className='img-logo-header'src='/small-logo.png'></img> </Link>
        <MenuLateral user={user} isOpen={openMenu} setIsOpen={setOpenMenu}/>
    </div>
  )
}
