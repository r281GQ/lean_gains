import request from './../../services/request';
import * as auth from './../actions/auth_actions';
import { initFetch } from './../actionCreators/user_details_action_creators';

export const whoAmI = () => (dispatch, getState) =>
  request
    .get(`/api/auth/whoami`)
    .then(({ data: { name, email, _id } }) => {
      if (!getState().getIn(['auth', 'authenticated'])) {
        dispatch({ type: auth.LOGIN_SUCCESS, payload: { name, email, _id } });
        dispatch(initFetch());
      }
    })
    .catch(() => dispatch({ type: auth.LOG_OUT }));

export const logOut = () => dispatch =>
  request
    .get('/api/auth/logout')
    .then(() => {
      dispatch({ type: auth.LOG_OUT });
    })
    .catch(error => console.log(error));
