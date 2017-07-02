import Immutable, { toJS } from "immutable";
import moment from "moment";
import { createSelector } from "reselect";

const isOnEveryDay = onEveryDayFlag => onEveryDayFlag !== undefined


const currentWorkoutPlan = state =>
  state
    .getIn(["userDetails", "workoutTargets"])
    .find(value => value.get("isLatest"));

const currentDay = () => moment().isoWeekday();

const isOnEveryxDay = state => state
  .getIn(["userDetails", "workoutTargets"])
  .find(value => value.get("isLatest")).getIn(['mainTraining', 'onEveryxDay'])!==(undefined) ;

// const isTrainingDay = (currentWorkoutPlan,  currentDay, isOnEveryxDay) => {
//   console.log(isOnEveryxDay);
//   return currentWorkoutPlan.getIn(["mainTraining", "onDays"]).includes(currentDay);
// }
//

const calculateCurrentDayOnEveryDaySchedule = currentWorkoutPlan => {
  const interval = currentWorkoutPlan.getIn(['mainTraining', 'onEveryxDay']);
  const start = currentWorkoutPlan.getIn(['mainTraining', 'startDayofTraining']);
  const currentDate = moment();
  const difference = currentDate.diff(start, 'day');
  console.log(difference);
  console.log('INIT');
  console.log(difference % interval === 0 );
  return difference % interval === 0 ? true : false;
}

const isTrainingDay = (currentWorkoutPlan,  currentDay) =>
  isOnEveryDay(currentWorkoutPlan.getIn(['mainTraining', 'onEveryxDay'])) ?   calculateCurrentDayOnEveryDaySchedule(currentWorkoutPlan) :
   currentWorkoutPlan.getIn(["mainTraining", "onDays"]).includes(currentDay);



export default createSelector(currentWorkoutPlan, currentDay, isTrainingDay);
