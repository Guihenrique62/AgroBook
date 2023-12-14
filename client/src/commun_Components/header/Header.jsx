/*
  CRIADO POR: GUILHERME HENRIQUE PORTO DOS SANTOS
  EMAIL: guilhermeportosantos1@gmail.com
*/


import React, { useState, useEffect  } from 'react'
import { Link, Navigate } from 'react-router-dom'
import MenuLateral from '../menu_lateral/MenuLateral'
import './HeaderStyle.css'


 
export default function Header() {
    const [openMenu, setOpenMenu] = useState(false)
    const [user, setUser] = useState({})


    useEffect(() => {
      // Recuperar dados da sessionStorage ao carregar o componente
      const fetchDataFromSession = () => {
        const dataUserFromSession = sessionStorage.getItem('dataUser');
    
        if (dataUserFromSession) {
          const userData = JSON.parse(dataUserFromSession);
          setUser(userData);
        } else {
          window.location.href = '/';
        }
      };

      fetchDataFromSession();
    }, []); // O array vazio faz com que esse efeito colateral seja executado apenas uma vez, ao montar o componente

    

  return (
    <div className='HeaderContainer'>
        
            <button onClick={()=> setOpenMenu(true)} className='button-menu'><i className='bx bx-menu'></i></button>
            
           

            <Link to={'/home'} className='Link-img-logo-header'> <img className='img-logo-header'src='/small-logo.png'></img> </Link>
        <MenuLateral user={user} isOpen={openMenu} setIsOpen={setOpenMenu}/>
    </div>
  )
}
