/*
  CRIADO POR: Fillype da Silva Macedo Cunha
  EMAIL: fillypecunha@gmail.com
*/
import Estoque_Book from './BookEstoque'
import addandRemove from '../scripts/functions'
import React from 'react'
import { Link } from 'react-router-dom'
import "../style/Estoque.css"

function EstoquePage() {
  const { book, removeBook } = addandRemove()
  const books = [{
    "_id": {
      "$oid": "64fbe4bc1a2ce80351f72b3b"
    },
    "titulo": "Ola mundo2",
    "capa": "https://upload.wikimedia.org/wikipedia/pt/thumb/8/87/Ringstrilogyposter.jpg/250px-Ringstrilogyposter.jpg",
    "sinopse": "O Senhor dos Anéis (no original em inglês, The Lord of the Rings) é uma trilogia cinematográfica dirigida por Peter Jackson com base na obra-prima homónima de J. R. R. Tolkien. Os três filmes foram rodados em simultâneo na Nova Zelândia,[1] faturaram cerca de 3 bilhões (US$ 2.925.155.189) de dólares de receitas conjuntas de bilheteira[2] e foram galardoados com 17 Oscars, entre os 30 para os quais foram nomeados.[3] e é a franquia cinematográfica mais premiada da história",
    "paginas": 145,
    "categorias": [
      "nerd",
      "fatansia",
      "magia"
    ],
    "autor": "O Senhor dos Anéis",
    "idioma": "inglês",
    "data_lancamento": 1008720000,
    "total_estoque": 0,
    "registro_criado_em": 1694229643,
    "registro_atualizado_em": 1694229643
  },
  {
    "_id": {
      "$oid": "6500b5f8ea6fcca875e7d7bd"
    },
    "titulo": "O senhor dos Aneiss",
    "capa": "https://www.ira-sme.net/wp-content/themes/consultix/images/no-image-found-360x260.png",
    "sinopse": "O senhor dos aneis....",
    "paginas": 120,
    "categorias": [
      "ação",
      "comedia",
      "drama"
    ],
    "autor": "Guilherme",
    "idioma": "Portugues",
    "data_lancamento": {
      "$numberLong": "1694540743262"
    },
    "total_estoque": 1,
    "registro_criado_em": {
      "$numberLong": "1694545399974"
    },
    "registro_atualizado_em": {
      "$numberLong": "1694545399974"
    }
  },
  {
    "_id": {
      "$oid": "6500bb6cabe3c415baf05d9d"
    },
    "titulo": "O senhor dos Aneis",
    "capa": "https://www.ira-sme.net/wp-content/themes/consultix/images/no-image-found-360x260.png",
    "sinopse": "O senhor dos aneis....",
    "paginas": 120,
    "categorias": [
      "ação",
      "comedia",
      "drama"
    ],
    "autor": "Guilherme",
    "idioma": "Portugues",
    "data_lancamento": {
      "$numberLong": "1694540743262"
    },
    "total_estoque": 1,
    "registro_criado_em": {
      "$numberLong": "1694546796984"
    },
    "registro_atualizado_em": {
      "$numberLong": "1694546796984"
    }
  },
  {
    "_id": {
      "$oid": "6500bb91abe3c415baf05d9e"
    },
    "titulo": "O senhor dos Anei",
    "capa": "https://www.ira-sme.net/wp-content/themes/consultix/images/no-image-found-360x260.png",
    "sinopse": "O senhor dos aneis....",
    "paginas": 120,
    "categorias": [
      "ação",
      "comedia",
      "drama"
    ],
    "autor": "Guilherme",
    "idioma": "Portugues",
    "data_lancamento": {
      "$numberLong": "1694540743262"
    },
    "total_estoque": 1,
    "registro_criado_em": {
      "$numberLong": "1694546833688"
    },
    "registro_atualizado_em": {
      "$numberLong": "1694546833688"
    }
  },
  {
    "_id": {
      "$oid": "6500bbe0abe3c415baf05d9f"
    },
    "titulo": "Jean",
    "capa": "https://www.ira-sme.net/wp-content/themes/consultix/images/no-image-found-360x260.png",
    "sinopse": "O senhor dos aneis....",
    "paginas": 120,
    "categorias": [
      "ação",
      "comedia",
      "drama"
    ],
    "autor": "Guilherme",
    "idioma": "Portugues",
    "data_lancamento": {
      "$numberLong": "1694540743262"
    },
    "total_estoque": 1,
    "registro_criado_em": {
      "$numberLong": "1694546912951"
    },
    "registro_atualizado_em": {
      "$numberLong": "1694546912951"
    }
  }]
  return (
    <>
      <div className='div_search'>
        <input type="text" className='input_search_home' />
        <button className='button_search_home'><i className='bx bx-search'></i></button>
      </div>



      <div className='div_button_novo' >
        <Link to="formEstoque" ><button className='button_estoque_novo' >novo</button></Link>
      </div>

      <div className='container_estoque'>

        {books.map((book) => {
          return (


            <div className='div_estoque_page' key={book._id}>

              <img className='img_estoque' src={book.capa} alt="err" srcset="" />
              <h2 className='titulo_estoque'>{book.titulo}</h2>
              <div className='div_button_estoque'>
                <Link to={`estoque/${book._id}`} ><button className='button_estoque_editar' >editar</button></Link>
              </div>


            </div>




          )
        })}
      </div>




    </>
  )
}

export default EstoquePage
