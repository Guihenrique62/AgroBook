
import Estoque_Book from './bookEstoque'
import Formulario from './inputs'
import addandRemove from './functions'


function Estoque() {
  const{ book, addBook,removeBook}= addandRemove()
  return (
    <>
  
      <h1>BIBLIOTECA DE JOGOS</h1>
      <Formulario addBook={addBook}
      />
     <div className='book'>
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

export default Estoque
