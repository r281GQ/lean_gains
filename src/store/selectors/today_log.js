import { createSelector } from 'reselect';
import moment from 'moment';

const datesWithWorkoutLogs = state => state.getIn(['workoutLogs', 'dates']);

const isTodaysLogExists = datesWithWorkoutLogs =>
  datesWithWorkoutLogs.find(value => moment(value).isSame(moment(), 'day'))
    ? true
    : false;

export default createSelector(datesWithWorkoutLogs, isTodaysLogExists);

// import { createSelector } from 'reselect';
// import moment from 'moment';
//
// const datesWithWorkoutLogs = type => state => state.getIn([type, 'dates']);
//
// const isTodaysLogExists = datesWithWorkoutLogs =>
//   datesWithWorkoutLogs.find(value => moment(value).isSame(moment(), 'day'))
//     ? true
//     : false
//
// export default type => createSelector(datesWithWorkoutLogs(type), isTodaysLogExists);
