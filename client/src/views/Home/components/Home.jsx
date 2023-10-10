/*
  CRIADO POR: Fillype da Silva Macedo Cunha
  EMAIL: fillypecunha@gmail.com
*/

/////////////////////
// ROTA PARA A HOME //
/////////////////////



import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import "../style/home.css";




const books = [{
    "_id": {
      "$oid": "64fbe4bc1a2ce80351f72b3b"
    },
    "titulo": "teste fillype",
    "capa": "https://upload.wikimedia.org/wikipedia/pt/thumb/8/87/Ringstrilogyposter.jpg/250px-Ringstrilogyposter.jpg",
    "sinopse": "O Senhor dos Anéis (no original em inglês, The Lord of the Rings) é uma trilogia cinematográfica dirigida por Peter Jackson com base na obra-prima homónima de J. R. R. Tolkien. Os três filmes foram rodados em simultâneo na Nova Zelândia,[1] faturaram cerca de 3 bilhões (US$ 2.925.155.189) de dólares de receitas conjuntas de bilheteira[2] e foram galardoados com 17 Oscars, entre os 30 para os quais foram nomeados.[3] e é a franquia cinematográfica mais premiada da história",
    "paginas": 145,
    "categorias": [
      "ação",
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
    "titulo": "as aventuras do peter pan o misterio do meu no seu cu ",
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
    },
  },{
    "_id": {
      "$oid": "6500bbe0abe3c415baf05d9f"
    },
    "titulo": "testee",
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
    },
  }]

  const bookAcao= books.filter((book)=>book.categorias[0]==="ação")
  const bookComedia= books.filter((book)=>book.categorias[0]==="comedia")
  const bookRomance= books.filter((book)=>book.categorias[0]==="Romance")
 

 

export default function Home() {
  const slider= useRef(null)

  const goleft= (e)=>{
    e.preventDefault()
    console.log(slider.current.offsetWidth)
    slider.current.scrollLeft-=slider.current.offsetWidth
   }
   const goRight= (e)=>{
    e.preventDefault()
    console.log(slider.current.offsetWidth)
    slider.current.scrollLeft+=slider.current.offsetWidth
   }


    return (

      /* div booksContainer pai que contem todos elementos */
           
              <div className="booksContainer">
              
                {/* div que controla formato movimento de cada card */}
              
              
                    <div className="slider-home" >
                      <h2 className="title-genero">AÇÃO</h2>
                      {/* div book-slider que controla proporçao de cada card dos livros */}
                        
                      <div className="teste">
                        <div className="button-teste" >
                            <button onClick={goleft} className="icon-left"><box-icon  name='left-arrow-alt' ></box-icon></button>
                          
                        </div>  
                            <div className="book-slider" ref={slider}>
                            {bookAcao.map((book)=>(
                        
                                <div key={book._id} className="card-home" >
                        
                                {/* div card-home vai ser que controla o tamanho da imagem  */}
                        
                            <Link to={`book/${book._id}`}>
                          <img className="home-imagem" src={book.capa} alt=""  />
                          <div className="div-title">
                            <p className="titulo-book">{book.titulo}</p>
                          </div>
                        
                          </Link>
                        
                              </div>
                       
                         
                      )

          
                      )} 
                      
                      
                      </div>
                      <div className="button-frente">
                        <button onClick={goRight} className="icon-right" ><box-icon  name='right-arrow-alt' ></box-icon></button> 
                      </div>

                    </div> 
                    <h2 className="title-genero">Comedia</h2>

                        <div className="teste">
                        <div className="button-teste" >
                            <button className="icon-left"><box-icon  name='left-arrow-alt' ></box-icon></button>
                          
                        </div> 
                      <div className="book-slider">
                      
                          {bookComedia.map((book)=>(
                          <div key={book._id} className="card-home">
                      
                      
                          <Link to={`book/${book.titulo}`}>
                        <img className="home-imagem" src={book.capa} alt="erro" />
                            <p className="titulo-book">{book.titulo}</p>
                        </Link>
                          </div>
                      
                        )
                      
                        )}
                        </div>
                        <div className="button-frente">
                        <button className="icon-right"><box-icon  name='right-arrow-alt' ></box-icon></button> 
                      </div>
                    </div>
                    

                    <h2 className="title-genero">Romance</h2>

                      <div className="teste">
                      <div className="button-teste" >
                            <button className="icon-left"><box-icon  name='left-arrow-alt' ></box-icon></button>
                          
                        </div> 

                 
                  <div className="book-slider">
                  
                        {bookRomance.map((book)=>(
                            <div key={book._id} className="card-home" >
                          <Link to={`book/${book.titulo}`}>
                            <img className="home-imagem" src={book.capa} alt="" />
                              <p className="titulo-book">{book.titulo}</p>
                          </Link>
                            </div>
                  
                          )
                          )}
                  </div>
                  <div className="button-frente">
                          <button className="icon-right" ><box-icon  name='right-arrow-alt' ></box-icon></button>
                        </div>
                    </div>
                          
                                </div>
                </div>
            
                      
                      
                  )
           


}
