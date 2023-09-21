import { useState } from 'react'
import Tela_de_Login from './Componentes/login/logins'
import { Outlet, Router } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Login from './controllers/Login'



function App() {
  
  return (
    <>
     <Outlet/>
  
    </>
  )
}

export default App
