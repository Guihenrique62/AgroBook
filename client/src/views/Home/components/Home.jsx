/*
  CRIADO POR: Fillype da Silva Macedo Cunha
  EMAIL: fillypecunha@gmail.com
*/

/////////////////////
// ROTA PARA A HOME //
/////////////////////


import { Link } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import "../style/home.css";
import listAllBooks from "../../../controllers/listAllBooks";
import filtroLivros from "./script/filtroLivros";
import Loader from "../../../commun_Components/Loader/Loader";

export default function Home() {
  let [bookAcao, setBookAcao] = useState([]);
  let [bookComedia, setBookComedia] = useState([]);
  let [bookRomance, setBookRomance] = useState([]);
  let [loading, setLoading] = useState(true)

  useEffect(() => {
    listAllBooks().then((listLivros) => {
      filtroLivros(listLivros,setBookAcao,setBookComedia,setBookRomance); 
      setLoading(false); // Define o carregamento como concluído após receber a resposta da API
    });
  }, []);

  return (

    loading ? (<Loader />) : 
  
    (<div className="booksContainer">

      <div className="action-books-container">

        <h2 className="title-genero">Ação</h2>

        {bookAcao.map((book) => (
          <div key={book._id} className="card-home" >

            <Link to={`book/${book._id}`}>
              <img className="home-imagem" src={book.capa} alt="" />
              <div className="div-title">
                <p className="titulo-book">{book.titulo}</p>
              </div>

            </Link>

          </div>
        ))}
      </div>


      <div className="comedian-books-container">

        <h2 className="title-genero">Comedia</h2>
        {bookComedia.map((book) => (
          <div key={book._id} className="card-home" >

            <Link to={`book/${book._id}`}>
              <img className="home-imagem" src={book.capa} alt="" />
              <div className="div-title">
                <p className="titulo-book">{book.titulo}</p>
              </div>
            </Link>

          </div>
        ))
        }
      </div>

      <div className="romantic-books-container">
        <h2 className="title-genero">Romance</h2>

        {
          bookRomance.map((book) => (
            <div key={book._id} className="card-home" >

              <Link to={`book/${book._id}`}>
                <img className="home-imagem" src={book.capa} alt="" />
                <div className="div-title">
                  <p className="titulo-book">{book.titulo}</p>
                </div>

              </Link>

            </div>
          ))
        }
      </div>
    </div>)
  )

}
