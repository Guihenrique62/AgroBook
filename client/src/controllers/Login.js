import axios from "axios";

export default async function Login(email, senha) {
  try {
    let data = {
      email: email,
      senha: senha,
    };
    //esse Data tem que vir la dos input, vou deixar assim por enquanto

    const resposta = await axios
      .post(
        "http://20.226.73.46:57601/auth/singin", // aqui eu to fazendo requisição direto pro servidor, depois voce coloca para o seu localhost, pq tudo q vc fizer alteração vc testa no local, no server é so depois do Jean da um git pull lá
        data,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        return res.status;
      })
      .catch((err) => {
         return err = 401;
      });

    console.log(resposta);
    return resposta;
  } catch (err) {
    return [{}];
  }
}
