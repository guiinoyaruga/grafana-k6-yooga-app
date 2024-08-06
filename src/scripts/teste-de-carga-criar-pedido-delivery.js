// Esse teste tem como propósito testar a requisição de criação de pedidos do delivery
import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  stages: [{ duration: "5s", target: 1 }],
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
  const url = "https://beta.gateway.yooga.com.br/delivery/merchants/orders";
  const payload = JSON.stringify({
    address: {
      additionalAddress: null,
      address: "Rua Izidro Benezate, 48",
      address2: "Enseada do Suá, Vitória",
      addressObject:
        '{"idi":8405,"codigo":15482491,"cliente_id":11876083,"apelido":"Padrão","padrao":1,"endereco":"Rua Izidro Benezate","numero":"48","complemento":null,"bairro":"Enseada do Suá","cidade":"Vitória","codigo_cidade":null,"estado":-1,"cep":"29050-300","referencia":null,"latitude":-20.3167926,"longitude":-40.2901947,"address_id":null,"data_inc":"2024-01-23 14:58:05","usuario_inc":11654,"data_alt":"2024-08-02 18:51:28","usuario_alt":11654,"data_del":null,"usuario_del":0}',
      city: "Vitória",
      id: 15482491,
      latitude: -20.3167926,
      longitude: -40.2901947,
      neighbourhood: "Enseada do Suá",
      number: "48",
      postalCode: "29050-300",
      reference: null,
    },
    deliveryFee: 0.5,
    discountValue: 0,
    fidelityDiscountValue: 0,
    fidelityDiscountValueApplied: 0,
    isManualOrder: false,
    items: [
      {
        fidelityId: null,
        id: null,
        itemId: 4796499,
        price: 8,
        qty: 1,
        unitaryPrice: 8,
      },
    ],
    payment: {
      changeFor: 0,
      id: "97",
    },
    session: "61b2c9dd-e6ff-4820-a704-084d8cb08c73",
    totalItems: 8,
    user: {
      id: 11876083,
    },
    userWithdraw: false,
  });

  const carts = http.post(url, payload, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  sleep(4);

  check(carts, {
    "Status 200 Ok!": (r) => r.status === 200,
    "Order Status igual a PREPARING": (r) => r.body.includes("PREPARING"),
  });
}
