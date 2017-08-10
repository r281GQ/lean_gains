import axios from 'axios';

import * as app from './../actions/app_actions';
import * as auth from './../actions/auth_actions';
import {initFetch} from './../actionCreators/user_details_action_creators';

const handleWritingToStore = (response, dispatch) => {
  let { name, email, _id } = response.data;
  let token = response.headers['x-auth'];
  dispatch({ type: auth.LOGIN_SUCCESS, payload: { name, email, _id, token } });
  dispatch({ type: auth.CLOSE_AUTH });
};



const whoAmI = () => (dispatch, getState )=>
  axios
    .get(`/api/auth/whoami`, { withCredentials: true })
    .then(({ data: { name, email, _id } }) => {
      if(!getState().getIn(['auth', 'authenticated'])){
        dispatch({ type: auth.LOGIN_SUCCESS, payload: { name, email, _id } });
        dispatch({type: app.SET_MESSAGE, payload: 'welcome back' + name})
        dispatch({type: app.OPEN_MESSAGE_BAR})
        dispatch({type: auth.CLOSE_AUTH})
        dispatch(initFetch());
      }else{

      }
        // dispatch({ type: auth.LOGIN_SUCCESS, payload: { name, email, _id } });

    })
    .catch(error => dispatch({type: auth.LOG_OUT}));

// const logIn = userInfo => dispatch => {
//   dispatch({ type: auth.INIT_AUTH });
//   return axios
//     .post('http://localhost:4000/api/logIn', userInfo)
//     .then(response => {
//       handleWritingToStore(response, dispatch);
//     })
//     .catch(error => {
//       dispatch({ type: auth.LOGIN_FAILED });
//       dispatch({ type: auth.CLOSE_AUTH });
//     });
// };
//
// const signUp = userInfo => dispatch => {
//   dispatch({ type: auth.INIT_AUTH });
//   return axios
//     .post('http://localhost:4000/api/signUp', userInfo)
//     .then(respone => {
//       handleWritingToStore(respone, dispatch);
//     })
//     .catch(error => {
//       dispatch({ type: auth.LOGIN_FAILED });
//       dispatch({ type: auth.CLOSE_AUTH });
//     });
// };
//

const googleLogin = () => ({type: auth.INIT_AUTH});


//TODO: delete every data in reducers
const logOut = () => dispatch =>
  axios
    .get('/api/auth/logout')
    .then(response => {
      dispatch({ type: auth.LOG_OUT });
    })
    .catch(error => console.log('eror'));

export { logOut, whoAmI, googleLogin };
