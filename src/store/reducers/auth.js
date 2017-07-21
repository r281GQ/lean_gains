import { fromJS } from 'immutable';

import * as auth from './../actions/auth_actions';

const INITIAL_STATE = fromJS({
  authenticated: false,
  isLoading: false,
  token: undefined,
});

const handleLoginSuccess = (state, { token, email, _id, lastLogin }) =>
  state.withMutations(map =>
    map
      .set('authenticated', true)
      .set('token', token)
      .setIn(['user', '_id'], _id)
      .setIn(['user', 'lastLogin'], lastLogin)
      .setIn(['user', 'email'], email)
  );

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case auth.LOGIN_SUCCESS:
      return handleLoginSuccess(state, payload);
    case auth.INIT_AUTH:
      return state.set('isLoading', true);
    case auth.CLOSE_AUTH:
      return state.set('isLoading', false);
    case auth.LOG_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reducer;
