import { createSelector } from 'reselect';
import moment from 'moment';

const logDates = type => state => state.getIn([type, 'dates']);

const monthsWithWorkoutLogs = workoutLogDates =>
  workoutLogDates
    .map(value => moment(value).format('MM-YYYY'))
    .toSet()
    .sortBy(value => moment(value, 'MM-YYYY').valueOf());

const checkType = type => type === 'workoutLogs' || type === 'dailyLogs';

const factory = type =>
  checkType(type)
    ? createSelector(logDates(type), monthsWithWorkoutLogs)
    : new Error('Type not supported!');

export default factory;
