/*
  CRIADO POR: GUILHERME HENRIQUE PORTO DOS SANTOS
  EMAIL: guilhermeportosantos1@gmail.com
*/

/////////////////////////////////////////////
// ROTA PARA A PAGINA DE EDIÇÃO DE USUARIO //
/////////////////////////////////////////////




import React from 'react'
import { useParams } from 'react-router-dom'

export default function EditUser() {

  const { userID } = useParams()

  return (
    <div>EditUser id: {userID}</div>
  )
}
