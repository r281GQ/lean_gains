import axios from 'axios';

import {WRITE_USER_DETAILS} from './../actions/user_details_actions';


const fetchUserDetails = () => (dispatch, getState) => {
  const USERDETAILSRL = `http://localhost/4000/api/userDetails`;

  axios({
    url: USERDETAILSRL,
    method: "GET",
    headers: { "x-auth": getState().auth.token }
  })
    .then(response => {
      dispatch({type: WRITE_USER_DETAILS, payload: response.data})
    })
    .catch(error => {});
};

const updateUserDetails = userDetails => dispatch => dispatch({type: WRITE_USER_DETAILS, payload: userDetails})

export {updateUserDetails};
