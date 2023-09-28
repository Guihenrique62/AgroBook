/*
  CRIADO POR: GUILHERME HENRIQUE PORTO DOS SANTOS
  EMAIL: guilhermeportosantos1@gmail.com
*/


import { createBrowserRouter } from "react-router-dom";
import React from "react";

//paginas
import UsersLayout from "./views/Cadastro_Usuarios/UsersLayout";
import UsersPage from "./views/Cadastro_Usuarios/Components/UsersPage";
import LoginLayout from "./views/Tela_Login/LoginLayout";
import Login from "./views/Tela_Login/Components/Tela_Login";
import Validar from "./views/Tela_Login/Components/validar";
import Home from "./views/Home/components/Home";
import HomeBook from "./views/Home/components/HomeBook";
import CreateUser from "./views/Cadastro_Usuarios/Components/CreateUser";
import EditUser from "./views/Cadastro_Usuarios/Components/EditUser";
import HomeLayout from "./views/Home/HomeLayout";
import EstoqueLayout from "./views/Estoque/EstoqueLayout";
import EstoquePage from "./views/Estoque/Components/EstoquePage";
import PedidosLayout from "./views/Pedidos/PedidosLayout";
import PagePedido from "./views/Pedidos/components/PagePedido";


const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginLayout/>,
        children: [
            {index:true, element: <Login/>},
            {path: "validar", element: <Validar ok={undefined}/> }
        ]
    },
    {
        path: "/home",
        element: <HomeLayout/>,
        children: [
            {index: true, element: <Home/>},
            {path: "book/:bookID", element: <HomeBook/>},
            
        ]
    },
    {
        path: "/user",
        element: <UsersLayout/>, //Layout Pagina Users
        children: [
            {index: true, element: <UsersPage/>},//Rota main de Users
            {path: "newUser", element: <CreateUser/>}, // Rota create User
            {path: "editUser/:userID", element: <EditUser/>} // Rota Edit User
        ] 
    },
    {
        path: "/storage",
        element: <EstoqueLayout/>,
        children: [
            {index: true, element:<EstoquePage/>}
        ]
    },
    {
        path: "/orders",
        element: <PedidosLayout/>,
        children: [
            {index:true, element: <PagePedido/>}
        ]
    }
])

export default router