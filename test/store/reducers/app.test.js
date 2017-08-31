import { Map, List } from 'immutable';

import reducer from './../../../src/store/reducers/app';
import * as app from './../../../src/store/actions/app_actions';

describe('app reducer', () => {
  it('should set isLoading to TRUE on INIT_FETCH', () => {
    const nextState = reducer(undefined, { type: app.INIT_FETCH });
    expect(nextState.get('isFetching')).toBe(true);
  });

  it('should set isLoading to FALSE on CLOSE_FETCH', () => {
    const nextState = reducer(reducer(undefined, { type: app.CLOSE_FETCH }), {
      type: app.CLOSE_FETCH
    });
    expect(nextState.get('isFetching')).toBe(false);
  });

  it('should set isLoading to TRUE on INIT_API', () => {
    const nextState = reducer(undefined, { type: app.INIT_API });
    expect(nextState.get('isLoading')).toBe(true);
  });

  it('should set isLoading to FALSE on CLOSE_API', () => {
    const nextState = reducer(reducer(undefined, { type: app.INIT_API }), {
      type: app.CLOSE_API
    });
    expect(nextState.get('isLoading')).toBe(false);
  });

  it('should set isSideBarOpen to TRUE on OPEN_SIDE_BAR', () => {
    const nextState = reducer(undefined, { type: app.OPEN_SIDE_BAR });
    expect(nextState.get('isSideBarOpen')).toBe(true);
  });

  it('should set isSideBarOpen to FALSE on CLOSE_SIDE_BAR', () => {
    const nextState = reducer(reducer(undefined, { type: app.OPEN_SIDE_BAR }), {
      type: app.CLOSE_SIDE_BAR
    });
    expect(nextState.get('isSideBarOpen')).toBe(false);
  });

  it('should set isConfirmDeleteModalOpen to TRUE on OPEN_CONFIRM_DELETE_MODAL', () => {
    const nextState = reducer(undefined, {
      type: app.OPEN_CONFIRM_DELETE_MODAL
    });
    expect(nextState.get('isConfirmDeleteModalOpen')).toBe(true);
  });

  it('should set isConfirmDeleteModalOpen to FALSE on CLOSE_CONFIRM_DELETE_MODAL', () => {
    const nextState = reducer(
      reducer(undefined, { type: app.OPEN_CONFIRM_DELETE_MODAL }),
      {
        type: app.CLOSE_CONFIRM_DELETE_MODAL
      }
    );
    expect(nextState.get('isConfirmDeleteModalOpen')).toBe(false);
  });

  it('should set isErrorModalOpen to TRUE on OPEN_ERROR_MODAL', () => {
    const nextState = reducer(undefined, {
      type: app.OPEN_ERROR_MODAL
    });
    expect(nextState.get('isErrorModalOpen')).toBe(true);
  });

  it('should set isErrorModalOpen to FALSE on CLOSE_ERROR_MODAL', () => {
    const nextState = reducer(
      reducer(undefined, { type: app.OPEN_ERROR_MODAL }),
      {
        type: app.CLOSE_ERROR_MODAL
      }
    );
    expect(nextState.get('isErrorModalOpen')).toBe(false);
  });

  it('should set selected daily log _id', () => {
    const nextState = reducer(undefined, {
      type: app.SET_SELECTED_DAILY_LOG,
      payload: 'randomId'
    });
    expect(nextState.get('selectedDailyLog')).toBe('randomId');
  });

  it('should set selected workout log _id', () => {
    const nextState = reducer(undefined, {
      type: app.SET_SELECTED_WORKOUT_LOG,
      payload: 'randomId'
    });
    expect(nextState.get('selectedWorkoutLog')).toBe('randomId');
  });

  it('should set selected workout target _id', () => {
    const nextState = reducer(undefined, {
      type: app.SET_SELECTED_WORKOUT_TARGET,
      payload: 'randomId'
    });
    expect(nextState.get('selectedWorkoutTarget')).toBe('randomId');
  });

  it('should set selected month for daily log', () => {
    const nextState = reducer(undefined, {
      type: app.SELECT_DAILY_LOG_MONTH,
      payload: '05-2016'
    });
    expect(nextState.get('selectedMonthForDailyLogs')).toBe('05-2016');
  });

  it('should set selected month for workout log', () => {
    const nextState = reducer(undefined, {
      type: app.SELECT_WORKOUT_LOG_MONTH,
      payload: '05-2016'
    });
    expect(nextState.get('selectedMonthForWorkoutLogs')).toBe('05-2016');
  });

  it('should set isConsentModalOpen to true with applied date', () => {
    const nextState = reducer(undefined, {
      type: app.OPEN_CONSENT_MODAL,
      payload: '01-01-2017'
    });
    expect(nextState.get('isConsentModalOpen')).toBe(true);
    expect(nextState.get('openConsentModalDate')).toBe('01-01-2017');
  });

  it('should set isConsentModalOpen to false', () => {
    const nextState = reducer(
      Map()
        .set('openConsentModalDate', '01-01-2017')
        .set('isConsentModalOpen', true),
      {
        type: app.CLOSE_CONSENT_MODAL
      }
    );

    expect(nextState.get('isConsentModalOpen')).toBe(false);
    expect(nextState.get('openConsentModalDate')).toBe(undefined);
  });

  it('should set isMessageBarOpen to false', () => {
    const nextState = reducer(Map().set('isMessageBarOpen', true), {
      type: app.CLOSE_MESSAGE_BAR
    });

    expect(nextState.get('isMessageBarOpen')).toBe(false);
  });

  it('should set isMessageBarOpen to true', () => {
    const nextState = reducer(Map(), {
      type: app.OPEN_MESSAGE_BAR
    });

    expect(nextState.get('isMessageBarOpen')).toBe(true);
  });

  it('should set message to payload', () => {
    const nextState = reducer(Map(), {
      type: app.SET_MESSAGE,
      payload: 'sample'
    });

    expect(nextState.get('message')).toBe('sample');
  });

  it(`should unset message to ['']`, () => {
    const message = reducer(Map(), {
      type: app.SET_MESSAGE,
      payload: 'sample'
    });

    const nextState = reducer(message, {
      type: app.UNSET_MESSAGES
    });

    expect(nextState.get('message')).toEqual(List().push(''));
  });
});
