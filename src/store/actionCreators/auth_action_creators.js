import axios from 'axios';

import * as auth from './../actions/auth_actions';

const handleWritingToStore = (response, dispatch) => {
  let { name, email, _id } = response.data;
  let token = response.headers['x-auth'];
  dispatch({ type: auth.LOGIN_SUCCESS, payload: { name, email, _id, token } });
  dispatch({ type: auth.CLOSE_AUTH });
};

const logIn = userInfo => dispatch => {
  dispatch({ type: auth.INIT_AUTH });
  return axios
    .post('http://localhost:4000/api/logIn', userInfo)
    .then(response => {
      handleWritingToStore(response, dispatch);
    })
    .catch(error => {
      dispatch({ type: auth.LOGIN_FAILED });
      dispatch({ type: auth.CLOSE_AUTH });
    });
};

const signUp = userInfo => dispatch => {
  dispatch({ type: auth.INIT_AUTH });
  return axios
    .post('http://localhost:4000/api/signUp', userInfo)
    .then(respone => {
      handleWritingToStore(respone, dispatch);
    })
    .catch(error => {
      dispatch({ type: auth.LOGIN_FAILED });
      dispatch({ type: auth.CLOSE_AUTH });
    });
};

const logOut = () => ({ type: auth.LOG_OUT });

export { logIn, signUp, logOut };
