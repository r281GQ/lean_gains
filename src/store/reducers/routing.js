import { routerMiddleware, LOCATION_CHANGE } from "react-router-redux";
import Immutable from "immutable";
import createHistory from "history/createBrowserHistory";

const INITIAL_STATE = Immutable.fromJS({
  location: undefined
});

const history = createHistory();

const routerMiddlewareInstance = routerMiddleware(history);

const routing = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case LOCATION_CHANGE:
      return state.set("location", Immutable.fromJS(payload));
    default:
      return state;
  }
};

export { routing, history, routerMiddlewareInstance };
