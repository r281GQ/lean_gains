import chai from 'chai';

import reducer from './../../../src/store/reducers/app';
import * as app from './../../../src/store/actions/app_actions';


describe('app reducer', () => {
  it('should set isLoading to TRUE on INIT_API', () => {
    const nextState = reducer(undefined, { type: app.INIT_API });
    expect(nextState).toMatchSnapshot();
  });

  it('should set isLoading to FALSE on CLOSE_API', () => {
    const nextState = reducer(reducer(undefined, { type: app.INIT_API }), {
      type: app.CLOSE_API
    });
    expect(nextState).toMatchSnapshot();
  });

  it('should set isSideBarOpen to TRUE on OPEN_SIDE_BAR', () => {
    const nextState = reducer(undefined, { type: app.OPEN_SIDE_BAR });
    expect(nextState).toMatchSnapshot();
  });

  it('should set isSideBarOpen to FALSE on CLOSE_SIDE_BAR', () => {
    const nextState = reducer(reducer(undefined, { type: app.OPEN_SIDE_BAR }), {
      type: app.CLOSE_SIDE_BAR
    });
    expect(nextState).toMatchSnapshot();
  });

  it('should set isConfirmDeleteModalOpen to TRUE on OPEN_CONFIRM_DELETE_MODAL', () => {
    const nextState = reducer(undefined, {
      type: app.OPEN_CONFIRM_DELETE_MODAL
    });
    expect(nextState).toMatchSnapshot();
  });

  it('should set isConfirmDeleteModalOpen to FALSE on CLOSE_CONFIRM_DELETE_MODAL', () => {
    const nextState = reducer(
      reducer(undefined, { type: app.OPEN_CONFIRM_DELETE_MODAL }),
      {
        type: app.CLOSE_CONFIRM_DELETE_MODAL
      }
    );
    expect(nextState).toMatchSnapshot();
  });

  it('should set selected daily log _id', () => {
    const nextState = reducer(undefined, {
      type: app.SET_SELECTED_DAILY_LOG,
      payload: 'randomId'
    });
    chai.expect(nextState.get('selectedDailyLog')).to.equal('randomId');
  });

  it('should set selected workout log _id', () => {
    const nextState = reducer(undefined, {
      type: app.SET_SELECTED_WORKOUT_LOG,
      payload: 'randomId'
    });
    chai.expect(nextState.get('selectedWorkoutLog')).to.equal('randomId');
  });

  it('should set selected workout target _id', () => {
    const nextState = reducer(undefined, {
      type: app.SET_SELECTED_WORKOUT_TARGET,
      payload: 'randomId'
    });
    chai.expect(nextState.get('selectedWorkoutTarget')).to.equal('randomId');
  });

  it('should set selected month for daily log', () => {
    const nextState = reducer(undefined, {
      type: app.SELECT_DAILY_LOG_MONTH,
      payload: '05-2016'
    });
    chai.expect(nextState.get('selectedMonthForDailyLogs')).to.equal('05-2016');
  });

  it('should set selected month for workout log', () => {
    const nextState = reducer(undefined, {
      type: app.SELECT_WORKOUT_LOG_MONTH,
      payload: '05-2016'
    });
    chai.expect(nextState.get('selectedMonthForWorkoutLogs')).to.equal('05-2016');
  });
});
