import store from "./store";

let currentAuth;

// fungsi listener
function listener() {
  // let previousAuth dan berikan ke currentAuth sbg nilai
  let previousAuth = currentAuth;

  //   update nilai currentAuth dari nilai state terbaru
  currentAuth = store.getState().auth;

  //   cek apakah nilai state auth berubah dari nilai sebelumnya
  if (currentAuth !== previousAuth) {
    // juka berubah simpan di lokal storange
    localStorage.setItem("auth", JSON.stringify(currentAuth));
  }
}

// fungsi listen
function listen() {
  // listen peurbahan store
  store.subscribe(listener);
}

// export fungsi listen supaya bisa digunakan difile lain
export { listen };
