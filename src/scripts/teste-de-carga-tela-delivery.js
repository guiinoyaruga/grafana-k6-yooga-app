// Esse teste tem como propósito testar a requisição do histórico de vendas

import http from "k6/http";
import { sleep, check } from "k6";
import Login from "../requests/login-request.js";
const login = new Login()

export const options = {
  vus:1,
  duration:'5s'
};

export function setup() {
  login.realizarLogin();

  return login.receberToken()
}

export default function (authToken) {
  const url = "https://api2.yooga.com.br/delivery/store/details"

  const carts = http.request("GET", url, null, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  sleep(1);

  check(carts, {
    "Status 200 Ok!": (r) => r.status === 200,
    "Loja do Delivery Encontrada": (r) => r.body.includes("QA Yooga Teste - K6"),
  });
}
