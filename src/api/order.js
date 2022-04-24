import * as axios from "axios";
import { config } from "../config";

// Fungsi getOrders ini akan menerima satu parameter kita beri nama params yang berisi data untuk dikiimkan ke Web API sebagai query string:
export async function getOrders(params) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  let { limit, page } = params;
  let skip = page * limit - limit;

  return await axios.get(`${config.api_host}/api/orders`, {
    params: {
      skip,
      limit,
    },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

// fungsi createOrder yang akan kita gunakan untuk mengirimkan request pembuatan order baru.

export async function createOrder(payload) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.post(`${config.api_host}/api/orders`, payload, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}
