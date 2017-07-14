import { createSelector } from "reselect";
import moment from "moment";
import Immutable, { Map } from "immutable";

const state = state => state;

const todaysLog = state =>
// Map()
 {
  console.log(state
      .get("workoutLogs")
      .find(value => {
        // console.log(value.toJS());
        console.log(value.get('date'));
        console.log(moment());
        console.log(moment(value.get('date')).isSame(moment(), "day"));
        return moment(value.get('date')).isSame(moment(), "day");
      }));
  return state.get("workoutLogs").isEmpty()
    ? Map()
    : state
        .get("workoutLogs")
        .find(value => moment(value.get('date')).isSame(moment(), "day"))
      ? state
          .get("workoutLogs")
          .find(value => moment(value.get('date')).isSame(moment(), "day"))
      : Map();
};

export default createSelector(state, todaysLog);
