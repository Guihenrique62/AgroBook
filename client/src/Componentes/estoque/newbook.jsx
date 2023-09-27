import Proptypes, { func } from 'prop-types'

Inputs.prototype = {
    value: Proptypes.string,
    SetTitulo:Proptypes.func
    
}


export default function Inputs({title,setTitle}){

    return(
        <label htmlFor="name">
        <p>Titulo</p>
        <input type="text" 
        name="name" 
        id="name"
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
        />
      </label>
)
}