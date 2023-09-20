import React from 'react'
import MenuLateral from '../menu_lateral/MenuLateral'

export default function RegisterUser() {
  return (
    <div>
      <div>
        <MenuLateral actualPath={'/registerUser'} user={{
  "_id": {
    "$oid": "650353c79ba693038e773576"
  },
  "email": "jeantng2016@gmail.com",
  "senha": "0f3f2c85a67b613214b4c95066f622b9",
  "cargo": 0,
  "status": 1,
  "documento": {
    "$numberLong": "70460827154"
  },
  "nome": "JEAN RODRIGUES 3",
  "resetar_senha": 0
}}/>
      </div>
    </div>
  )
}
