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
<<<<<<< HEAD
import createUser from "./Componentes/cadastro_usuarios/createUser.jsx";
import Book from "./Componentes/tela_inicial/bookTest.jsx";
import Estoque from "./Componentes/estoque/estoque.jsx";
=======
import CreateUser from "./Componentes/cadastro_usuarios/createUser.jsx";
>>>>>>> 942305ce85fa577ef7fb64c2aea418c00178dd7d

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
          path:"/book",
          element:<Book/>
      },
      {
        path:'/registerUser',
        element: <RegisterUser/>,
<<<<<<< HEAD
        children: [
          {
            path: 'registerUser/new',
            element: <createUser/>
          }
        ]
        
      },{
         path:'/estoque',
         element:<Estoque/>
      }
     
      
=======
      },
      {
        path:'/registerUser/new',
        element: <CreateUser/>,
      },
>>>>>>> 942305ce85fa577ef7fb64c2aea418c00178dd7d
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
