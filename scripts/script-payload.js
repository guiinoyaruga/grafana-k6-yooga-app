import http from 'k6/http';
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 4 },
    { duration: "1m30s", target: 8 },
    { duration: "20s", target: 6 },
    { duration: "10s", target: 0 },
  ],
};

export default function () {
  const url = 'https://api4.yooga.com.br/authenticate';
  const payload= JSON.stringify({
    login_api: "146.256.737-12",
    senha_api: "humm3r28@*X"
  });

  const params = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Referer': 'https://app.yooga.com.br/'
    },
  };

  const login =  http.post(url, payload, params)

  check(login, {
    'expect status': (r) => r.status === 200,
    'expect idi': (r) => r.body.includes('8405'),
  });

  console.log(login.body)
}

// export default function produtos() {
//   const url = "https://api4.yooga.com.br/produtos?";

//   const buscarProdutos = http.get(url, {
//     headers: {
//       Authorization:
//         "BearerX eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjExNjU0LCJpYXQiOjE3MjA1NTI0MTV9.cQsatW-apfYT8mRfMCDYdM7hsfHjgXbgULYpN9yWWyM",
//     },
//   });
//   sleep(1)

//   check(buscarProdutos, {
//     "expect status 200": (r) => r.status === 200,
//   });

// }