// O teste tem como proposito o teste de carga vinculado ao acesso da tela de gestor de pedidos do Delivery.

import http from "k6/http";
import { sleep, check, group } from "k6";
import Login from "../requests/login-request.js";
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
  group("Acessar tela do Delivery", function () {
    const url = "https://api2.yooga.com.br/delivery/store/details";

    const gestor = http.request("GET", url, null, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    sleep(1);

    check(gestor, {
      "Status 200 Ok!": (r) => r.status === 200,
      "Loja do Delivery Encontrada": (r) => r.body.includes("QA Yooga Teste - K6"),
    });
  });
}
