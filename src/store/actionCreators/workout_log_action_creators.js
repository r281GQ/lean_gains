import request from './../../services/request';
import * as workoutLogs from './../actions/workout_logs_actions';
import * as app from './../actions/app_actions';

export const getWorkoutLogsForMonth = month => dispatch => {
  dispatch({ type: app.INIT_API });
  return request
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
      dispatch({ type: app.CLOSE_API });
    })
    .catch(() => dispatch({ type: app.CLOSE_API }));
};

export const getWorkoutLogDates = () => dispatch => {
  dispatch({ type: app.INIT_API });
  return request
    .get('/api/workoutlogs/dates')
    .then(({ data }) => {
      dispatch({
        type: workoutLogs.WRITE_WORKOUT_LOG_DATES,
        payload: data
      });
      dispatch({ type: app.CLOSE_API });
    })
    .catch(() => dispatch({ type: app.CLOSE_API }));
};

export const createWorkoutLog = workoutLog => dispatch => {
  dispatch({ type: app.INIT_API });
  return request
    .post('/api/workoutlogs', workoutLog)
    .then(({ data }) => {
      dispatch({ type: workoutLogs.WRITE_WORKOUT_LOG, payload: data });
      dispatch({
        type: workoutLogs.WRITE_WORKOUT_LOG_DATE,
        payload: data.createdAt
      });
      dispatch({ type: app.CLOSE_API });
    })
    .catch(() => dispatch({ type: app.CLOSE_API }));
};

export const updateWorkoutLog = workoutLog => dispatch => {
  dispatch({ type: app.INIT_API });
  return request
    .put('/api/workoutlogs', workoutLog)
    .then(({ data }) => {
      dispatch({ type: workoutLogs.WRITE_WORKOUT_LOG, payload: data });
      dispatch({ type: app.CLOSE_API });
    })
    .catch(() => dispatch({ type: app.CLOSE_API }));
};

export const deleteWorkoutLog = _id => dispatch => {
  dispatch({ type: app.INIT_API });
  return request
    .delete(`/api/workoutlogs/${_id}`)
    .then(({ data }) => {
      dispatch({
        type: workoutLogs.DELETE_WORKOUT_LOG_DATE,
        payload: data.createdAt
      });
      dispatch({ type: workoutLogs.DELETE_WORKOUT_LOG, payload: _id });
      dispatch({ type: app.CLOSE_API });
    })
    .catch(() => dispatch({ type: app.CLOSE_API }));
};
