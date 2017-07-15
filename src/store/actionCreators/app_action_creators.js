import * as APP from "./../actions/app_actions";

const selectMonth = month => dispatch =>
  dispatch({ type: APP.SELECT_WORKOUT_LOG_MONTH, payload: month });
const openWorkoutModal = () => dispatch =>
  dispatch({ type: APP.OPEN_WORKOUT_LOG_MODAL });
const closeWorkoutModal = () => dispatch =>
  dispatch({ type: APP.CLOSE_WORKOUT_LOG_MODAL });
const setSelectedWorkoutLog = _id => dispatch =>
  dispatch({ type: APP.SET_SELECTED_WORKOUT_LOG, payload: _id });

export {
  selectMonth,
  openWorkoutModal,
  closeWorkoutModal,
  setSelectedWorkoutLog
};
