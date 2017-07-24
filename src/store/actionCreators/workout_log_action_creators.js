import axios from 'axios';

import * as workoutLogs from './../actions/workout_logs_actions';
import * as app from './../actions/app_actions';

//TODO create axios instance with x-auth headers
const getWorkoutLogsForMonth = month => dispatch =>
  axios
    .get(`http://localhost:4000/api/workoutlogs`, {
      params: {
        month
      }
    })
    .then(({ data }) => {
      dispatch({
        type: workoutLogs.WRITE_WORKOUT_LOGS,
        payload: data
      });
    })
    .catch(error => console.log(error));

const getWorkoutLogDates = month => dispatch =>
  axios
    .get('http://localhost:4000/api/workoutlogs/dates')
    .then(({ data }) =>
      dispatch({
        type: workoutLogs.WRITE_WORKOUT_LOG_DATES,
        payload: data
      })
    )
    .catch(error => console.log(error));

const createWorkoutLog = workoutLog => dispatch =>
  axios
  .post('http://localhost:4000/api/workoutlogs', workoutLog)
  .then(({ data }) => {
    dispatch({ type: workoutLogs.WRITE_WORKOUT_LOG, payload: data });
    dispatch({
      type: workoutLogs.WRITE_WORKOUT_LOG_DATE,
      payload: data.date
    });
  })
  .catch(error => console.log(error));

const updateWorkoutLog = workoutLog => dispatch =>
  axios
    .put('http://localhost:4000/api/workoutlogs', workoutLog)
    .then(({ data }) =>
      dispatch({ type: workoutLogs.WRITE_WORKOUT_LOG, payload: data })
    )
    .catch(error => console.log(error));

const deleteWorkoutLog = _id => dispatch =>
  axios
    .delete(`http://localhost:4000/api/workoutlogs/${_id}`)
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
