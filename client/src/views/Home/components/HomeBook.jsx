/*
  CRIADO POR: Fillype da Silva Macedo Cunha
  EMAIL: fillypecunha@gmail.com
*/


import React from "react";
import { useParams } from "react-router-dom";

export default function HomeBook(){

    const { bookID } = useParams() //Pega o ID passado na URL
    
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
      }]

    return(
        <div>
            {books.map((book)=>(

                <div>
                    <div key={book._id}>
                     <h2>{book.titulo}</h2>
                     <p> Numero de paginas:{book.paginas}</p>
                     <p>Autor:{book.autor}</p>
                     <p>Data de lançamento:{book.data_lancamento}</p>
                     <p>Idioma: {book.idioma}</p>
                </div>
                <div>
                    <img src={book.capa} alt="erro" srcset="" />
                    <button>Fazer pedido</button>
                    
                </div>
                <div>
                    <p>
                            sinopse:{book.sinopse}
                    </p>
                    <p>
                            categorias: {book.categorias}
                    </p>
                </div>
                </div>
                
                
               
            ))}
            
        </div>
       
    )
}