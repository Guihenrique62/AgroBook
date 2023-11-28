import { createContext, useContext, useState } from "react";
import {
  format,
  formatDistance,
  formatRelative,
  subDays,
  parseISO,
} from "date-fns";
import { Link } from "react-router-dom";
import "./style/pedidoPrincipal.css";

export default function Pedidos() {
  const pedidos_ = [
    {
      codigo: "ok",
      resposta: "Sua solicitação foi aceita",
      mensagem: "Lista de registros recuperada com sucesso",
      data_base: {
        dataBase: "books",
        collectionName: [
          {
            collection: "pedidos",
          },
          {
            from: "usuarios",
            localField: "usuario",
            foreignField: "_id",
            as: "user",
          },
          {
            from: "livros",
            localField: "livro",
            foreignField: "_id",
            as: "book",
          },
        ],
        filter: [
          {
            $match: {
              status: {
                $in: [0, 1, 2, 3, 4, 5],
              },
            },
          },
          {
            $lookup: {
              from: "usuarios",
              localField: "usuario",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $lookup: {
              from: "livros",
              localField: "livro",
              foreignField: "_id",
              as: "book",
            },
          },
          {
            $limit: 99,
          },
        ],
        sortFild: {},
        limitFild: 99,
        result: [
          {
            _id: "6552cd539d893a4597dfbfcd",
            livro: "6552cd2f9d893a4597dfbfcb",
            usuario: "652df7076638ebf86ae252c3",
            status: 2,
            data_aluguel: "2023-11-14T01:28:50.796Z",
            data_vencimento: "2023-11-14T01:27:06.817Z",
            entregou: 0,
            recebeu: 0,
            user: [
              {
                _id: "652df7076638ebf86ae252c3",
                nome: "JEAN CLEIDSON PEREIRA RODRIGUES",
                documento: 70460827154,
                email: "jeantng2016@gmail.com",
                senha: "0f3f2c85a67b613214b4c95066f622b9",
                cargo: 0,
                status: 1,
                resetar_senha: 0,
              },
            ],
            book: [
              {
                _id: "6552cd2f9d893a4597dfbfcb",
                titulo: "Menino Maluquinho",
                capa: "https://www.ira-sme.net/wp-content/themes/consultix/images/no-image-found-360x260.png",
                sinopse: "ai aia i",
                paginas: 120,
                categorias: ["ação", "comedia", "drama"],
                autor: "Guilherme",
                idioma: "inglês",
                data_lancamento: "2023-11-14T01:27:06.817Z",
                total_estoque: 1,
                registro_criado_em: "2023-11-14T01:28:14.136Z",
                registro_atualizado_em: "2023-11-14T01:28:14.136Z",
              },
            ],
          },
          {
            _id: "655ab45d458c36acc75d4047",
            livro: "6552cd2f9d893a4597dfbfcb",
            usuario: "652df7076638ebf86ae252c3",
            status: 1,
            data_aluguel: "2023-11-20T01:20:29.188Z",
            data_vencimento: "2023-11-14T01:27:06.817Z",
            entregou: 0,
            recebeu: 0,
            user: [
              {
                _id: "652df7076638ebf86ae252c3",
                nome: "JEAN CLEIDSON PEREIRA RODRIGUES",
                documento: 70460827154,
                email: "jeantng2016@gmail.com",
                senha: "0f3f2c85a67b613214b4c95066f622b9",
                cargo: 0,
                status: 1,
                resetar_senha: 0,
              },
            ],
            book: [
              {
                _id: "6552cd2f9d893a4597dfbfcb",
                titulo: "Menino Maluquinho",
                capa: "https://www.ira-sme.net/wp-content/themes/consultix/images/no-image-found-360x260.png",
                sinopse: "ai aia i",
                paginas: 120,
                categorias: ["ação", "comedia", "drama"],
                autor: "Guilherme",
                idioma: "inglês",
                data_lancamento: "2023-11-14T01:27:06.817Z",
                total_estoque: 1,
                registro_criado_em: "2023-11-14T01:28:14.136Z",
                registro_atualizado_em: "2023-11-14T01:28:14.136Z",
              },
            ],
          },
          {
            _id: "655aba85458c36acc75d4056",
            livro: "655aaf014a71d4e74a8f36a1",
            usuario: "652df7076638ebf86ae252c3",
            status: 1,
            data_aluguel: "2023-11-20T01:46:45.446Z",
            data_vencimento: "2023-11-14T01:27:06.817Z",
            entregou: 0,
            recebeu: 0,
            user: [
              {
                _id: "652df7076638ebf86ae252c3",
                nome: "JEAN CLEIDSON PEREIRA RODRIGUES",
                documento: 70460827154,
                email: "jeantng2016@gmail.com",
                senha: "0f3f2c85a67b613214b4c95066f622b9",
                cargo: 0,
                status: 1,
                resetar_senha: 0,
              },
            ],
            book: [
              {
                _id: "655aaf014a71d4e74a8f36a1",
                titulo: "Jean",
                capa: "https://www.ira-sme.net/wp-content/themes/consultix/images/no-image-found-360x260.png",
                sinopse: "O senhor dos aneis....",
                paginas: 120,
                categorias: ["ação", "comedia", "drama"],
                autor: "Guilherme",
                idioma: "Portugues",
                data_lancamento: 1694540743262,
                total_estoque: 1,
                registro_criado_em: "2023-11-20T00:57:37.405Z",
                registro_atualizado_em: "2023-11-20T00:57:37.405Z",
              },
            ],
          },
        ],
      },
    },
  ];

  const [open, setOpen] = useState(true);

  const getStatusString = (status, text, style) => {
    switch (status) {
      case 0:
        return { text: "Aguardando Aprovação ", style: { color: "yellow" } };
      case 1:
        return {text:"Alugado",style: {color: "blue"}} ;
      case 2:
        return {text: "Entregue", style: {color: "green"} } ;
        case 3:
            return {text: "Vencido", style: {color: "orange"} } ;
        case 4:    
            return {text: "Recusado", style: {color: "green"} } ;    
      default:
        return "Desconhecido";
    }
  };

  //         STATUS DO PEDIDO

  // 0 = AGUARDANDO
  // 1 = ALUGADO
  // 2 = ENTREGUE
  // 3= VENCIDO
  // 4 = RECUSADO
  const formatDate = (datas) => {
    return format(parseISO(datas), "dd/MM/yyyy");
  };

  return (
    <div className="container_pedidos">
      <div className="subcontainer_pedidos">
        <table className="tabela">
          <tr>
            <th>Nome:</th>
            <th>Titulo:</th>
            <th>Data de pedido</th>
            <th>Data de Vencimento:</th>
            <th>Status:</th>
          </tr>

          <tr>
            <td>
              <Link to={"pedido/:pedidoID"} className="p_pedidos">
                {pedidos_.map((nome) => {
                  return nome.data_base.result.map((nome_user) => (
                    <div className="div_userName_pedidos">
                      <p>{nome_user.user[0].nome}</p>
                    </div>
                  ));
                })}
              </Link>
            </td>

            <td>
              <Link to={"pedido/:pedidoID"} className="p_pedidos">
                {pedidos_.map((titulo) => {
                  return titulo.data_base.result.map((title_pedido) => (
                    <div className="div_userName_pedidos">
                      <p>{title_pedido.book[0].titulo}</p>
                    </div>
                  ));
                })}
              </Link>
            </td>

            <td>
              <Link to={"pedido/:pedidoID"} className="p_pedidos">
                {pedidos_.map((data_pedido) => {
                  return data_pedido.data_base.result.map(
                    (data_pedido_user) => (
                      <div className="div_userName_pedidos">
                        <p>{formatDate(data_pedido_user.data_aluguel)}</p>
                      </div>
                    )
                  );
                })}
              </Link>
            </td>

            <td>
              <Link to={"pedido/:pedidoID"} className="p_pedidos">
                {pedidos_.map((data_vencimento) => {
                  return data_vencimento.data_base.result.map(
                    (data_vencimento_user) => (
                      <div className="div_userName_pedidos">
                        <p>
                          {formatDate(data_vencimento_user.data_vencimento)}
                        </p>
                      </div>
                    )
                  );
                })}
              </Link>
            </td>

            <td>
              <Link to={"pedido/:pedidoID"} className="p_pedidos">
                {pedidos_.map((dados) => {
                  return dados.data_base.result.map((statu) => (
                    <div className="div_userName_pedidos">
                       <p style={getStatusString(statu.status).style}>
                                {getStatusString(statu.status).text}
                        </p>
                    </div>
                  ));
                })}
              </Link>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
