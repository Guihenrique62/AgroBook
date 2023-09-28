import { useState } from "react"
import Proptypes, { func } from 'prop-types'
import Inputs from "./TitleBook"
import Sinps from "./Sinopse"

    Formulario.prototype ={
        addBook: Proptypes.func
    }
   
export default function Formulario({addBook}){
    const [ sinopse, setSinopse]= useState("")
    const [conver, setConver] = useState("")
    const [titulo, setTitulo]= useState("")
    const [author, setAuthor]= useState("")
    const[ portugues,setPortugues]=useState("portugues")
    const[ingles,setIngles]=useState("ingles")
    const[pag, setPag]=useState("")
    const[quantidade,setQuantidade]=useState("")
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
        <select name="idioma" id="idioma">
            <option value={portugues} onClick={(e)=>setPortugues(e.target.value)}>Portugues</option>
            <option value={ingles} onClick={(e)=> setIngles(e.target.value)} >Ingles</option>
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
        <input type="text" placeholder="açao"/>


       
     <button type='submit'>Adicionar á Biblioteca</button>
     </form>
    )
}