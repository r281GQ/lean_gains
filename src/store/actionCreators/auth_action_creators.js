import Immutable from "immutable";
import axios from "axios";
import { push } from "react-router-redux";

const LOGIN = "http://localhost:4000/api/logIn";
const SIGNUP = "http://localhost:4000/api/signUp";

const handleWritingToStore = (response, dispatch) => {
  let { name, email, _id } = response.data;
  let token = response.headers["x-auth"];
  dispatch({ type: LOGIN_SUCCESS, payload: { name, email, _id, token } });
  dispatch({ type: CLOSE_AUTH });
  dispatch(push("/main"));
};

import {
  INIT_AUTH,
  CLOSE_AUTH,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOG_OUT
} from "./../actions/auth_actions";

const logIn = userInfo => dispatch => {
  dispatch({ type: INIT_AUTH });
  return axios
    .post(LOGIN, userInfo)
    .then(response => {
      handleWritingToStore(response, dispatch);
    })
    .catch(error => {
      dispatch({ type: LOGIN_FAILED });
      dispatch({ type: CLOSE_AUTH });
    });
};

const signUp = userInfo => dispatch => {
  dispatch({ type: INIT_AUTH });
  return axios
    .post(SIGNUP, userInfo)
    .then(respone => {
      handleWritingToStore(respone, dispatch);
    })
    .catch(error => {
      dispatch({ type: LOGIN_FAILED });
      dispatch({ type: CLOSE_AUTH });
    });
};

export { logIn, signUp };
