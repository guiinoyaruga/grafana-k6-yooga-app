// Esse teste tem como propósito testar o tempo de resposta da tela de balcão, quando o cliente faz login e acessar direto a tela de balcão

import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  stages: [
    { duration: "25s", target: 15 },
    { duration: "40s", target: 30 },
    { duration: "55s", target: 60 },
    { duration: "1m15s", target: 100 },
    { duration: "3m15s", target: 100 },
    { duration: "1s", target: 0 },
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
  const url = "https://api2.yooga.com.br/carts";

  const mesas = http.request("GET", url, null, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  sleep(1);

  check(mesas, {
    "Status 200 Ok!": (r) => r.status === 200,
    "Body Ok!": (r) => r.body.includes("[]"),
  });
}
