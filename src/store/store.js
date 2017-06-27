import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux-immutable";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import Immutable from "immutable";

import { routing, routerMiddlewareInstance } from "./reducers/routing";

const store = createStore(
  combineReducers({
    routing
  }),
  composeWithDevTools(applyMiddleware(thunk, routerMiddlewareInstance))
);

export { store };
