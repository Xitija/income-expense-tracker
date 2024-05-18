import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import financeReducer from "./reducer.js";

const store = createStore(financeReducer, applyMiddleware(thunk));

export default store;
