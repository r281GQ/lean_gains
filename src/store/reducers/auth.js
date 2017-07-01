import Immutable from "immutable";

import {
  INIT_AUTH,
  CLOSE_AUTH,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOG_OUT
} from "./../actions/auth_actions";

const INITIAL_STATE = Immutable.fromJS({
  authenticated: false,
  isLoading: false,
  token: undefined,
  failedAttempt: false,
  user: {
    name: undefined,
    email: undefined,
    _id: undefined
  }
});

const handleLoginSuccess = (state, { token, name, email, _id }) =>
  state.withMutations(map =>
    map
      .set("authenticated", true)
      .set("failedAttempt", false)
      .set("token", token)
      .setIn(["user", "name"], name)
      .setIn(["user", "email"], email)
      .setIn(["user", "_id"], _id)
  );

const handleInitAuth = state => state.set("isLoading", true);

const handleCloseAuth = state => state.set("isLoading", false);

const auth = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return handleLoginSuccess(state, payload);
    case LOGIN_FAILED:
      return state.set("failedAttempt", true);
    case INIT_AUTH:
      return state.set("isLoading", true);
    case CLOSE_AUTH:
      return state.set("isLoading", false);
    case LOG_OUT:
      return Immutable.fromJS({
        authenticated: false,
        isLoading: false,
        token: undefined,
        failedAttempt: false,
        user: {
          name: undefined,
          email: undefined,
          _id: undefined
        }
      });
    default:
      return state;
  }
};

export default auth;
