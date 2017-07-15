import axios from "axios";

import { INIT_API, CLOSE_API } from "./../actions/auth_actions";
import {
  WRITE_USER_DETAILS,
  WRITE_KCAL_TARGETS,
  WRITE_WORKOUT_TARGET,
  WRITE_WORKOUT_TARGETS,
  WRITE_LATEST,
  WRITE_WORKOUT_LOG_DATES
} from "./../actions/user_details_actions";
// import {WRITE_USER_DETAILS, WRITE_KCAL_TARGETS} from './../actions/user_details_actions';

const fetchUserDetails = () => (dispatch, getState) => {
  const USERDETAILSRL = `http://localhost:4000/api/userDetails`;

  axios({
    url: USERDETAILSRL,
    method: "GET",
    headers: { "x-auth": undefined }
  })
    .then(response => {
      dispatch({ type: WRITE_USER_DETAILS, payload: response.data });
    })
    .catch(error => {});
};

const createKcalTarget = kCalTarget => (dispatch, getState) => {
  axios
    .post("http://localhost:4000/api/kcaltarget", kCalTarget)
    .then(response => {
      dispatch({ type: WRITE_KCAL_TARGETS, payload: response.data });
    })
    .catch(error => {});
};

const createWorkoutTarget = workoutLog => (dispatch, getState) => {
  axios
    .post("http://localhost:4000/api/workoutTargets", workoutLog)
    .then(response => {
      dispatch({ type: WRITE_WORKOUT_TARGET, payload: response.data });
    })
    .catch(error => {});
};

const getWorkoutTargets = () => (dispatch, getState) => {
  axios
    .get("http://localhost:4000/api/workoutTargets")
    .then(response => {
      dispatch({ type: WRITE_WORKOUT_TARGETS, payload: response.data });
    })
    .catch(error => {});
};

const getKcalTargets = kCalTarget => (dispatch, getState) => {
  axios
    .get("http://localhost:4000/api/kcaltargets")
    .then(response =>
      dispatch({ type: WRITE_KCAL_TARGETS, payload: response.data })
    )
    .catch(error => {});
};

const getWorkoutLogDates = month => (dispatch,getState) => {
  axios.get('http://localhost:4000/api/workoutLogDates')
  .then(response =>
    dispatch({ type: WRITE_WORKOUT_LOG_DATES, payload: response.data })
  )
  .catch(error => {});
}

//TODO: add fethcing current months workoutLogs
const initFetch = () => (dispatch, getState) => {
  const USERDETAILSRL = `http://localhost:4000/api/userDetails`;
  dispatch({ type: INIT_API });
  axios
    .get("http://localhost:4000/api/kcaltargets")
    .then(response => {
      dispatch({ type: WRITE_KCAL_TARGETS, payload: response.data });
      return axios.get("http://localhost:4000/api/workoutTargets");
    })
    .then(response => {
      dispatch({ type: WRITE_WORKOUT_TARGETS, payload: response.data });
      return axios({
        url: USERDETAILSRL,
        method: "GET",
        headers: { "x-auth": undefined }
      });
    })
    .then(response => {
      dispatch({ type: WRITE_USER_DETAILS, payload: response.data });
      return axios.get('http://localhost:4000/api/latestmeasurements');
    })
    .then(response => {
      console.log(response.data);
      dispatch({type: WRITE_LATEST , payload: response.data})
      dispatch({ type: CLOSE_API });
    })
    .catch(error => {
      console.log('ERROR', error);
      dispatch({ type: CLOSE_API });
    });
};

const updateUserDetails = userDetails => dispatch =>
  dispatch({ type: WRITE_USER_DETAILS, payload: userDetails });

export {
  updateUserDetails,
  createKcalTarget,
  createWorkoutTarget,
  getWorkoutTargets,
  fetchUserDetails,
  getKcalTargets,
  initFetch,
  getWorkoutLogDates
};
