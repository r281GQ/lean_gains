import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as form } from 'redux-form/immutable';
import { routing, routerMiddlewareInstance } from './reducers/routing';
import thunk from 'redux-thunk';
import Immutable, { fromJS, Map, Set } from 'immutable';
import moment from 'moment';

import { LOG_OUT } from './actions/auth_actions';
import app from './reducers/app';
import auth from './reducers/auth';
import userDetails from './reducers/user_details';
import dailyLogs from './reducers/daily_logs';
import workoutLogs from './reducers/workout_logs';

const authState = fromJS({
  authenticated: false,
  isLoading: false,
  token: null
});

const appState = fromJS({
  isConfirmDeleteModalOpen: false,
  isSideBarOpen: false,
  isLoading: false,
  isMessageBarOpen: false,
  isFetching: false,
  selectedDayCalorieLog: moment().toDate(),
  message: ''
});

const routingState = Immutable.fromJS({
  location: undefined
});

const dailyLogsState = Map().withMutations(map =>
  map.set('data', Map()).set('dates', Set())
);

const userDetailsState = fromJS({
  workoutTargets: {},
  kcalTargets: {},
  latestMeasurements: {}
});

const workoutLogsState = Map().withMutations(map =>
  map.set('data', Map()).set('dates', Set())
);

const INITIAL_STATE = Map().withMutations(map =>
  map
    .set('auth', authState)
    .set('app', appState)
    .set('routing', routingState)
    .set('dailyLogs', dailyLogsState)
    .set('userDetails', userDetailsState)
    .set('workoutLogs', workoutLogsState)
);

const rootReducer = combineReducers({
  app,
  auth,
  userDetails,
  dailyLogs,
  routing,
  workoutLogs,
  form
});

const withLogout = (rootReducer, INITIAL_STATE) => (state, action) =>
  action.type === LOG_OUT
    ? (state = INITIAL_STATE)
    : rootReducer(state, action);

const store = createStore(
  withLogout(rootReducer, INITIAL_STATE),
  composeWithDevTools(applyMiddleware(thunk, routerMiddlewareInstance))
);

export default store;
