import { useState } from 'react'
import Tela_de_Login from './Componentes/login/logins'
import { Outlet } from 'react-router-dom'
import Teste from './Componentes/login/texte'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Teste/>
    </>
  )
}

export default App
