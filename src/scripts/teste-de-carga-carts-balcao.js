// Esse teste tem como propósito testar o tempo de resposta da tela de balcão, quando o cliente faz login e acessar direto a tela de balcão

import http from "k6/http";
import { sleep, check } from "k6";
import Login from "../requests/login-request.js";
const login = new Login()

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
  login.realizarLogin();

  return login.receberToken()
}

export default function (authToken) {
  const url = "https://api2.yooga.com.br/carts";

  const carts = http.request("GET", url, null, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  sleep(1);

  check(carts, {
    "Status 200 Ok!": (r) => r.status === 200,
    "Body Ok!": (r) => r.body.includes("[]"),
  });
}
