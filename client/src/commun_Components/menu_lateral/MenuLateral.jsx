import React from 'react'
import { Link } from 'react-router-dom'
import extractInitials from './scripts/extractInitials';

export default function MenuLateral({user, isOpen, setIsOpen}) {
  
  if (isOpen) {

   
    //VALIDA SE OS PARAMETROS FORAM PASSADOS
    if (!setIsOpen || !user) {
      console.error('um ou mais parametros não atribuidos Menu Lateral')
      return
    }
    const InitialsName = extractInitials(user.nome); //retorna as iniciais do Nome
    return (
      <div>
        <div>
          <button onClick={()=> setIsOpen(false)}><i className='bx bx-x'></i></button> {/*Fechar modal redirecionando para o path atual em q se encontra */}
          
          <div className="perfilContainer"><p>{InitialsName}</p></div>
          <p>{user.nome}</p> {/*Nome do Usuário */}

          {/*LINK PARA A TELA INICIAL*/}
          <Link to={'/home'}>
            <img src='/home-icon.png' alt='home-icon' />
            <p>Tela Inicial</p>
          </Link>

          {/*LINK PARA A TELA DE CADASTRO*/}
          {
            user.cargo == 0 ? //verifica se o user é qualificado
              <Link to={'/user'}>
                <img src='/cadastro-icon.png' alt='cadastro-icon' />
                <p>Cadastro</p>
              </Link>
              : null
          }

          {/*LINK PARA A TELA ESTOQUE*/}
          {
            user.cargo == 0 ? //verifica se o user é qualificado
              <Link to={'/storage'}>
                <img src='/livros-icon.png' alt='livros-icon' />
                <p>Estoque</p>
              </Link>
              : null
          }

          {/*LINK PARA A TELA MINHA BIBLIOTECA*/}
          <Link to={'/'}>
            <img src='/livro-icon.png' alt='livro-icon' />
            <p>Minha Biblioteca</p>
          </Link>

          {/*LINK PARA A TELA PEDIDOS*/}
          <Link to={'/orders'}>
            <img src='/pedidos-icon.png' alt='pedidos-icon' />
            <p>Pedidos</p>
          </Link>

          <div className="logoContainer">
            <img src="/logo-image.png" alt="logo-image" />
          </div>

        </div>
      </div>
    )
  } else {
    return null
  }
}
