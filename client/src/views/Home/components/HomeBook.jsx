/*
  CRIADO POR: Fillype da Silva Macedo Cunha
  EMAIL: fillypecunha@gmail.com
*/


import React from "react";
import { useParams } from "react-router-dom";
import "../style/homeBook.css"

export default function HomeBook() {

  const { bookID } = useParams() //Pega o ID passado na URL

  const books = []

  return (
    <div className="container-homeBook">

      {books.map((book) => (

        <div className="homeBook">

          <div key={book._id} className="div_infor">
            <img src={book.capa} alt="erro" srcset="" />

            <div className="div_conteudo">
              <p>{book.titulo}</p>
              <p> Numero de paginas:{book.paginas}</p>
              <p>Autor:{book.autor}</p>
              <p>Data de lançamento:{book.data_lancamento}</p>
              <p>Idioma: {book.idioma}</p>
            </div>
          </div >

          <div className="div_descricao">
            <p>
              <h2>Sinopse:</h2>{book.sinopse}
            </p>
            <br />
            <p>
              categorias: {book.categorias}
            </p>
          </div>

          <div>
            <button className="button_pedido_home">Fazer pedido</button>
          </div>

        </div>

      ))}

    </div>

  )
}
