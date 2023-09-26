import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Router } from "react-router-dom";

//paginas
import RegisterUser from './Componentes/cadastro_usuarios/RegisterUser.jsx'
import Home from './Componentes/tela_inicial/tela_inicial.jsx'
import Texte from './Componentes/login/texte.jsx'
import Validar from './Componentes/resetar_senha/validar.jsx'
import Tela_de_Login from "./Componentes/login/logins.jsx";
import CreateUser from "./Componentes/cadastro_usuarios/createUser.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Tela_de_Login />,
      },
      {
        path: "/validar",
        element: <Validar ok={undefined} />,
      },
      {
        path: "/test",
        element: <Texte/>,
      },
      {
        path: "/home",
        element: <Home/>,
      },
      {
        path:'/registerUser',
        element: <RegisterUser/>,
      },
      {
        path:'/registerUser/new',
        element: <CreateUser/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
