import * as app from './../actions/app_actions';
import { change, initialize, isDirty, isPristine } from 'redux-form/immutable';
import * as calorieLog from './../actions/calorie_actions';
import axios from 'axios';
import { Map } from 'immutable';
import moment from 'moment';
const setSelectedMonthForWorkoutLogs = month => ({
  type: app.SELECT_WORKOUT_LOG_MONTH,
  payload: month
});

const setSelectedMonthForDailyLogs = month => ({
  type: app.SELECT_DAILY_LOG_MONTH,
  payload: month
});

const openWorkoutModal = () => ({ type: app.OPEN_CONFIRM_DELETE_MODAL });

const closeWorkoutModal = () => ({ type: app.CLOSE_CONFIRM_DELETE_MODAL });

const openConsentModal = () => ({ type: app.OPEN_CONSENT_MODAL });

const closeConsentModal = () => ({ type: app.CLOSE_CONSENT_MODAL });

const openSideBar = () => ({ type: app.OPEN_SIDE_BAR });

const closeSideBar = () => ({ type: app.CLOSE_SIDE_BAR });

const setSelectedWorkoutLog = _id => ({
  type: app.SET_SELECTED_WORKOUT_LOG,
  payload: _id
});

const setSelectedWorkoutTarget = _id => ({
  type: app.SET_SELECTED_WORKOUT_TARGET,
  payload: _id
});

const setSelectedDailyLog = _id => ({
  type: app.SET_SELECTED_DAILY_LOG,
  payload: _id
});

const loadNutritionsForDay = day => (dispatch, getState) => {
  if (
    getState().getIn(['app', 'hasCalorieTrackConsent']) ||
    isPristine('calorie-track')(getState())
  ) {
    dispatch({
      type: app.SET_CALORIE_LOG_DAY,
      payload: day
    });
    axios
      .get('/api/calorielogs', { withCredentials: true, params: { day } })
      .then(({ data }) => {
        dispatch({ type: calorieLog.WRITE_CALORIE_LOG, payload: data });
        dispatch(
          initialize(
            'calorie-track',
            Map().set('foods', getState().getIn(['calorieLog', 'nutritions']))
          )
        );
        dispatch({ type: 'removeConsent' });
      })
      .catch(err => {});
  } else {
    return dispatch({ type: app.OPEN_CONSENT_MODAL, payload: day });
  }
};
const openMessageBar = () => ({ type: app.OPEN_MESSAGE_BAR });

const closeMessageBar = () => ({ type: app.CLOSE_MESSAGE_BAR });

const initFetch = () => ({ type: app.INIT_FETCH });

const closeFetch = () => ({ type: app.CLOSE_FETCH });

export {
  setSelectedMonthForDailyLogs,
  setSelectedMonthForWorkoutLogs,
  openWorkoutModal,
  closeWorkoutModal,
  setSelectedWorkoutLog,
  openSideBar,
  closeSideBar,
  setSelectedWorkoutTarget,
  setSelectedDailyLog,
  openMessageBar,
  closeMessageBar,
  initFetch,
  closeFetch,
  loadNutritionsForDay,
  openConsentModal,
  closeConsentModal
};
