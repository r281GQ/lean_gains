import { initialize, isPristine } from 'redux-form/immutable';
import { Map } from 'immutable';
import * as app from './../actions/app_actions';
import * as calorieLog from './../actions/calorie_actions';
import request from './../../services/request';

export const setSelectedMonthForWorkoutLogs = month => ({
  type: app.SELECT_WORKOUT_LOG_MONTH,
  payload: month
});

export const setSelectedMonthForDailyLogs = month => ({
  type: app.SELECT_DAILY_LOG_MONTH,
  payload: month
});

export const openWorkoutModal = () => ({ type: app.OPEN_CONFIRM_DELETE_MODAL });

export const closeWorkoutModal = () => ({
  type: app.CLOSE_CONFIRM_DELETE_MODAL
});

export const openConsentModal = () => ({ type: app.OPEN_CONSENT_MODAL });

export const closeConsentModal = () => ({ type: app.CLOSE_CONSENT_MODAL });

export const openSideBar = () => ({ type: app.OPEN_SIDE_BAR });

export const closeSideBar = () => ({ type: app.CLOSE_SIDE_BAR });

export const setSelectedWorkoutLog = _id => ({
  type: app.SET_SELECTED_WORKOUT_LOG,
  payload: _id
});

export const setSelectedWorkoutTarget = _id => ({
  type: app.SET_SELECTED_WORKOUT_TARGET,
  payload: _id
});

export const setSelectedDailyLog = _id => ({
  type: app.SET_SELECTED_DAILY_LOG,
  payload: _id
});

export const addCalorieTrackConsent = () => ({type: app.ADD_CONSENT})

export const openMessageBar = () => ({ type: app.OPEN_MESSAGE_BAR });

export const closeMessageBar = () => ({ type: app.CLOSE_MESSAGE_BAR });

export const initFetch = () => ({ type: app.INIT_FETCH });

export const closeFetch = () => ({ type: app.CLOSE_FETCH });

export const loadNutritionsForDay = day => (dispatch, getState) => {
  if (
    getState().getIn(['app', 'hasCalorieTrackConsent']) ||
    isPristine('calorie-track')(getState())
  ) {
    dispatch({
      type: app.SET_CALORIE_LOG_DAY,
      payload: day
    });
    request
      .get('/api/calorielogs', { params: { day } })
      .then(({ data }) => {
        dispatch({ type: calorieLog.WRITE_CALORIE_LOG, payload: data });
        dispatch(
          initialize(
            'calorie-track',
            Map().set('foods', getState().getIn(['calorieLog', 'nutritions']))
          )
        );
        dispatch({ type: app.REMOVE_CONSENT });
        dispatch({ type: app.UNSET_PENDING_CALORIE_LOG_DAY });
      })
      .catch(error => console.log(error));
  } else {
    return dispatch({ type: app.OPEN_CONSENT_MODAL, payload: day });
  }
};
