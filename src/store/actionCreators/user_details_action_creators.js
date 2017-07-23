import axios from 'axios';

import * as userDetails from './../actions/user_details_actions';

const createKcalTarget = calorieTarget => dispatch =>
  axios
    .post('http://localhost:4000/api/kcaltarget', calorieTarget)
    .then(({ data }) => {
      dispatch({
        type: userDetails.WRITE_KCAL_TARGETS,
        payload: data
      });
    })
    .catch(error => console.log(error));

const createWorkoutTarget = workoutLog => dispatch =>
  axios
    .post('http://localhost:4000/api/workoutTargets', workoutLog)
    .then(({ data }) => {
      dispatch({
        type: userDetails.WRITE_WORKOUT_TARGET,
        payload: data
      });
    })
    .catch(error => console.log(error));

const deleteWorkoutTarget = _id => dispatch =>
  axios
    .delete(`http://localhost:4000/api/workoutTargets/${_id}`)
    .then(({ data }) =>
      dispatch({ type: userDetails.DELETE_WORKOUT_TARGET, payload: _id })
    )
    .catch(error => console.log(error));

const initFetch = () => dispatch => {
  axios
    .get('http://localhost:4000/api/kcaltargets')
    .then(({ data }) => {
      dispatch({
        type: userDetails.WRITE_KCAL_TARGETS,
        payload: data
      });
      return axios.get('http://localhost:4000/api/workoutTargets');
    })
    .then(({ data }) => {
      dispatch({
        type: userDetails.WRITE_WORKOUT_TARGETS,
        payload: data
      });
      return axios.get(`http://localhost:4000/api/userDetails`);
    })
    .then(({ data }) => {
      dispatch({
        type: userDetails.WRITE_USER_DETAILS,
        payload: data
      });
      return axios.get('http://localhost:4000/api/latestmeasurements');
    })
    .then(({ data }) => {
      dispatch({ type: userDetails.WRITE_LATEST, payload: data });
    })
    .catch(error => console.log(error));
};

const updateUserDetails = userDetails => dispatch =>
  axios
    .put(`http://localhost:4000/api/userDetails`, userDetails)
    .then(({ data }) =>
      dispatch({ type: userDetails.WRITE_USER_DETAILS, payload: data })
    )
    .catch(error => console.log(error));

export {
  initFetch,
  updateUserDetails,
  createKcalTarget,
  createWorkoutTarget,
  deleteWorkoutTarget
};
