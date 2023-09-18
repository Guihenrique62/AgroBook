import { useState , useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Validar from "./routes/validar";
import { useNavigate } from "react-router-dom";
import Menu from "./routes/menu";

export default function Tela_de_Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [add, setAdd] = useState([]);
  const [mensagem, setMessage] = useState([]);

  // valida
  let validLogin = async (e) => {
    e.preventDefault();
    var addEmail = email;
    var addSenha = senha;
    setAdd = [...add, { adcionarEmail: addEmail, adcionarSenha: addSenha }];
    setSenha = "";
    setEmail = "";

    try {
      let data = "";

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        withCredentials: true,
        url: "http://20.226.73.46:57601/auth/singin/valid",
        headers: {
          Accept: "*/*",
        },
        data: data,
      };
      axios
        .request(config)
        .then((response) => {
          console.log((JSON.stringify(response.data)));
          
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  

  //realiza login
  let handleSubmit = async (e) => {
    e.preventDefault();
    // REDEFINE A MENSAGEM QUE APARECE PARA O USUARIO
    setEmail("");
    setSenha("");
    setMessage("");
    try {
      let data = JSON.stringify({
        email: email,
        senha: senha,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        withCredentials: true,
        url: "http://localhost:57601/auth/singin",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        data: data,
      };
      const navegar= useNavigate()

      await axios
        .request(config)
        .then((response) => {
          console.log(response.data.mensagem);
          setMessage(response.data.mensagem); 
          //setStatus(response.data.mensagem)
          const dados = {response:true}
          if (dados.response) {
            navegar("/menu")
          }
          
        })
        .catch((error) => {
          console.log(error.response.data.mensagem);
          setMessage(error.response.data.mensagem);
          setTrocar(error.response.data.mensagem)
         
        });
    } catch (err) {
      console.log(err);
    }    
       
    
    validLogin;
    
  };
  



  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">
        <p>Email:</p>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
      </label>
      <label htmlFor="senha">
        <p>Senha:</p>
        <input
          type="password"
          name="senha"
          id="senha"
          minLength="8"
          maxLength="100"
          // pattern="[A-Z a-z]+"
          value={senha}
          onChange={(ev) => setSenha(ev.target.value)}
        />
      </label>
      <button type="subimt">Logar</button>

      {senha.length !== 8 ? <p>AH senha deve ter 8 digitos </p> : ""}

      <div>{ <Link to={"/validar"}>{mensagem ? mensagem : "null"}</Link> }</div>
    </form>
  );
}
