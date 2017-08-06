import axios from 'axios';

import * as userDetails from './../actions/user_details_actions';

const createKcalTarget = calorieTarget => dispatch =>
  axios
    .post('/api/calorietargets', calorieTarget, { withCredentials: true })
    .then(({ data }) => {
      dispatch({
        type: userDetails.WRITE_KCAL_TARGETS,
        payload: data
      });
    })
    .catch(error => console.log(error));

const createWorkoutTarget = workoutLog => dispatch =>
  axios
    .post('/api/workouttargets', workoutLog, { withCredentials: true })
    .then(({ data }) => {
      dispatch({
        type: userDetails.WRITE_WORKOUT_TARGET,
        payload: data
      });
    })
    .catch(error => console.log(error));

const updateWorkoutTarget = workoutLog => dispatch => {
  console.log('called', workoutLog);
  axios
    .put('/api/workouttargets', workoutLog, { withCredentials: true })
    .then(({ data }) => {
      dispatch({
        type: userDetails.WRITE_WORKOUT_TARGET,
        payload: data
      });
    })
    .catch(error => console.log(error));
};

const deleteWorkoutTarget = _id => dispatch =>
  axios
    .delete(`/api/workouttargets/${_id}`, { withCredentials: true })
    .then(({ data }) =>
      dispatch({ type: userDetails.DELETE_WORKOUT_TARGET, payload: _id })
    )
    .catch(error => console.log(error));

const initFetch = () => dispatch => {
  axios
    .get('/api/calorietargets', { withCredentials: true })
    .then(({ data }) => {
      dispatch({
        type: userDetails.WRITE_KCAL_TARGETS,
        payload: data
      });
      return axios.get('/api/workouttargets', { withCredentials: true });
    })
    .then(({ data }) => {
      dispatch({
        type: userDetails.WRITE_WORKOUT_TARGETS,
        payload: data
      });
      return axios.get(`/api/userdetails`, { withCredentials: true });
    })
    .then(({ data }) => {
      dispatch({
        type: userDetails.WRITE_USER_DETAILS,
        payload: data
      });
      return axios.get('/api/latestmeasurements', { withCredentials: true });
    })
    .then(({ data }) => {
      dispatch({ type: userDetails.WRITE_LATEST, payload: data });
    })
    .catch(error => console.log(error));
};

const updateUserDetails = userDetailsInfo => dispatch =>
  axios
    .put(`/api/userdetails`, userDetailsInfo, { withCredentials: true })
    .then(({ data }) =>
      dispatch({ type: userDetails.WRITE_USER_DETAILS, payload: data })
    )
    .catch(error => console.log(error));

export {
  initFetch,
  updateWorkoutTarget,
  updateUserDetails,
  createKcalTarget,
  createWorkoutTarget,
  deleteWorkoutTarget
};
