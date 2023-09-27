
import { useState } from "react";
import menuInicial from "../../controllers/menuInicial";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import timesDeFutebol from "./test";


export default function Home(){
    const[book,SetBooks]=useState([])
    const[times, setTimes]=useState([])
    let resApi= async ()=>{
          respostadApi = menuInicial()
    menuInicial
        .then((respostadApi)=>
        {
            SetBooks(respostadApi)
        }).cath((err)=>{
            console.log(err)
        })
    }
    
    let pesquisar = async (titulo)=>{
    const arrayTimes= timesDeFutebol.filter(time => time.nome.includes(times))
    }
const arr=timesDeFutebol
return(
    <div className='teste'>
         <h2>SEJA BEM VINDO</h2>
         <Header search={pesquisar}/>
         <p>
            <input type="search" 
            name="serch" 
            id="serch" 
            value={times}
            onChange={(ev)=>{setTimes(ev.target.value)}}

            />
         </p>
         <ul>
            <li>
                {arr.map((times)=>
               <ul key={times.nome}>
                <li>
                    {times.nome}
                  </li>
                  <li>
                    {times.pais}
                  </li>
                    <Link to={`/books ${times.nome}`} >editar</Link>
               </ul>
                  

              
                )}
            </li>
         </ul>
    {book.length===0?"carregando":(
        book.map((books)=>
        <div key={books.id} >
            <h2>{books.titulo}</h2>
            <div>
                {books.capa}
            </div>
            <Link to={`/books/${books.id}`  }><button>Editar</button></Link>
    </div>
        ))}
    

                    <Link to={"/estoque"} >Estoque</Link>

    </div>
    )
       

    }
