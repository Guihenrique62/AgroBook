/*
  CRIADO POR: GUILHERME HENRIQUE PORTO DOS SANTOS
  EMAIL: guilhermeportosantos1@gmail.com
*/

////////////////////////////////
// ROTA LAYOUT PARA A HOME //
////////////////////////////////

import React from 'react'
import Header from '../../commun_Components/header/Header'
import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
  return (
    <>
        <Header user={undefined} search={undefined}/>
        <Outlet/>
    </>
  )
}
