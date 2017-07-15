import { createSelector } from "reselect";
import moment from "moment";

const datesWithWorkoutLogs = state =>
  state.getIn(["userDetails", "workoutLogDates"]);

const isTodaysLogExists = datesWithWorkoutLogs =>
  datesWithWorkoutLogs.find(value => moment(value).isSame(moment(), "day"))
    ? true
    : false;

export default createSelector(datesWithWorkoutLogs, isTodaysLogExists);
