import { check } from "k6";
import http from "k6/http";

export default class Login {

  constructor() {
    this.token = ""
  }

  realizarLogin() {
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

    this.token = authToken.token;
  }

  receberToken(){
    return this.token
  }
}
