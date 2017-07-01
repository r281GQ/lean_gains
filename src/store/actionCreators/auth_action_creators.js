import Immutable from "immutable";
import axios from "axios";

const URL = 'http://localhost:4000/api/logIn'

import {
  INIT_AUTH,
  CLOSE_AUTH,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOG_OUT
} from "./../actions/auth_actions";

const logIn = userInfo => dispatch => {
  return axios
    .post(URL, userInfo)
    .then(respone => {
      dispatch({ type: INIT_AUTH });
      dispatch({ type: LOGIN_SUCCESS, payload: respone.data });
    })
    .catch(error => {
      dispatch({ type: LOGIN_FAILED });
    });
};

export { logIn };
