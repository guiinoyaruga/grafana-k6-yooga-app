// Esse teste tem como propósito testar o tempo de resposta do mapa de pedidos

import http from "k6/http";
import { sleep, check } from "k6";
import Login from "../requests/login-request.js";
import { group } from "k6";
const login = new Login();

export const options = {
  stages: [{ duration: "5s", target: 1 }],
};

export function setup() {
  login.realizarLogin();

  return login.receberToken();
}

export default function (authToken) {
  group("Acessar gestor de pedidos", () => {
    const url = "https://api2.yooga.com.br/delivery/store/details";

    const gestor = http.request("GET", url, null, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    sleep(1);

    check(gestor, {
      "Status 200 Ok!": (r) => r.status === 200,
      "Loja do Delivery Encontrada": (r) =>
        r.body.includes("QA Yooga Teste - K6"),
    });
  });

  group("Acessar mapa de rotas", () => {
    const url = "https://api2.yooga.com.br/delivery/routes";

    const routes = http.request("GET", url, null, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    sleep(1);

    check(routes, {
      "Status 200 Ok!": (r) => r.status === 200,
      "Body Ok!": (r) => r.body.includes("[]"),
    });
  });
}
