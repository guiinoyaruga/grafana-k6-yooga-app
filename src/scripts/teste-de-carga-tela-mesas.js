// Esse teste tem como propósito testar a requisição de acesso a tela de mesas

import http from "k6/http";
import { sleep, check, group } from "k6";
import Login from "../requests/login-request.js";
const login = new Login();

export const options = {
  stages: [{ duration: "3s", target: 1 }],
};

export function setup() {
  login.realizarLogin();

  return login.receberToken();
}

export default function (authToken) {
  group("Acessar tela de mesas", () => {
    const url = "https://api2.yooga.com.br/tables";

    const config = http.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    sleep(3);

    check(config, {
      "Status 200 Ok!": (r) => r.status === 200,
    });
  });
}
