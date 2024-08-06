// Esse teste tem como propósito testar a requisição do histórico de vendas

import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  vus:1,
  duration:'5s'
};

export function setup() {
  const url = "https://api2.yooga.com.br/authenticate";
  const payload = JSON.stringify({
    login_api: "305.937.800-27",
    senha_api: "123456",
  });

  const params = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const login = http.post(url, payload, params);

  check(login, {
    "Status 200 Ok!": (r) => r.status === 200,
    "IDI encontrado": (r) => r.body.includes("122256"),
  });

  let authToken = login.body;
  authToken = JSON.parse(authToken);

  return authToken.token;
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
