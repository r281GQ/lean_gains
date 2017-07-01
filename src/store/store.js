import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux-immutable";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import Immutable from "immutable";

import auth from './reducers/auth';
import { routing, routerMiddlewareInstance } from "./reducers/routing";

import { reducer as reducerForm } from 'redux-form';



const store = createStore(
  combineReducers({
    auth,
    routing,
    form: reducerForm
  }),
  composeWithDevTools(applyMiddleware(thunk, routerMiddlewareInstance))
);

export { store };
