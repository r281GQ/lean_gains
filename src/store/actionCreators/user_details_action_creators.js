import request from './../../services/request';
import * as userDetails from './../actions/user_details_actions';
import * as app from './../actions/app_actions';

export const createKcalTarget = calorieTarget => dispatch =>
  request
    .post('/api/calorietargets', calorieTarget)
    .then(({ data }) => {
      dispatch({
        type: userDetails.WRITE_KCAL_TARGETS,
        payload: data
      });
    })
    .catch(error => console.log(error));

export const createWorkoutTarget = workoutLog => dispatch =>
  request
    .post('/api/workouttargets', workoutLog)
    .then(({ data }) => {
      dispatch({
        type: userDetails.WRITE_WORKOUT_TARGET,
        payload: data
      });
    })
    .catch(error => console.log(error));

export const updateWorkoutTarget = workoutLog => dispatch => {
  request
    .put('/api/workouttargets', workoutLog)
    .then(({ data }) => {
      dispatch({
        type: userDetails.WRITE_WORKOUT_TARGET,
        payload: data
      });
    })
    .catch(error => console.log(error));
};

export const deleteWorkoutTarget = _id => dispatch =>
  request
    .delete(`/api/workouttargets/${_id}`)
    .then(({ data }) =>
      dispatch({ type: userDetails.DELETE_WORKOUT_TARGET, payload: _id })
    )
    .catch(error => console.log(error));

export const initFetch = () => dispatch => {
  dispatch({ type: app.INIT_FETCH });
  request
    .get('/api/calorietargets')
    .then(({ data }) => {
      dispatch({
        type: userDetails.WRITE_KCAL_TARGETS,
        payload: data
      });
      return request.get('/api/workouttargets');
    })
    .then(({ data }) => {
      dispatch({
        type: userDetails.WRITE_WORKOUT_TARGETS,
        payload: data
      });
      return request.get(`/api/userdetails`);
    })
    .then(({ data }) => {
      dispatch({
        type: userDetails.WRITE_USER_DETAILS,
        payload: data
      });
      return request.get('/api/latestmeasurements');
    })
    .then(({ data }) => {
      dispatch({ type: userDetails.WRITE_LATEST, payload: data });
      dispatch({ type: app.CLOSE_FETCH });
    })
    .catch(error => console.log(error));
};

export const updateUserDetails = userDetailsInfo => dispatch =>
  request
    .put(`/api/userdetails`, userDetailsInfo)
    .then(({ data }) =>
      dispatch({ type: userDetails.WRITE_USER_DETAILS, payload: data })
    )
    .catch(error => console.log(error));
