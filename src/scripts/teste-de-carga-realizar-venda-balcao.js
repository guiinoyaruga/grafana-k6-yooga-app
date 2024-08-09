// Esse teste tem como propósito testar a requisição de criação de uma venda no balcão
import http from "k6/http";
import { sleep, check, group } from "k6";
import { uuidv4 } from "https://jslib.k6.io/k6-utils/1.4.0/index.js";
import Login from "../requests/login-request.js";
import { body } from "../payloads/payload-venda.js";
const login = new Login();

export const options = {
  stages: [
    { duration: "5m", target: 100 },
    { duration: "10m", target: 100 },
    { duration: "0s", target: 0 },
  ],
};

export function setup() {
  login.realizarLogin();

  return login.receberToken();
}

export default function (authToken) {
  let codigoVenda;
  const requestId = JSON.parse(body());

  group("Criar venda", () => {
    const url = "https://api2.yooga.com.br/vendas";

    const venda = http.post(url, body(), {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    sleep(3);

    codigoVenda = JSON.parse(venda.body);

    check(venda, {
      "Status 200 Ok!": (r) => r.status === 200,
      "Venda realizada": (r) => r.body.includes(requestId.request_id),
    });
  });

  group("Cancelar venda", () => {
    const url = `https://api2.yooga.com.br/vendas/${codigoVenda.codigo}?motivo=`;

    const cancelamento = http.del(url, null, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    check(cancelamento, {
      "Status 200 Ok!": (r) => r.status === 200,
      "Venda cancelada": (r) => r.body.includes("Venda cancelada com sucesso"),
    });
  });
}
