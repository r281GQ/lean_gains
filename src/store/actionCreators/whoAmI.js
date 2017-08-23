import request from './../../services/request';
import * as auth from './../actions/auth_actions';

/*eslint import/prefer-default-export: off*/
export const whoAmI = () => dispatch =>
  request
    .get(`/api/auth/whoami`)
    .then(({ data: { name, email, _id } }) =>
      dispatch({ type: auth.LOGIN_SUCCESS, payload: { name, email, _id } })
    )
    .catch(() => dispatch({ type: auth.LOG_OUT }));
