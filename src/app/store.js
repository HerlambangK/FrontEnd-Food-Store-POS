// import redux
import { combineReducers, createStore, applyMiddleware, compose } from "redux";

// 2 import redux-thunk miderware
import thunk from "redux-thunk";

// import auth
import authReducer from "../features/Auth/reducer";

// 3 composer enhancer untuk menghubungkan dengan chrome devtools Redux
const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 4 gabung reducer, untuk sementara kosong. karena kita belum membuat reducer
const rootReducers = combineReducers({
  auth: authReducer,
});

// 5 buat store, dan gunakan composerEnhancer + middleware thunk
const store = createStore(
  rootReducers,
  composerEnhancer(applyMiddleware(thunk))
);

// 6 export store
export default store;
