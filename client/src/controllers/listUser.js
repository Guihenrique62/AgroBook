import axios from "axios";

export default async function listarUsuario() {

  let data = {
    filter: {
      email: { $regex: "@", $options: "i" },
    },
    sort: {
      _id: -1,
    },
    limit: 9999,
  };

  await axios
    .post("http://localhost:57601/api/user/list_user", data, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err);
    });
}
