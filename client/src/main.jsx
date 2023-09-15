import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider,Router} from 'react-router-dom'


//paginas 
import Validar from './Componentes/login/routes/validar.jsx'
import Tela_de_Login from './Componentes/login/logins.jsx'
import Teste from './Componentes/login/texte.jsx'

const router = createBrowserRouter([
   {element: <App/>,
      children:[
        {
          path:"/",
          element: <Tela_de_Login/>
        },{
          path:"/validar",
          element: <Validar/>
        },
        {
           path:"/test",
           element: <Teste/>
        }
       

      ]
  
  }
])
 




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
< RouterProvider  router= {router}/>
  </React.StrictMode>,
)