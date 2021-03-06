// import logo from './logo.svg';
// import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "upkit/dist/style.min.css";

import { Provider } from "react-redux";
import store from "./app/store";

import Home from "./pages/Home";
// (1) import fungsi listen

import { getCart } from "./api/cart";

import { listen } from "./app/listener";
import React from "react";

import Register from "./pages/Register";
import RegisterSuccess from "./pages/RegisterSuccess";
import Login from "./pages/Login";
import UserAddressAdd from "./pages/UserAddressAdd";
import UserAddress from "./pages/UserAddress";
import Checkout from "./pages/Checkout";
import Invoice from "./pages/Invoice";
import UserAccount from "./pages/UserAccount";
import UserOrders from "./pages/UserOrders";

function App() {
  // (2) panggil fungsi listen() sekali saja saat komponen selesai render pertama kali
  React.useEffect(() => {
    listen();
    getCart();
  }, []);
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Switch>
            <Route path="/pesanan">
              <UserOrders />
            </Route>

            <Route path="/account">
              <UserAccount />
            </Route>

            <Route path="/invoice/:order_id">
              <Invoice />
            </Route>

            <Route path="/checkout">
              <Checkout />
            </Route>

            <Route path="/alamat-pengiriman/tambah">
              <UserAddressAdd />
            </Route>

            <Route path="/alamat-pengiriman">
              <UserAddress />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route
              path="/register/berhasil"
              component={RegisterSuccess}
            ></Route>

            <Route path="/register" component={Register}></Route>

            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
