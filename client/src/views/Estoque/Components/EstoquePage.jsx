
import Estoque_Book from './BookEstoque'
import Formulario from './Inputs'
import addandRemove from '../scripts/functions'
import React from 'react'


function EstoquePage() {
  const{ book, addBook,removeBook}= addandRemove()
  return (
    <>
  
      <h1>BIBLIOTECA DE JOGOS</h1>
      <Formulario addBook={addBook}
      />
     <div>
      {book.map((books)=>{
        return(
          <Estoque_Book key={books.id}
                titulo={books.titulo}
                conver={books.conver}
                sinopse= {books.sinopse}
                onremove= {()=> removeBook(books.id)}
          
          />
        )
      })}
     </div>

    </>
  )
}

export default EstoquePage
