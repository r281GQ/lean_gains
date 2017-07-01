import Immutable from "immutable";
import axios from "axios";

import {
  INIT_AUTH,
  CLOSE_AUTH,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOG_OUT
} from "./../actions/auth";

const logIn = userInfo => dispatch => {
  return axios
    .post(`http://localhost:3000/api/logIn`, userInfo)
    .then(respone => {
      dispatch({ type: INIT_AUTH });
      dispatch({ type: LOGIN_SUCCESS, payload: respone.data });
    })
    .catch(error => {
      dispatch({ type: LOGIN_FAILED });
    });
};

export { logIn };
