import Immutable, { formJS, Map } from "immutable";

import * as APP from "./../actions/app_actions";

const INITIAL_STATE = Map().set("isWorkoutLogModalOpen", false);

const app = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case APP.SELECT_WORKOUT_LOG_MONTH:
      return state.set("selectedMonthForWorkoutLogs", payload);
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
