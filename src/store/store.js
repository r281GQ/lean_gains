import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux-immutable";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as reducerForm } from 'redux-form';
import thunk from "redux-thunk";
import Immutable from "immutable";

import auth from './reducers/auth';
import userDetails from './reducers/user_details';
import { routing, routerMiddlewareInstance } from "./reducers/routing";

const store = createStore(
  combineReducers({
    auth,
    userDetails,
    routing,
    form: reducerForm
  }),
  composeWithDevTools(applyMiddleware(thunk, routerMiddlewareInstance))
);

export { store };
