import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    vus: 1,
    duration: "5s"
};

export function setup() {
    const url = "https://api4.yooga.com.br/authenticate";
    const payload = JSON.stringify({
        login_api: "146.256.737-12",
        senha_api: "humm3r28@*",
    });

    const params = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Referer: "https://app.yooga.com.br/",
        },
    };

    const login = http.post(url, payload, params);

    check(login, {
        "expect status": (r) => r.status === 200,
        "expect idi": (r) => r.body.includes("8405"),
    });

    //   const authToken = login.body
    //   const convert = JSON.parse(authToken)

    // return convert.token
    // }

    // export default function (convert) {
    //   const url = "https://api4.yooga.com.br/produtos?";

    //   const buscarProdutos = http.get(url, {
    //     headers: {
    //       Authorization:
    //         `Bearer ${convert}`,
    //     },
    //   });
    //   sleep(1)

    //   check(buscarProdutos, {
    //     "expect status 200": (r) => r.status === 200,
    //   });

}