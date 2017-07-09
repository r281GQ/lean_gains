import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux-immutable";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as form } from "redux-form";
import thunk from "redux-thunk";
import Immutable from "immutable";

import auth from "./reducers/auth";
import userDetails from "./reducers/user_details";
import dailyLog from "./reducers/daily_log";
import workoutLogs from "./reducers/workout_log";
import { routing, routerMiddlewareInstance } from "./reducers/routing";

const store = createStore(
  combineReducers({
    auth,
    userDetails,
    dailyLog,
    routing,
    workoutLogs,
    form
  }),
  composeWithDevTools(applyMiddleware(thunk, routerMiddlewareInstance))
);

export { store };
