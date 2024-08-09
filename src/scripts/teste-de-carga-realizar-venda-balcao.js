// Esse teste tem como propósito testar a requisição de criação de uma venda no balcão
import http from "k6/http";
import { sleep, check, group } from "k6";
import { uuidv4 } from "https://jslib.k6.io/k6-utils/1.4.0/index.js";
import Login from "../requests/login-request.js";
const login = new Login();
const randomUUID = uuidv4();
const randomRequestId = uuidv4();

export const options = {
  stages: [{ duration: "3s", target: 1 }],
};

export function setup() {
  login.realizarLogin();

  return login.receberToken();
}

export default function (authToken) {
  let codigoVenda

  group("Criar venda", () => {
    const url = "https://api2.yooga.com.br/vendas";
    const payload = JSON.stringify({
      products: [
        {
          codigo: 14307866,
          valor_venda: 1,
          qty: 1,
          valor_custo: 0,
          observacao: null,
          composicoes: [],
        },
      ],
      pagamentos: [
        {
          uuid: randomUUID,
          codigo: 637660,
          descricao: "Dinheiro",
          valor: 3,
          valor_pago: 3,
          movimenta_caixa: 1,
          taxa: null,
          tipo_nfce: 1,
          adquirente: "",
        },
      ],
      total: 3,
      discount: 0,
      tax: 0,
      has_tax: false,
      observacao: null,
      cliente: null,
      remaining: 0,
      troco: 0,
      tax_value: 0,
      request_id: randomRequestId,
      fidelity_discount_value: 0,
      transactions: [],
      printer_uuid: null,
      ticket: null,
      fidelity: null,
      fidelity_item_id: null,
      created_at: "",
      usuario: null,
    });

    const venda = http.post(url, payload, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    sleep(3);

    codigoVenda = JSON.parse(venda.body)

    check(venda, {
      "Status 200 Ok!": (r) => r.status === 200,
      "Venda realizada": (r) => r.body.includes(randomRequestId),
    });
  });

  group("Cancelar venda", () => {
    const url = `https://api2.yooga.com.br/vendas/${codigoVenda.codigo}?motivo=`;

    const cancelamento = http.del(url, null, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    check(cancelamento, {
      "Status 200 Ok!": (r) => r.status === 200,
      "Venda cancelada": (r) => r.body.includes("Venda cancelada com sucesso"),
    })
  })
}
