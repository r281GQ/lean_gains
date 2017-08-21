import { fromJS, Map } from 'immutable';
import * as _ from 'lodash';

import {
  dailyLogDates,
  workoutLogDates,
  workoutLogs,
  dailyLogs
} from './../../../shared/test_constants';

import logs from './../../../src/store/selectors/log_selector';

const state = Map().withMutations(map =>
  map
    .setIn(['app', 'selectedMonthForWorkoutLogs'], '07-2017')
    .setIn(['app', 'selectedMonthForDailyLogs'], '07-2017')
    .setIn(['workoutLogs', 'dates'], fromJS(workoutLogDates).toSet())
    .setIn(['dailyLogs', 'dates'], fromJS(dailyLogDates).toSet())
    .setIn(['workoutLogs', 'data'], fromJS(_.keyBy(workoutLogs, '_id')))
    .setIn(['dailyLogs', 'data'], fromJS(_.keyBy(dailyLogs, '_id')))
);

const dailyLogsForMonth = logs('dailyLogs');
const workoutLogsForMonths = logs('workoutLogs');

describe('months selector', () => {
  it('should return 0 within the list', () => {
    const logsForMinth = dailyLogsForMonth(state);
    expect(logsForMinth.size).toBe(0);
  });

  it('should return 2 within the list', () => {
    const logsForMinth = workoutLogsForMonths(state);
    expect(logsForMinth.size).toBe(2);
  });
});
