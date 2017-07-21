import { Map } from 'immutable';
import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import moment from 'moment';

import reducer from './../../../src/store/reducers/daily_logs';
import * as dailyLogs from './../../../src/store/actions/daily_logs_actions';
import {
  dailyLogDates,
  dailyLogs as dailyLogsPayload
} from './../../../shared/test_constants';

chai.use(chaiImmutable);

describe('daily logs reducer', () => {
  it('should write dates', () => {
    const nextState = reducer(undefined, {
      type: dailyLogs.WRITE_DAILY_LOG_DATES,
      payload: dailyLogDates
    });

    expect(nextState.get('dates').size).to.equal(2);
    expect(nextState.get('dates')).to.include(
      dailyLogDates[0],
      dailyLogDates[1]
    );
  });

  it('should write date', () => {
    const nextState = reducer(undefined, {
      type: dailyLogs.WRITE_DAILY_LOG_DATE,
      payload: dailyLogDates[0]
    });

    expect(nextState.get('dates').size).to.equal(1);
    expect(nextState.get('dates')).to.include(dailyLogDates[0]);
  });

  it('should remove date', () => {
    const nextState = reducer(reducer(undefined, {
      type: dailyLogs.WRITE_DAILY_LOG_DATE,
      payload: dailyLogDates[0]
    }), {
      type: dailyLogs.DELETE_DAILY_LOG_DATE,
      payload: dailyLogDates[0]
    });

    expect(nextState.get('dates').size).to.equal(0);
  });

  it('should write logs', () => {
    const nextState = reducer(undefined, {
      type: dailyLogs.WRITE_DAILY_LOGS,
      payload: dailyLogsPayload
    });

    expect(nextState.get('data').size).to.equal(2);
  });

  it('should write log', () => {
    const nextState = reducer(undefined, {
      type: dailyLogs.WRITE_DAILY_LOG,
      payload: dailyLogsPayload[0]
    });

    expect(nextState.get('data').size).to.equal(1);
  });

  it('should delete log', () => {
    const nextState = reducer(undefined, {
      type: dailyLogs.DELETE_DAILY_LOG,
      payload: dailyLogsPayload[0]._id
    });

    expect(nextState.get('data').size).to.equal(0);
  });
});
