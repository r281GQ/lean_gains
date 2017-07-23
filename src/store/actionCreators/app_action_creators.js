import * as app from './../actions/app_actions';

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

const openMessageBar = () => ({ type: app.OPEN_MESSAGE_BAR });

const closeMessageBar = () => ({ type: app.CLOSE_MESSAGE_BAR });

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
  closeMessageBar
};
