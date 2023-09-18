import { useState } from "react"
import { Link } from "react-router-dom"
import Menu from "./menu"



export default function Validar({ok}){
    const[newSenha, setnewSenha]= useState("")
    const[salvandoSenha, setsalvandoSenha]=useState([])
    const[mensageApi, setmensageApi]= useState("")

    let createPassowrd= async (ev)=>{
        ev.preventDefalt()
        const novasenha= newSenha
        setsalvandoSenha = [...salvandoSenha, { adcionarnova: novasenha}];
        setnewSenha("")
        return listUsers

    }

     //lista usuarios
     let listUsers = async (e) => {
        e.preventDefault();
    
        try {
          let data = {
            filter: {
              email: { $regex: "a", $options: "i" },
              resetar_senha: 1,
            },
            sort: {
              _id: -1,
            },
            limit: 10,
          };
    
          const resposta = await axios.post(
            "http://localhost:57601/api/user/list_user",
            data,
            {
              withCredentials: true,
            }
          );
    
          console.log(resposta);
        } catch (err) {
          console.log(err.response.status, err.response.data.mensagem);
        }
      };


if (ok=== "Email ou senha incorreto, revise os dados e tente novamente") {
     return(
        <div>
            <h2>REDEFINE sua senha</h2>
            <p>insfira sua nova senha</p>
            <input 
            type="password" 
            name="senha" 
            id="senha"
            onChange={(ev => setnewSenha(ev.target.value))}
             />
           <Link to={"/menu"}> <button  onClick={createPassowrd} > trocar de senha </button></Link>
        </div>
    )
}else{
    {<Menu/>}
    
}


   
}
