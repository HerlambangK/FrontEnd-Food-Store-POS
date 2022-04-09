// import USER_LOGIN

import { USER_LOGIN } from "./constants";

// let initialState = { user: null, token: null };
let initialState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : { user: null, token: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    //   logika menangani action USER_LOGIN
    case USER_LOGIN:
      return { user: action.user, token: action.token };

    default:
      return state;
  }
}
