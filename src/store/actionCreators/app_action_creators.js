import * as app from './../actions/app_actions';

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

export const setMessages = messages => ({
  type: app.SET_MESSAGE,
  payload: messages
});

export const unSetMessages = () => ({ type: app.UNSET_MESSAGES });

export const openConsentModal = () => ({ type: app.OPEN_CONSENT_MODAL });

export const closeConsentModal = () => ({ type: app.CLOSE_CONSENT_MODAL });

export const openErrorModal = () => ({ type: app.OPEN_ERROR_MODAL });

export const closeErrorModal = () => ({ type: app.CLOSE_ERROR_MODAL });

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

export const addCalorieTrackConsent = () => ({ type: app.ADD_CONSENT });

export const openMessageBar = () => ({ type: app.OPEN_MESSAGE_BAR });

export const closeMessageBar = () => ({ type: app.CLOSE_MESSAGE_BAR });

export const initFetch = () => ({ type: app.INIT_FETCH });

export const closeFetch = () => ({ type: app.CLOSE_FETCH });
