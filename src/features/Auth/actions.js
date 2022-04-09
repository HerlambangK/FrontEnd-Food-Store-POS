import { USER_LOGIN, USER_LOGOUT } from "./constants";

let initialState = { user: null, token: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return { user: action.user, token: action.token };

    //   logika state "USER_LOGOUT"
    case USER_LOGOUT:
      return { user: null, token: null };

    default:
      return state;
  }
}

// (2) action userLogin
export function userLogin(user, token) {
  return {
    type: USER_LOGIN,
    user,
    token,
  };
}

// (3) action userLogout
export function userLogout() {
  return {
    type: USER_LOGOUT,
  };
}
