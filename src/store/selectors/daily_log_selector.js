import { createSelector } from 'reselect';
import moment from 'moment';

const logs = state => state.getIn(['dailyLogs', 'data']);

const selectedMonth = state =>
  state.getIn(['app', 'selectedMonthForDailyLogs']);

const dailyLogsForMonth = (logs, selectedMonth) => {
  return logs.filter(value =>
    moment(value.get('date')).isSame(moment(selectedMonth, 'MM-YYYY'), 'month')
  );
};

export default createSelector(logs, selectedMonth, dailyLogsForMonth);
