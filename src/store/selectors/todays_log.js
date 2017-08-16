import { createSelector } from 'reselect';
import moment from 'moment';

const datesWithLogs = type => state => state.getIn([type, 'dates']);

const isTodaysLogExists = datesWithWorkoutLogs =>
  datesWithWorkoutLogs.find(value => moment(value).isSame(moment(), 'day'))
    ? true
    : false;

const checkType = type => type === 'workoutLogs' || type === 'dailyLogs';

const factory = type =>
  checkType(type)
    ? createSelector(datesWithLogs(type), isTodaysLogExists)
    : new Error('Type not supported!');

export default factory;
