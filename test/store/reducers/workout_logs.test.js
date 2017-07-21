import Immutable, { fromJS } from 'immutable';
import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import moment from 'moment';

import {
  workoutLogs as workoutLogsPayload,
  workoutLogDates
} from './../../../shared/test_constants';
import reducer from './../../../src/store/reducers/workout_logs';
import * as workoutLogs from './../../../src/store/actions/workout_logs_actions';
chai.use(chaiImmutable);

describe('workout logs reducer', () => {
  it('should write all workout logs', () => {
    const nextState = reducer(undefined, {
      type: workoutLogs.WRITE_WORKOUT_LOGS,
      payload: workoutLogsPayload
    });
    expect(nextState.get('data')).to.include.keys(
      '0_workout_log',
      '1_0_workout_log'
    );
    expect(nextState.get('data').size).to.equal(3);
  });

  it('should write one workout log', () => {
    const firstWorkoutLog = workoutLogsPayload[0];
    const nextState = reducer(undefined, {
      type: workoutLogs.WRITE_WORKOUT_LOG,
      payload: firstWorkoutLog
    });
    expect(nextState.get('data')).to.include.keys('0_workout_log');
    expect(nextState.get('data').size).to.equal(1);
  });

  it('should write one workout log date', () => {
    const firstWorkoutLogDate = workoutLogDates[0];
    const nextState = reducer(undefined, {
      type: workoutLogs.WRITE_WORKOUT_LOG_DATE,
      payload: firstWorkoutLogDate
    });
    expect(nextState.get('dates')).to.include(firstWorkoutLogDate);
    expect(nextState.get('data').size).to.equal(0);
    expect(nextState.get('dates').size).to.equal(1);
  });

  it('should write workout log dates', () => {
    const nextState = reducer(undefined, {
      type: workoutLogs.WRITE_WORKOUT_LOG_DATES,
      payload: workoutLogDates
    });
    expect(nextState.get('data').size).to.equal(0);
    expect(nextState.get('dates').size).to.equal(3);
  });
  it('should delete workout log', () => {
    const firstWorkoutLog = workoutLogsPayload[0];
    const stateWithWorkoutLog = reducer(undefined, {
      type: workoutLogs.WRITE_WORKOUT_LOG,
      payload: firstWorkoutLog
    });
    expect(stateWithWorkoutLog.get('data').size).to.equal(1);
    const nextState = reducer(stateWithWorkoutLog, {
      type: workoutLogs.DELETE_WORKOUT_LOG,
      payload: firstWorkoutLog._id
    });
    expect(nextState.get('data').size).to.equal(0);
    expect(nextState.get('dates').size).to.equal(0);
  });

  it('should delete workout log date', () => {
    const firstWorkoutLogDate = workoutLogDates[0];
    const stateWithWorkoutLog = reducer(undefined, {
      type: workoutLogs.WRITE_WORKOUT_LOG_DATE,
      payload: firstWorkoutLogDate
    });
    const nextState = reducer(stateWithWorkoutLog, {
      type: workoutLogs.DELETE_WORKOUT_LOG_DATE,
      payload: firstWorkoutLogDate
    });
    expect(nextState.get('dates').size).to.equal(0);
  });
});
