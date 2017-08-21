/*eslint no-console: off*/
import request from './../../services/request';
import * as workoutLogs from './../actions/workout_logs_actions';
import * as app from './../actions/app_actions';

export const getWorkoutLogsForMonth = month => dispatch =>
  request
    .get(`/api/workoutlogs`, {
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

export const getWorkoutLogDates = () => dispatch =>
  request
    .get('/api/workoutlogs/dates')
    .then(({ data }) =>
      dispatch({
        type: workoutLogs.WRITE_WORKOUT_LOG_DATES,
        payload: data
      })
    )
    .catch(error => console.log(error));

export const createWorkoutLog = workoutLog => dispatch =>
  request
    .post('/api/workoutlogs', workoutLog)
    .then(({ data }) => {
      dispatch({ type: workoutLogs.WRITE_WORKOUT_LOG, payload: data });
      dispatch({
        type: workoutLogs.WRITE_WORKOUT_LOG_DATE,
        payload: data.createdAt
      });
    })
    .catch(error => console.log(error));

export const updateWorkoutLog = workoutLog => dispatch =>
  request
    .put('/api/workoutlogs', workoutLog)
    .then(({ data }) =>
      dispatch({ type: workoutLogs.WRITE_WORKOUT_LOG, payload: data })
    )
    .catch(error => console.log(error));

export const deleteWorkoutLog = _id => dispatch =>
  request
    .delete(`/api/workoutlogs/${_id}`)
    .then(({ data }) => {
      dispatch({
        type: workoutLogs.DELETE_WORKOUT_LOG_DATE,
        payload: data.createdAt
      });
      dispatch({ type: workoutLogs.DELETE_WORKOUT_LOG, payload: _id });
      dispatch({ type: app.OPEN_MESSAGE_BAR });
      dispatch({
        type: app.SET_MESSAGE,
        payload: `Log with id ${_id} was deleted!`
      });
    })
    .catch(error => console.log(error));
