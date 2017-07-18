import {createSelector} from 'reselect';
import moment from 'moment';

const logs = state => state.getIn(['workoutLogs']);

const selectedMonth = state => state.getIn(['app', 'selectedMonthForWorkoutLogs']);

const workoutLogsForMonth = (logs, selectedMonth) => {
  return logs.filter(value => moment(value.get('date')).isSame(moment(selectedMonth, 'MM-YYYY'), 'month'))
}

export default createSelector(logs, selectedMonth, workoutLogsForMonth);
