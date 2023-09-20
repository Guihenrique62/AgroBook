import axios from "axios";

export default async function listarUsuario(e) {
  e.preventDefault();

  let data = {
    filter: {
      nome: { $regex: "gui", $options: "i" },
    },
    sort: {
      _id: -1,
    },
    limit: 100,
  };

  await axios
    .post("http://20.226.73.46:57601/api/user/read_user", data, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
