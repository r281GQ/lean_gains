import * as APP from './../actions/app_actions';

const setSelectedMonthForWorkoutLogs = month => dispatch =>
  dispatch({ type: APP.SELECT_WORKOUT_LOG_MONTH, payload: month });

const setSelectedMonthForDailyLogs = month => dispatch =>
  dispatch({ type: APP.SELECT_DAILY_LOG_MONTH, payload: month });

const openWorkoutModal = () => dispatch =>
  dispatch({ type: APP.OPEN_WORKOUT_LOG_MODAL });

const closeWorkoutModal = () => dispatch =>
  dispatch({ type: APP.CLOSE_WORKOUT_LOG_MODAL });

const openSideBar = () => dispatch => dispatch({ type: APP.OPEN_SIDE_BAR });

const closeSideBar = () => dispatch => dispatch({ type: APP.CLOSE_SIDE_BAR });

const setSelectedWorkoutLog = _id => dispatch =>
  dispatch({ type: APP.SET_SELECTED_WORKOUT_LOG, payload: _id });

const setSelectedWorkoutTarget = _id => dispatch =>
  dispatch({ type: APP.SET_SELECTED_WORKOUT_TARGET, payload: _id });

export {
  setSelectedMonthForDailyLogs,
  setSelectedMonthForWorkoutLogs,
  openWorkoutModal,
  closeWorkoutModal,
  setSelectedWorkoutLog,
  openSideBar,
  closeSideBar,
  setSelectedWorkoutTarget
};
