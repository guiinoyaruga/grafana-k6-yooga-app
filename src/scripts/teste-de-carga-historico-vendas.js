// Esse teste tem como propósito testar a requisição do histórico de vendas

import http from "k6/http";
import { sleep, check } from "k6";
import Login from "../requests/login-request.js";
const login = new Login()

export const options = {
  stages: [
    { duration: "5s", target: 1 },
    // { duration: "7m", target: 100 },
    // { duration: "1m", target: 0 },
  ],
};

export function setup() {
  login.realizarLogin();

  return login.receberToken()
}

export default function (authToken) {
  const url = "https://api2.yooga.com.br/v2/vendas?page=1&inverse=true";

  const carts = http.request("GET", url, null, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  sleep(1);

  check(carts, {
    "Status 200 Ok!": (r) => r.status === 200,
    "Body Ok!": (r) =>
      r.body.includes(
        "data",
        "lastPage",
        "page",
        "perPage",
        "totais",
        "desconto",
        "valor",
        "total"
      ),
  });
}
