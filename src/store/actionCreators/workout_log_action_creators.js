import moment from "moment";
import axios from "axios";

import config from './../../../config.json';

import {
  WRITE_WORKOUT_LOGS,
  WRITE_WORKOUT_LOG,
  DELETE_WORKOUT_LOG
} from "./../actions/workout_log_actions";

const getWorkoutLogsForMonth = month => (dispatch, getState) => {
  axios
    .get(`${config.url.base}${config.url.workoutlog}`, {
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

const createWorkoutLog = workoutLog => (dispatch, getState) => {
  axios
    .post("http://localhost:4000/api/workoutlogs", workoutLog)
    .then(response => dispatch({ type: WRITE_WORKOUT_LOG, payload: response.data }))
    .catch(error => {
      console.log(error);
    });
};

const updateWorkoutLog = workoutLog => (dispatch, getState) => {
  axios
    .put("http://localhost:4000/api/workoutlogs")
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
  deleteWorkoutLog
};
