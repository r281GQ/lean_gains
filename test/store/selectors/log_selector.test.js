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
    expect(dailyLogsForMonth(state).size).toBe(0);
  });

  it('should return 2 within the list', () => {
    expect(workoutLogsForMonths(state).size).toBe(2);
  });
});
