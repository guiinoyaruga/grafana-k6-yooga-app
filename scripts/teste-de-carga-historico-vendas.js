// Esse teste tem como propósito testar a requisição do histórico de vendas

import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  stages: [
    { duration: "3m", target: 100 },
    { duration: "7m", target: 100 },
    { duration: "1m", target: 0 },
  ],
};

export function setup() {
  const url = "https://api2.yooga.com.br/authenticate";
  const payload = JSON.stringify({
    login_api: "146.256.737-12",
    senha_api: "humm3r28@*",
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
    "IDI encontrado": (r) => r.body.includes("8405"),
  });

  let authToken = login.body;
  authToken = JSON.parse(authToken);

  return authToken.token;
}

export default function (authToken) {
  const url = "https://api2.yooga.com.br/v2/vendas?page=1&inverse=true"

  const carts = http.request("GET", url, null, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  sleep(1);

  check(carts, {
    "Status 200 Ok!": (r) => r.status === 200,
    "Body Ok!": (r) => r.body.includes("data", "lastPage","page", "perPage","totais", "desconto", "valor", "total"),
  });
}
