/*
  CRIADO POR: Guilherme Henrique Porto dos Santos
  EMAIL: guilhermeportosantos1@gmail.com
*/

/////////////////////
// ROTA PARA A HOME //
/////////////////////


import React, { useRef, useState, useEffect } from "react";
import "../style/home.css";
import listAllBooks from "../../../controllers/listAllBooks";
import Loader from "../../../commun_Components/Loader/Loader";
import SlidersContainer from "./SlidersContainer";

export default function Home() {
  let [books,setBooks] = useState([])
  let [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    listAllBooks().then((listLivros) => {
      setBooks(listLivros)
      setLoading(false);
    });
  }, []);   

  const filteredBooks = books.filter((book) => book.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || book.categorias.map(category => category.toLowerCase().includes(searchTerm.toLowerCase())));

  return (

    loading ? (<Loader />) : 
    
    (<div className="booksContainer"> 

        <div className="SearchBooksContainer">
          <input
            type="text"
            placeholder="Buscar por Titulo ou categoria"
            className="inputSearchBook"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="buttonSearchBook">
            <i className="bx bx-search"></i>
          </button>
        </div>
      
      {searchTerm ?
      (<></>) : 
      ( <SlidersContainer/>)
    } 
</div>
      )
  )

}
