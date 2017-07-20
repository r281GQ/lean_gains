import { createSelector } from 'reselect';
import moment from 'moment';

const datesWithDailyLogs = state => state.getIn(['dailyLogs', 'dates']);

const isTodaysLogExists = datesWithDailyLogs =>
  datesWithDailyLogs.find(value => moment(value).isSame(moment(), 'day'))
    ? true
    : false;

export default createSelector(datesWithDailyLogs, isTodaysLogExists);
