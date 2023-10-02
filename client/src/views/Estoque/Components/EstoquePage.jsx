
import Estoque_Book from './BookEstoque'
import addandRemove from '../scripts/functions'
import React from 'react'
import { Link } from 'react-router-dom'

function EstoquePage() {
  const{ book,removeBook}= addandRemove()
  return (
    <>
  
      <h1></h1>
      
     <div>
      <div>
       <Link to="formEstoque" ><button>novo</button></Link> 
      </div>
      {book.map((books)=>{
        return(
          <Estoque_Book key={books.id}
                titulo={books.titulo}
                conver={books.conver}
                onremove= {()=> removeBook(books.id)}
          />
          
        )
      })}
          
     </div>
     
    </>
  )
}

export default EstoquePage
