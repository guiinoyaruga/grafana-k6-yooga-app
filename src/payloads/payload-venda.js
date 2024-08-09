import { uuidv4 } from "https://jslib.k6.io/k6-utils/1.4.0/index.js";
const randomUUID = uuidv4();
const randomRequestId = uuidv4();

export const body = () =>
JSON.stringify({
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
