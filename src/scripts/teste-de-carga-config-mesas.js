// Esse teste tem como propósito testar a requisição de configuração de mesas

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
  group("Acessar configuração de mesas", () => {
    const url = "https://api2.yooga.com.br/productTip/false";

    const payload = JSON.stringify(
      {
        id: 4377,
        tableQty: 12,
        addition: 1,
        active: false,
        ncm: "00000000",
        csosn: 102,
        cfop: 5102,
        tax_type: null,
        isPercent: 0,
        enableCounter: true,
        counterQty: 1,
      }
    );

    const config = http.put(url, payload,{
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log(config.body);

    sleep(3);

    check(config, {
      "Status 200 Ok!": (r) => r.status === 200,
      // "IDI encontrado": (r) => r.body.includes("122256")
    });
  });

}
