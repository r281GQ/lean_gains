import axios from 'axios';
import client from './../../services/request';

import * as dailyLogs from './../actions/daily_logs_actions';
import * as userDetails from './user_details_action_creators';

const createLog = dailyLog => (dispatch, getState) =>
  axios
    .post('/api/dailylogs', dailyLog, {withCredentials: true})
    .then(response => {
      dispatch({ type: dailyLogs.WRITE_DAILY_LOG, payload: response.data });
      dispatch({
        type: dailyLogs.WRITE_DAILY_LOG_DATES,
        payload: response.data
      });
      return axios.get('/api/latestmeasurements', {withCredentials: true})
    })
    .then(({data}) => {
        dispatch({ type: userDetails.WRITE_LATEST, payload: data });
    })
    .catch(error => console.log(error));

const getLogsForSelectedMonth = month => (dispatch, getState) => {
  console.log(month)
  axios
    .get('/api/dailylogs', { params: {month} , withCredentials: true})
    .then(response => {
      dispatch({ type: dailyLogs.WRITE_DAILY_LOGS, payload: response.data });
    })
    .catch(error => {});
};

const getDailyLogDates = () => (dispatch, getState) =>
  axios
    .get('/api/dailylogs/dates', {withCredentials: true})
    .then(response => {
      dispatch({
        type: dailyLogs.WRITE_DAILY_LOG_DATES,
        payload: response.data
      });
    })
    .catch(error => console.log(error));

const updateDailyLog = dailyLog => dispatch =>
  axios
    .put(`/api/dailylogs/`, dailyLog, {withCredentials: true})
    .then(({ data }) => {
      dispatch({
        type: dailyLogs.WRITE_DAILY_LOG,
        payload: data.date
      });
      return axios.get('/api/latestmeasurements', {withCredentials: true})
    })
    .then(({data}) => {
        dispatch({ type: userDetails.WRITE_LATEST, payload: data });
    })
    .catch(error => console.log(error));

const deleteDailyLog = _id => dispatch =>
  axios
    .delete(`/api/dailylogs/${_id}`, {withCredentials: true})
    .then(({ data }) => {
      dispatch({
        type: dailyLogs.DELETE_DAILY_LOG_DATE,
        payload: data.date
      });
      dispatch({ type: dailyLogs.DELETE_DAILY_LOG, payload: _id }, {withCredentials: true});
      return axios.get('/api/latestmeasurements', {withCredentials: true})
    })
    .then(({data}) => {
        dispatch({ type: userDetails.WRITE_LATEST, payload: data });
    })
    .catch(error => console.log(error));

export {
  createLog,
  getLogsForSelectedMonth,
  getDailyLogDates,
  updateDailyLog,
  deleteDailyLog
};
