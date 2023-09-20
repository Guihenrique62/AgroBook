import React from 'react'
import { Link } from 'react-router-dom'

export default function MenuLateral({actualPath,name}) {
  return (
    <div>

      <Link to={actualPath}><img src="/x-icon.png" alt="close-icon" /></Link> {/*Fechar modal redirecionando para o path atual em q se encontra */}
        <div className="perfilContainer"></div>
        <p>{name}</p> {/*Nome do Usuário */}

        {/*LINK PARA A TELA INICIAL*/}
        <Link to={'/menu'}>
          <img src='/home-icon.png' alt='home-icon'/>
          <p>Tela Inicial</p>
        </Link>

        {/*LINK PARA A TELA DE CADASTRO*/}
        <Link to={'/registerUser'}>
          <img src='/cadastro-icon.png' alt='cadastro-icon'/>
          <p>Cadastro</p>
        </Link>

        {/*LINK PARA A TELA ESTOQUE*/}
        <Link to={'/'}>
          <img src='/livros-icon.png' alt='livros-icon'/>
          <p>Estoque</p>
        </Link>
        
        {/*LINK PARA A TELA MINHA BIBLIOTECA*/}
        <Link to={'/'}>
          <img src='/livro-icon.png' alt='livro-icon'/>
          <p>Minha Biblioteca</p>
        </Link>

        {/*LINK PARA A TELA PEDIDOS*/}
        <Link to={'/'}>
          <img src='/pedidos-icon.png' alt='pedidos-icon'/>
          <p>Pedidos</p>
        </Link>

        <div className="logoContainer">
          <img src="/logo-image.png" alt="logo-image" />
        </div>
    </div>
  )
}
