import reducer from './../../../src/store/reducers/daily_logs';
import * as dailyLogs from './../../../src/store/actions/daily_logs_actions';
import {
  dailyLogDates,
  dailyLogs as dailyLogsPayload
} from './../../../shared/test_constants';

describe('daily logs reducer', () => {
  it('should write dates', () => {
    const nextState = reducer(undefined, {
      type: dailyLogs.WRITE_DAILY_LOG_DATES,
      payload: dailyLogDates
    });

    expect(nextState.get('dates').size).toBe(2);
    expect(nextState.get('dates').toJS()).toEqual(
      expect.arrayContaining([dailyLogDates[0], dailyLogDates[1]])
    );
  });

  it('should write date', () => {
    const nextState = reducer(undefined, {
      type: dailyLogs.WRITE_DAILY_LOG_DATE,
      payload: dailyLogDates[0]
    });

    expect(nextState.get('dates').size).toBe(1);
    expect(nextState.get('dates')).toContain(dailyLogDates[0]);
  });

  it('should remove date', () => {
    const nextState = reducer(
      reducer(undefined, {
        type: dailyLogs.WRITE_DAILY_LOG_DATE,
        payload: dailyLogDates[0]
      }),
      {
        type: dailyLogs.DELETE_DAILY_LOG_DATE,
        payload: dailyLogDates[0]
      }
    );

    expect(nextState.get('dates').size).toBe(0);
  });

  it('should write logs', () => {
    const nextState = reducer(undefined, {
      type: dailyLogs.WRITE_DAILY_LOGS,
      payload: dailyLogsPayload
    });

    expect(nextState.get('data').size).toBe(2);
  });

  it('should write log', () => {
    const nextState = reducer(undefined, {
      type: dailyLogs.WRITE_DAILY_LOG,
      payload: dailyLogsPayload[0]
    });

    expect(nextState.get('data').size).toBe(1);
  });

  it('should delete log', () => {
    const nextState = reducer(undefined, {
      type: dailyLogs.DELETE_DAILY_LOG,
      payload: dailyLogsPayload[0]._id
    });

    expect(nextState.get('data').size).toBe(0);
  });
});
