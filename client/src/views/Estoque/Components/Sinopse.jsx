import Proptypes, { func } from 'prop-types'


Sinps.prototype ={
    sinop: Proptypes.string,
    setSinop: Proptypes.func,
    label: Proptypes.string
}

export default function Sinps(){
    return(
        <label htmlFor={label}>
        <p>sinopse</p>
        <input type="text" 
        name="sinopse" 
        id="sinop" 
        value={sinop}
        onChange={(e)=> setSinop(e.target.value)}
        />
 
        </label>
    )
}