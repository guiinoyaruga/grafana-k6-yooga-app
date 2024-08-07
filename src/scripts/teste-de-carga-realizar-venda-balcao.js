// Esse teste tem como propósito testar a requisição de criação de uma venda no balcão
import http from "k6/http";
import { sleep, check } from "k6";
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import Login from "../requests/login-request.js";
const login = new Login();
const randomUUID = uuidv4();

export const options = {
  stages: [{ duration: "3s", target: 1 }],
};

export function setup() {
  login.realizarLogin();

  return login.receberToken();
}

export default function (authToken) {
  const url = "https://api2.yooga.com.br/vendas";
  const payload = JSON.stringify({
    cliente: null,
    discount: 0,
    has_tax: false,
    observacao: null,
    pagamento: [
      {
        adquirente: "",
        codigo: 637660,
        descricao: "Dinheiro",
        movimenta_caixa: 1,
        taxa: null,
        tipo_nfce: 1,
        uuid: randomUUID,
        valor: 1,
        valor_pago: 1,
      },
    ],
    printer_uuid: null,
    products:[
        {
            codigo: 14307866,
            composicoes: [],
            observacao: null,
            qty: 1,
            valor_custo: 0,
            valor_venda: 1,
        }
    ],
    remaining: 0,
    request_id: randomUUID,
    tax: 0,
    tax_value: 0,
    ticket: null,
    total: 1,
    transactions: [],
    troco: 0, 
    usuario: null
  });

  const venda = http.post(url, payload, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",

    },
  });

  sleep(3);

  console.log(venda)

  check(venda, {
    "Status 200 Ok!": (r) => r.status === 200,
    // "Venda realizada": (r) => r.body.includes("PREPARING"),
  });
}
