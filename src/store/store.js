import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as form } from 'redux-form/immutable';
import { createLogger } from 'redux-logger';
import { routing, routerMiddlewareInstance } from './reducers/routing';
import thunk from 'redux-thunk';
import Immutable, { Iterable, fromJS, Map, Set } from 'immutable';
import moment from 'moment';

import { LOG_OUT } from './actions/auth_actions';
import app from './reducers/app';
import auth from './reducers/auth';
import calorieLog from './reducers/calorie_logs';
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

const calorieLogState = Map();

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
    .set('calorieLog', calorieLogState)
    .set('dailyLogs', dailyLogsState)
    .set('userDetails', userDetailsState)
    .set('workoutLogs', workoutLogsState)
);

const logger = createLogger({
  stateTransformer: state => (Iterable.isIterable(state) ? state.toJS() : state)
});

const rootReducer = combineReducers({
  app,
  auth,
  userDetails,
  calorieLog,
  dailyLogs,
  routing,
  workoutLogs,
  form
});

const withLogout = (rootReducer, INITIAL_STATE) => (state, action) =>
  action.type === LOG_OUT
    ? (state = INITIAL_STATE)
    : rootReducer(state, action);

//TODO: add undo function to api actions to roll back
const store = createStore(
  withLogout(rootReducer, INITIAL_STATE),
  composeWithDevTools(applyMiddleware(thunk, routerMiddlewareInstance))
);

export { store };
