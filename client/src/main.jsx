import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Router } from "react-router-dom";

//paginas
import Validar from "./Componentes/resetar_senha/validar.jsx"
import Tela_de_Login from "./Componentes/login/logins.jsx";
import Teste from "./Componentes/login/texte.jsx";
import RegisterUser from "./Componentes/cadastro_usuarios/RegisterUser.jsx";
import Home from "./Componentes/tela_inicial/tela_inicial.jsx";

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
        element: <Teste />,
      },
      {
        path: "/home",
        element: <Home/>,
      },
      {
        path:"/error",
        element: <Error/>
      },
      {
        path:'/registerUser',
        element: <RegisterUser/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
