import React from 'react'
import MenuLateral from '../menu_lateral/MenuLateral'

export default function RegisterUser() {
  return (
    <div>
      <div>
        <MenuLateral actualPath={'/registerUser'} isOpen={false} user={undefined}/>
      </div>
    </div>
  )
}
