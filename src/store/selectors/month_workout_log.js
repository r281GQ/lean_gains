import { createSelector } from 'reselect';
import moment from 'moment';

const workoutLogDates = state => state.getIn(['workoutLogs', 'dates']);

const monthsWithWorkoutLogs = workoutLogDates =>
  workoutLogDates.map(value => moment(value).format('MM-YYYY')).toSet();

export default createSelector(workoutLogDates, monthsWithWorkoutLogs);
