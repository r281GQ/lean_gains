import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as form } from 'redux-form/immutable';
import thunk from 'redux-thunk';
import Immutable from 'immutable';

import app from './reducers/app';
import auth from './reducers/auth';
import calorieLog from './reducers/calorie_logs'
import userDetails from './reducers/user_details';
import dailyLogs from './reducers/daily_logs';
import workoutLogs from './reducers/workout_logs';
import { routing, routerMiddlewareInstance } from './reducers/routing';

const store = createStore(
  combineReducers({
    app,
    auth,
    userDetails,
    calorieLog,
    dailyLogs,
    routing,
    workoutLogs,
    form
  }),
  composeWithDevTools(applyMiddleware(thunk, routerMiddlewareInstance))
);

export { store };
