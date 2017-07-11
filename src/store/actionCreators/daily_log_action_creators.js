
import axios from 'axios';
const SIGNUP = "http://localhost:4000/api/dailylogs";
import {WRITE_DAILY_LOG} from './../actions/daily_log_actions';

const createLog = dailyLog => (dispatch, getState) =>{
  axios.post(SIGNUP, dailyLog).then(response => {
    dispatch({type: WRITE_DAILY_LOG, payload: response.data});

  })
  .catch(error => {});
  console.log(dailyLog);
}


export {createLog};
