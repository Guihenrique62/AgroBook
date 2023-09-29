import { useState } from "react"
import Proptypes, { func } from 'prop-types'


    Formulario.prototype ={
        addBook: Proptypes.func
    }
   
export default function Formulario({addBook}){
    const [ sinopse, setSinopse]= useState("")
    const [conver, setConver] = useState("")
    const [titulo, setTitulo]= useState("")
    const [author, setAuthor]= useState("")
    const[ idioma,setidioma]=useState([""])
    const[pag, setPag]=useState("")
    const[quantidade,setQuantidade]=useState("")
    const[genero, SetGenero]=useState("")
    function stopsubmit(ev) {
        ev.preventDefault()
        addBook({titulo,conver,sinopse})
        setConver("")
        setTitulo("")
        setSinopse("")
      }
    return(
        <form onSubmit={stopsubmit}>
      
        <label htmlFor="name">
        <p>Titulo</p>
        <input type="text" 
        name="name" 
        id="name"
        value={titulo}
        onChange={(e)=> setTitulo(e.target.value)}
        />
      </label>
      <label htmlFor="conver"><p>Capa:</p>
       <input type="text" 
       name="conver" 
       id="conver"
       value={conver}
       onChange={(e)=> setConver(e.target.value) }
       />
       </label>
       <label htmlFor="autor"><p>Autor</p>
        <input type="text" 
        name="autor" 
        id="autor"
        value={author}
        onChange={(e)=>setAuthor(e.target.value)}
        />
       </label>
       <label htmlFor="idioma"><p>Idioma</p>
        <select name="idioma" id="idioma" onChange={(e)=>setidioma(e.target.value)}>
            <option value={idioma}>Portugues</option>
            <option value={idioma}>Ingles</option>
        </select>
       </label>

       <label htmlFor="pag"><p>quantidade de paginas</p>
        <input type="number" 
        name="pag" 
        id="pag"
        value={pag}
        onChange={(e)=>setPag(e.target.value)}
         />
       </label>
       <label htmlFor="qtdEstoque"><p>Estoque</p>
        <input type="number" 
        name="qtdEstoque" 
        id="qtdEstoque"
        value={quantidade}
        onChange={(e)=> setQuantidade(e.target.value)}
        />

       </label>
       <label>
        <p>sinopse</p>
        <input type="text" 
        name="sinopse" 
        id="sinop" 
        value={sinopse}
        onChange={(e)=> setSinopse(e.target.value)}
        />
        </label>
       <select name="" id="" 
       style={{ width: '100%', padding: '10px', fontSize: '16px' }}
       onChange={(e)=>SetGenero(e.target.va)}
       >
       <option value={genero}>Açao</option>
        <option value={genero}>Romance</option>
        <option value={genero}>comedia</option>
        <option value={genero}>ficçao</option>

       </select>
       
     <button type='submit'>Salvar</button>
     </form>
    )
}