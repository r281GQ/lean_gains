import request from './../../services/request';

import * as dailyLogs from './../actions/daily_logs_actions';
import * as userDetails from './../actions/user_details_actions';

export const createDailyLog = dailyLog => dispatch =>
  request
    .post('/api/dailylogs', dailyLog)
    .then(({ data }) => {
      dispatch({ type: dailyLogs.WRITE_DAILY_LOG, payload: data });
      dispatch({ type: dailyLogs.WRITE_DAILY_LOG_DATE, payload: data.createdAt });
      return request.get('/api/latestmeasurements');
    })
    .then(({ data }) => {
      dispatch({ type: userDetails.WRITE_LATEST, payload: data });
    })
    .catch(error => console.log(error));

export const getLogsForSelectedMonth = month => dispatch =>
  request
    .get('/api/dailylogs', { params: { month } })
    .then(({ data }) => {
      dispatch({ type: dailyLogs.WRITE_DAILY_LOGS, payload: data });
    })
    .catch(error => console.log(error));

export const getDailyLogDates = () => dispatch =>
  request
    .get('/api/dailylogs/dates')
    .then(({ data }) => {
      dispatch({
        type: dailyLogs.WRITE_DAILY_LOG_DATES,
        payload: data
      });
    })
    .catch(error => console.log(error));

export const updateDailyLog = dailyLog => dispatch =>
  request
    .put(`/api/dailylogs/`, dailyLog)
    .then(({ data }) => {
      dispatch({
        type: dailyLogs.WRITE_DAILY_LOG,
        payload: data
      });
      return request.get('/api/latestmeasurements');
    })
    .then(({ data }) => {
      dispatch({ type: userDetails.WRITE_LATEST, payload: data });
    })
    .catch(error => console.log(error));

export const deleteDailyLog = _id => dispatch =>
  request
    .delete(`/api/dailylogs/${_id}`)
    .then(({ data }) => {
      dispatch({
        type: dailyLogs.DELETE_DAILY_LOG_DATE,
        payload: data.createdAt
      });
      dispatch({ type: dailyLogs.DELETE_DAILY_LOG, payload: _id });
      return request.get('/api/latestmeasurements');
    })
    .then(({ data }) => {
      dispatch({ type: userDetails.WRITE_LATEST, payload: data });
    })
    .catch(error => console.log(error));
