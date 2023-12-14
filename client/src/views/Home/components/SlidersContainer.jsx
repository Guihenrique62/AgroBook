import React, { useEffect, useState } from 'react'
import "../style/home.css";
import listAllBooks from "../../../controllers/listAllBooks";
import filtroLivros from "./script/filtroLivros";
import { Link } from 'react-router-dom';

export default function SlidersContainer() {
    let [bookAcao, setBookAcao] = useState([]);
    let [bookComedia, setBookComedia] = useState([]);

    useEffect(() => {
        listAllBooks().then((listLivros) => {
          filtroLivros(listLivros,setBookAcao,setBookComedia); 
        });
      }, []); 
  return (
    <><h2 className="title-genero">Ação</h2>
      <div className="slider-container-books">
        <div className="slider-books">
          {bookAcao.map((book) => (
            <div key={book._id} className="card-home" >
              <Link to={`book/${book._id}`} className="book-link">
                <img className="home-imagem" src={book.capa} alt="" />
                <div className="div-title">
                  <p className="titulo-book">{book.titulo}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <h2 className="title-genero">Comedia</h2>
      <div className="slider-container-books">
        <div className="slider-books">
          {bookComedia.map((book) => (
            <div key={book._id} className="card-home" >
              <Link to={`book/${book._id}`} className="book-link">
                <img className="home-imagem" src={book.capa} alt="" />
                <div className="div-title">
                  <p className="titulo-book">{book.titulo}</p>
                </div>
              </Link>
            </div>
          ))
          }
        </div>
      </div>
      
    </>
  )
}
