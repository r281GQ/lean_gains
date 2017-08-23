import request from './../../services/request';
import * as userDetails from './../actions/user_details_actions';
import * as app from './../actions/app_actions';

export const createCalorieTarget = calorieTarget => dispatch => {
  dispatch({ type: app.INIT_API });
  return request
    .post('/api/calorietargets', calorieTarget)
    .then(({ data }) => {
      dispatch({
        type: userDetails.WRITE_KCAL_TARGETS,
        payload: data
      });
      dispatch({ type: app.CLOSE_API });
    })
    .catch(() => dispatch({ type: app.CLOSE_API }));
};

export const createWorkoutTarget = workoutLog => dispatch => {
  dispatch({ type: app.INIT_API });
  return request
    .post('/api/workouttargets', workoutLog)
    .then(({ data }) => {
      dispatch({
        type: userDetails.WRITE_WORKOUT_TARGET,
        payload: data
      });
      dispatch({ type: app.CLOSE_API });
    })
    .catch(() => dispatch({ type: app.CLOSE_API }));
};

export const updateWorkoutTarget = workoutLog => dispatch => {
  dispatch({ type: app.INIT_API });
  return request
    .put('/api/workouttargets', workoutLog)
    .then(({ data }) => {
      dispatch({
        type: userDetails.WRITE_WORKOUT_TARGET,
        payload: data
      });
      dispatch({ type: app.CLOSE_API });
    })
    .catch(() => dispatch({ type: app.CLOSE_API }));
};

export const deleteWorkoutTarget = _id => dispatch => {
  dispatch({ type: app.INIT_API });
  return request
    .delete(`/api/workouttargets/${_id}`)
    .then(() => {
      dispatch({ type: userDetails.DELETE_WORKOUT_TARGET, payload: _id });
      dispatch({ type: app.CLOSE_API });
    })
    .catch(() => dispatch({ type: app.CLOSE_API }));
};

export const initFetch = () => dispatch => {
  dispatch({ type: app.INIT_API });
  return request
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
      dispatch({ type: app.CLOSE_API });
    })
    .catch(() => dispatch({ type: app.CLOSE_API }));
};

export const updateUserDetails = userDetailsInfo => dispatch => {
  dispatch({ type: app.INIT_API });
  return request
    .put(`/api/userdetails`, userDetailsInfo)
    .then(({ data }) => {
      dispatch({ type: userDetails.WRITE_USER_DETAILS, payload: data });
      dispatch({ type: app.CLOSE_API });
    })
    .catch(() => dispatch({ type: app.CLOSE_API }));
};
