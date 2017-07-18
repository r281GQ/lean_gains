import { createSelector } from "reselect";
import moment from "moment";

const dailyLogDates = state =>
  state.getIn(["dailyLog", "dates"]);

const monthsWithDailyLogs = dailyLogDates =>
  dailyLogDates.map(value => moment(value).format("MM-YYYY")).toSet();

export default createSelector(dailyLogDates, monthsWithDailyLogs);
