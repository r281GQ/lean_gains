import axios from 'axios';

import * as workoutLogs from './../actions/workout_logs_actions';
import * as app from './../actions/app_actions';

const getWorkoutLogsForMonth = month => dispatch =>
  axios
    .get(`/api/workoutlogs`, {
      params: {
        month
      },
      withCredentials: true
    })
    .then(({ data }) => {
      dispatch({
        type: workoutLogs.WRITE_WORKOUT_LOGS,
        payload: data
      });
    })
    .catch(error => console.log(error));

const getWorkoutLogDates = () => dispatch =>
  axios
    .get('/api/workoutlogs/dates', { withCredentials: true })
    .then(({ data }) =>
      dispatch({
        type: workoutLogs.WRITE_WORKOUT_LOG_DATES,
        payload: data
      })
    )
    .catch(error => console.log(error));

const createWorkoutLog = workoutLog => dispatch =>
  axios
    .post('/api/workoutlogs', workoutLog, { withCredentials: true })
    .then(({ data }) => {
      dispatch({ type: workoutLogs.WRITE_WORKOUT_LOG, payload: data });
      dispatch({
        type: workoutLogs.WRITE_WORKOUT_LOG_DATE,
        payload: data.createdAt
      });
    })
    .catch(error => console.log(error));

const updateWorkoutLog = workoutLog => dispatch =>
  axios
    .put('/api/workoutlogs', workoutLog, { withCredentials: true })
    .then(({ data }) =>
      dispatch({ type: workoutLogs.WRITE_WORKOUT_LOG, payload: data })
    )
    .catch(error => console.log(error));

const deleteWorkoutLog = _id => dispatch =>
  axios
    .delete(`api/workoutlogs/${_id}`, { withCredentials: true })
    .then(({ data }) => {
      dispatch({
        type: workoutLogs.DELETE_WORKOUT_LOG_DATE,
        payload: data.date
      });
      dispatch({ type: workoutLogs.DELETE_WORKOUT_LOG, payload: _id });
      dispatch({ type: app.OPEN_MESSAGE_BAR });
      dispatch({
        type: app.SET_MESSAGE,
        payload: `Log with id ${_id} was deleted!`
      });
    })
    .catch(error => console.log(error));

export {
  getWorkoutLogsForMonth,
  createWorkoutLog,
  updateWorkoutLog,
  deleteWorkoutLog,
  getWorkoutLogDates
};
