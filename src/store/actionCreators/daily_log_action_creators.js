import axios from 'axios';
import client from './../../services/request';

import * as dailyLogs from './../actions/daily_logs_actions';

const createLog = dailyLog => (dispatch, getState) =>
  axios
    .post('http://localhost:4000/api/dailylogs', dailyLog)
    .then(response => {
      dispatch({ type: dailyLogs.WRITE_DAILY_LOG, payload: response.data });
      dispatch({
        type: dailyLogs.WRITE_DAILY_LOG_DATES,
        payload: response.data
      });
    })
    .catch(error => console.log(error));

const getLogsForSelectedMonth = month => (dispatch, getState) => {
  axios
    .get('http://localhost:4000/api/dailylogs')
    .then(response => {
      dispatch({ type: dailyLogs.WRITE_DAILY_LOGS, payload: response.data });
    })
    .catch(error => {});
};

const getDailyLogDates = () => (dispatch, getState) =>
  axios
    .get('http://localhost:4000/api/dailylogs/dates')
    .then(response => {
      dispatch({
        type: dailyLogs.WRITE_DAILY_LOG_DATES,
        payload: response.data
      });
    })
    .catch(error => console.log(error));

const updateDailyLog = dailyLog => dispatch =>
  axios
    .put(`http://localhost:4000/api/dailylogs/`, dailyLog)
    .then(({ data }) => {
      dispatch({
        type: dailyLogs.WRITE_DAILY_LOG,
        payload: data.date
      });
    })
    .catch(error => console.log(error));

const deleteDailyLog = _id => dispatch =>
  axios
    .delete(`http://localhost:4000/api/dailylogs/${_id}`)
    .then(({ data }) => {
      dispatch({
        type: dailyLogs.DELETE_DAILY_LOG_DATE,
        payload: data.date
      });
      dispatch({ type: dailyLogs.DELETE_DAILY_LOG, payload: _id });
    })
    .catch(error => console.log(error));

export {
  createLog,
  getLogsForSelectedMonth,
  getDailyLogDates,
  updateDailyLog,
  deleteDailyLog
};
