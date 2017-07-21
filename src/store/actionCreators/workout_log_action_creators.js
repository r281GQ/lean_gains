import moment from 'moment';
import axios from 'axios';

import * as workoutLogs from './../actions/workout_log_actions';

//TODO refetch workoutdates after creation and deletion
//TODO create uniquew axios instanve encupsualted elsewhere
//TODO auth hoc
const getWorkoutLogsForMonth = month => dispatch => {
  axios
    .get(`http://localhost:4000/api/workoutlogs`, {
      params: {
        month
      }
    })
    .then(response => {
      dispatch({ type: WRITE_WORKOUT_LOGS, payload: response.data });
    })
    .catch(error => console.log(error));
};

const getWorkoutLogDates = month => dispatch => {
  axios
    .get('http://localhost:4000/api/workoutlogs/dates')
    .then(response =>
      dispatch({
        type: workoutLogs.WRITE_WORKOUT_LOG_DATES,
        payload: response.data
      })
    )
    .catch(error => {});
};

const createWorkoutLog = workoutLog => dispatch => {
  axios
    .post('http://localhost:4000/api/workoutlogs', workoutLog)
    .then(response => {
      dispatch({ type: workoutLogs.WRITE_WORKOUT_LOG, payload: response.data });
      dispatch({
        type: workoutLogs.WRITE_WORKOUT_LOG_DATE,
        payload: response.data.date
      });
    })
    .catch(error => console.log(error));
};

const updateWorkoutLog = workoutLog => dispatch => {
  axios
    .put('http://localhost:4000/api/workoutlogs', workoutLog)
    .then(response =>
      dispatch({ type: WRITE_WORKOUT_LOG, payload: response.data })
    )
    .catch(error => console.log(error));
};

const deleteWorkoutLog = _id => dispatch => {
  axios
    .delete(`http://localhost:4000/api/workoutlogs/${_id}`)
    .then(() => dispatch({ type: DELETE_WORKOUT_LOG, payload: _id }))
    .catch(error => console.log(error));
};

export {
  getWorkoutLogsForMonth,
  createWorkoutLog,
  updateWorkoutLog,
  deleteWorkoutLog,
  getWorkoutLogDates
};
