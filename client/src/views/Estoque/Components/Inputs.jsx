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
    function stopsubmit(ev) {
        ev.preventDefault()
        addBook({titulo,conver,sinopse})
        setConver("")
        setTitulo("")
        setSinopse("")
      }
    return(
        <form onSubmit={stopsubmit}>
       <Inputs title={titulo} 
            setTitle={setTitulo}
       
       />
      <label htmlFor="conver"><p>Capa:</p>
       <input type="text" 
       name="conver" 
       id="conver"
       value={conver}
       onChange={(e)=> setConver(e.target.value) }
       />
       </label>
       <Sinps label="sinopse" sinop={sinopse} setSinop={setSinopse}/>
       
     <button type='submit'>Adicionar á Biblioteca</button>
     </form>
    )
}