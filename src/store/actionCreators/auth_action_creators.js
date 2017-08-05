import axios from 'axios';

import * as auth from './../actions/auth_actions';

const handleWritingToStore = (response, dispatch) => {
  let { name, email, _id } = response.data;
  let token = response.headers['x-auth'];
  dispatch({ type: auth.LOGIN_SUCCESS, payload: { name, email, _id, token } });
  dispatch({ type: auth.CLOSE_AUTH });
};

const googleLogin = () => dispatch => {
  axios.get(`http://localhost:3050/api/auth/googlebrowser`, {withCredentials: true})
  // axios.get(`http://localhost:3050/api/auth/whoami`)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => console.log(error));
}

const whoAmI = () => dispatch => {
  // axios.get(`/api/auth/google`)
  axios.get(`http://localhost:3050/api/auth/whoami`, {withCredentials: true})
    .then(response => {
      console.log(response.data);
      const {name, email, _id } = response.data;
      dispatch({type: auth.LOGIN_SUCCESS, payload: {name, email, _id}})
    })
    .catch(error => console.log(error));
}

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

const logOut = () => dispatch => {
    axios.get('/api/auth/logout')
      .then(response => {
        console.log(response)

        dispatch({ type: auth.LOG_OUT });
      })
      .catch(error => console.log('eror'))
}

export { logIn, signUp, logOut,googleLogin, whoAmI };
