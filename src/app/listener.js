import store from "./store";
import { saveCart } from "../api/cart";

let currentAuth;
let currentCart;

// fungsi listener
function listener() {
  // let previousAuth dan berikan ke currentAuth sbg nilai
  let previousAuth = currentAuth;
  let previousCart = currentCart;

  //   update nilai currentAuth dari nilai state terbaru
  currentAuth = store.getState().auth;
  currentCart = store.getState().cart;

  let { token } = currentAuth;

  //   cek apakah nilai state auth berubah dari nilai sebelumnya
  if (currentAuth !== previousAuth) {
    // juka berubah simpan di lokal storange
    localStorage.setItem("auth", JSON.stringify(currentAuth));

    // (1) saveCart saat `auth` berubah
    saveCart(token, currentCart);
  }

  if (currentCart !== previousCart) {
    localStorage.setItem("cart", JSON.stringify(currentCart));

    // (2) saveCart saat `cart` berubah
    saveCart(token, currentCart);
  }
}

// fungsi listen
function listen() {
  // listen peurbahan store
  store.subscribe(listener);
}

// export fungsi listen supaya bisa digunakan difile lain
export { listen };
