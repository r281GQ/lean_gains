import { fromJS } from 'immutable';

import * as auth from './../actions/auth_actions';

const INITIAL_STATE = fromJS({
  authenticated: false,
  isLoading: false
});

const handleLoginSuccess = (state, { email, _id, lastLogin }) =>
  state.withMutations(map =>
    map
      .set('authenticated', true)
      .setIn(['user', '_id'], _id)
      .setIn(['user', 'lastLogin'], lastLogin)
      .setIn(['user', 'email'], email)
  );

//TODO: higher order reducer for message open
//TODO: isNew and lastLogin functionality
//TODO: return instead reassign lohout reducer
const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case auth.LOGIN_SUCCESS:
      return handleLoginSuccess(state, payload);
    case auth.INIT_AUTH:
      return state.set('isLoading', true);
    case auth.CLOSE_AUTH:
      return state.set('isLoading', false);
    default:
      return state;
  }
};

export default reducer;
