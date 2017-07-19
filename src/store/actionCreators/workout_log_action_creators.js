import moment from "moment";
import axios from "axios";

import config from './../../../config.json';

import {
  WRITE_WORKOUT_LOGS,
  WRITE_WORKOUT_LOG,
  DELETE_WORKOUT_LOG,
  WRITE_WORKOUT_LOG_DATES,
  WRITE_WORKOUT_LOG_DATE
} from "./../actions/workout_log_actions";

//TODO refetch workoutdates after creation and deletion
const getWorkoutLogsForMonth = month => (dispatch, getState) => {
  axios
    .get(`${config.tracker.url.base}${config.tracker.url.workoutlog}`, {
      params: {
        month
      }
    })
    .then(response => {
      console.log(response);
      dispatch({ type: WRITE_WORKOUT_LOGS, payload: response.data });
    })
    .catch(error => console.log(error));
};


const getWorkoutLogDates = month => (dispatch,getState) => {
  axios.get('http://localhost:4000/api/workoutLogDates')
  .then(response =>
    dispatch({ type: WRITE_WORKOUT_LOG_DATES, payload: response.data })
  )
  .catch(error => {});
}

const createWorkoutLog = workoutLog => (dispatch, getState) => {
  axios
    .post("http://localhost:4000/api/workoutlogs", workoutLog)
    .then(response =>

{
  dispatch({ type: WRITE_WORKOUT_LOG, payload: response.data })
  dispatch({ type: WRITE_WORKOUT_LOG_DATE, payload: response.data.date })
})
    .catch(error => {
      console.log(error);
    });
};

const updateWorkoutLog = workoutLog => (dispatch, getState) => {
  axios
    .put("http://localhost:4000/api/workoutlogs", workoutLog)
    .then(response => dispatch({ type: WRITE_WORKOUT_LOG, payload: response.data }))
    .catch(error => {
      console.log(error);
    });
};

const deleteWorkoutLog = _id => (dispatch, getState) => {
  axios
    .delete(`http://localhost:4000/api/workoutlogs/${_id}`)
    .then(() => dispatch({ type: DELETE_WORKOUT_LOG, payload: _id }))
    .catch(error => {
      console.log(error);
    });
};

export {
  getWorkoutLogsForMonth,
  createWorkoutLog,
  updateWorkoutLog,
  deleteWorkoutLog,
  getWorkoutLogDates
};
