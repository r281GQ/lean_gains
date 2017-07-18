import Immutable, { fromJS } from "immutable";

import * as APP from "./../actions/app_actions";

const INITIAL_STATE = fromJS({
  isWorkoutLogModalOpen: false,
  isSideBarOpen: false
});

const app = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case APP.OPEN_SIDE_BAR:
      return state.set("isSideBarOpen", true);
    case APP.CLOSE_SIDE_BAR:
      return state.set("isSideBarOpen", false);
    case APP.SELECT_WORKOUT_LOG_MONTH:
      return state.set("selectedMonthForWorkoutLogs", payload);
    case APP.SELECT_DAILY_LOG_MONTH:
      return state.set("selectedMonthForDailyLogs", payload);
    case APP.OPEN_WORKOUT_LOG_MODAL:
      return state.set("isWorkoutLogModalOpen", true);
    case APP.CLOSE_WORKOUT_LOG_MODAL:
      return state.set("isWorkoutLogModalOpen", false);
    case APP.SET_SELECTED_WORKOUT_LOG:
      return state.set("selectedWorkoutLog", payload);
    default:
      return state;
  }
};

export default app;
