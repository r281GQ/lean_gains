import { createSelector } from 'reselect';
import moment from 'moment';

const logs = type => state => state.getIn([type, 'data']);

//fetches the appropriate current month from the store
const selectedMonth = type => state =>
  state.getIn([
    'app',
    type === 'workoutLogs'
      ? 'selectedMonthForWorkoutLogs'
      : 'selectedMonthForDailyLogs'
  ]);

//filters out the current month's logs
const logsForMonth = (logs, selectedMonth) => {
  return logs.filter(value =>
    moment(value.get('date')).isSame(moment(selectedMonth, 'MM-YYYY'), 'month')
  );
};

const checkType = type => type === 'workoutLogs' || type === 'dailyLogs';

const factory = type =>
  checkType(type)
    ? createSelector(logs(type), selectedMonth(type), logsForMonth)
    : new Error('Type not supported!');

export default factory;
