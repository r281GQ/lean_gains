import { fromJS } from 'immutable';

import * as app from './../actions/app_actions';

const INITIAL_STATE = fromJS({
  isConfirmDeleteModalOpen: false,
  isSideBarOpen: false,
  isLoading: false
});

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case app.INIT_API:
      return state.set('isLoading', true);
    case app.CLOSE_API:
      return state.set('isLoading', false);
    case app.OPEN_SIDE_BAR:
      return state.set('isSideBarOpen', true);
    case app.CLOSE_SIDE_BAR:
      return state.set('isSideBarOpen', false);
    case app.SELECT_WORKOUT_LOG_MONTH:
      return state.set('selectedMonthForWorkoutLogs', payload);
    case app.SELECT_DAILY_LOG_MONTH:
      return state.set('selectedMonthForDailyLogs', payload);
    case app.OPEN_CONFIRM_DELETE_MODAL:
      return state.set('isConfirmDeleteModalOpen', true);
    case app.CLOSE_CONFIRM_DELETE_MODAL:
      return state.set('isConfirmDeleteModalOpen', false);
    case app.SET_SELECTED_WORKOUT_LOG:
      return state.set('selectedWorkoutLog', payload);
    case app.SET_SELECTED_DAILY_LOG:
      return state.set('selectedDailyLog', payload);
    case app.SET_SELECTED_WORKOUT_TARGET:
      return state.set('selectedWorkoutTarget', payload);
    default:
      return state;
  }
};

export default reducer;
