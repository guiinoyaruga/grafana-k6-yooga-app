// Esse teste tem como propósito testar a requisição do histórico de vendas

import http from "k6/http";
import { sleep, check } from "k6";
import Login from "../requests/login-request.js";
import { group } from "k6";
const login = new Login();

export const options = {
  vus: 10,
  duration: "20s",
};

export function setup() {
  login.realizarLogin();

  return login.receberToken();
}

export default function (authToken) {
  let codigoProduto;

  group("Acessar lista de produtos", () => {
    const url = "https://api2.yooga.com.br/v2/produtos?"

    const listarProdutos = http.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    check(listarProdutos, {
      "Status 200 Ok!": (r) => r.status === 200,
      "Lista de produtos recebida": (r) => r.body.length > 0,
    });
  })

  group("Criar produto", () => {
    const url = "https://api2.yooga.com.br/v2/produtos";

    const payload = JSON.stringify({
      descricao: "PRODUTO 1",
      valor_venda: 1,
    });

    const criarProduto = http.post(url, payload, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    check(criarProduto, {
      "Status 200 Ok!": (r) => r.status === 200,
      "Produto criado": (r) => r.body.includes("PRODUTO 1"),
    });
    codigoProduto = JSON.parse(criarProduto.body);
  });

  group("Deletar produto", () => {
    const url = "https://api2.yooga.com.br/v2/produtos/delete";

    const payload = JSON.stringify({
      products: [codigoProduto.codigo],
    });

    const produtoDeletado = http.post(url, payload, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
    check(produtoDeletado, {
      "Status 201 Ok!": (r) => r.status === 201,
      "Produto deletado": (r) => r.body.includes("Produtos alterados!"),
    });
  });
  sleep(1);
}
