import React from "react";

export default function EditUserForm({ status, user }) {
  if (status == 1) {
    //valida se o usuário foi passado na prop
    if (!user) {
      console.error("Usuário não passado para o form");
    }
    return (
      <form className="editUserMain">
        <div className="firstcontainerinput">
          <div className="inputName createFormInputs">
            <label htmlFor="nome">
              Nome: <b>*</b>
            </label>
            <input
              type="text"
              name="nome"
              id="nome"
              required
              value={user.nome}
            />
          </div>
          <div className="inputCpf createFormInputs">
            <label htmlFor="cpf">
              Cpf: <b>*</b>
            </label>
            <input
              type="number"
              name="cpf"
              id="cpf"
              required
              value={user.documento}
              disabled
            />
          </div>
        </div>

        <div className="secondcontainerinput">
          <div className="inputEmail createFormInputs">
            <label htmlFor="email">
              E-mail: <b>*</b>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={user.email}
            />
          </div>
          <div className="inputPassword createFormInputs">
            <label htmlFor="senha">
              Senha: <b>*</b>
            </label>
            <input type="password" name="senha" id="senha" required />
          </div>
          <div className="containerCargo ">
            <select>
              <option value={0}>ADMINISTRADOR</option>
              <option value={1}>COLABORADOR</option>
            </select>
          </div>
        </div>

        <div className="logEditUserContainer">
          <p>
            Usuário Criado por GUILHERME HENRIQUE PORTO DOS SANTOS em 01/01/2023
            há 3 meses atrás
          </p>
        </div>

        <div className="thirdcontainerinputedit">
          <span className="desabilitUserButton">Desabilitar</span>
          <button className="saveButton">Salvar</button>
        </div>
      </form>
    );
  } else {
    return (
      <form className="editUserMain">
        <div className="firstcontainerinput">
          <div className="inputName createFormInputs">
            <label htmlFor="nome">
              Nome: <b>*</b>
            </label>
            <input
              type="text"
              name="nome"
              id="nome"
              disabled
              value={user.nome}
            />
          </div>
          <div className="inputCpf createFormInputs">
            <label htmlFor="cpf">
              Cpf: <b>*</b>
            </label>
            <input
              type="number"
              name="cpf"
              id="cpf"
              disabled
              value={user.documento}
            />
          </div>
        </div>

        <div className="secondcontainerinput">
          <div className="inputEmail createFormInputs">
            <label htmlFor="email">
              E-mail: <b>*</b>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              disabled
              value={user.email}
            />
          </div>
          <div className="inputPassword createFormInputs">
            <label htmlFor="senha">
              Senha: <b>*</b>
            </label>
            <input type="password" name="senha" id="senha" disabled />
          </div>
          <div className="containerCargo ">
            <select disabled>
              <option value={0}>ADMINISTRADOR</option>
              <option value={1}>COLABORADOR</option>
            </select>
          </div>
        </div>

        <div className="logEditUserContainer">
          <p>
            Usuário Criado por GUILHERME HENRIQUE PORTO DOS SANTOS em 01/01/2023
            há 3 meses atrás
          </p>
        </div>

        <div className="thirdcontainerinputedit">
          <span className="habiliteUserButton">Habilitar</span>
        </div>
      </form>
    );
  }
}
