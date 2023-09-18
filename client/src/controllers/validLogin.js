export default async function validLogin(e) {
  e.preventDefault();
  let data = {};

  await axios
    .post("http://20.226.73.46:57601/singin/valid", data, {
      // tem que ver com o jean se ele fez alguma modificação na api de autenticar login
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.status);
    })
    .catch((err) => {
      console.log(err.response.status);
      console.log(err);
    });
}
