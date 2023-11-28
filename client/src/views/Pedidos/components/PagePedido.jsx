/*
  CRIADO POR: GUILHERME HENRIQUE PORTO DOS SANTOS
  EMAIL: guilhermeportosantos1@gmail.com
*/

import React from 'react'



import {  useState } from "react"
import Pedidos from './Pedidos'
import Devolvidos from './Devolvidos'
import './style/PagePedidoStyle.css'


 
 
 
 export default function PagePedido(){
   const[open,setOpen]= useState(true)

    
     
     return(
          
          <div className='div_pagePedido'>
          <div className='container_pagePedido'>
            <p onClick={()=> setOpen(current=> !current)} className='p_pagePedido'>Pedidos</p>
          </div>
           { open === true ?  <Pedidos/> : null}
           <div className='container_pagePedido'>
             <p onClick={()=> setOpen(current => !current )} className='p_pagePedido' >Devolvidos</p>
           </div>
          {open === false ? <Devolvidos/> : null}
          </div>
          
          

     )
 }