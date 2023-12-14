/*
  CRIADO POR: Guilherme Henrique Porto dos Santos
  EMAIL: guilhermeportosantos1@gmail.com
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
      setLoading(false);
    });
  }, []);

  return (

    loading ? (<Loader />) : 
    
    (<div className="booksContainer"> 

      <h2 className="title-genero">Ação</h2>
      <div className="slider-container-books">
        <div className="slider-books">
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
        <div className="slider-scrollbar">
        <div className="scrollbar-track">
            <div className="scrollbar-thumb">
              
            </div>
        </div>
      </div>
      </div>
      
      


      <h2 className="title-genero">Comedia</h2>
      <div className="slider-container-books">
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

      <h2 className="title-genero">Romance</h2>
      <div className="slider-container-books">  
        {bookRomance.map((book) => (
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
