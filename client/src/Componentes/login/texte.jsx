import { useState } from "react";
import axios from "axios";

export default function Teste() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");

  // VALIDA O LOGIN
  let validLogin = async (e) => {
    e.preventDefault();

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
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // RELAIZA O LOGIN
  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = JSON.stringify({
        email: "fillypecunha@gmail.com",
        senha: "12345678",
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://20.226.73.46:57601/auth/singin",
        headers: {
          "Content-Type": "application/json",
        },
      };

      // await axios
      //   .request(config)
      //   .then((response) => {
      //     console.log(JSON.stringify(response.data));
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      axios.post("http://20.226.73.46:57601/auth/singin", data, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={mobileNumber}
          placeholder="Mobile Number"
          onChange={(e) => setMobileNumber(e.target.value)}
        />

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
      <form onSubmit={validLogin}>
        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}
