import { fromJS } from 'immutable';
import moment from 'moment';

import * as app from './../actions/app_actions';

const INITIAL_STATE = fromJS({
  isConfirmDeleteModalOpen: false,
  isSideBarOpen: false,
  isLoading: false,
  isMessageBarOpen: false,
  isFetching: false,
  selectedDayCalorieLog: moment().toDate(),
  message: '',
  isConsentModalOpen: false
});

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case app.OPEN_CONSENT_MODAL:
      return state
        .set('isConsentModalOpen', true)
        .set('openConsentModalDate', fromJS(payload));
    case app.CLOSE_CONSENT_MODAL:
      return state
        .set('isConsentModalOpen', false)
        .set('openConsentModalDate', undefined);
    case app.SET_MESSAGE:
      return state.set('message', payload);
    case app.OPEN_MESSAGE_BAR:
      return state.set('isMessageBarOpen', true);
    case app.CLOSE_MESSAGE_BAR:
      return state.set('isMessageBarOpen', false);
    case app.INIT_API:
      return state.set('isLoading', true);
    case app.CLOSE_API:
      return state.set('isLoading', false);
    case app.INIT_FETCH:
      return state.set('isFetching', true);
    case app.CLOSE_FETCH:
      return state.set('isFetching', false);
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
