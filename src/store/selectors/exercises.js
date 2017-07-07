import Immutable, { List } from "immutable";
import moment from "moment";
import { createSelector } from "reselect";

const mainWorkouts = state =>
  state
    .getIn(["userDetails", "workoutTargets"])
    .filter(value => value.get("type") === "main");

const currentDate = () => moment();

const reduceFixedToExrecises = currentDate => (list, value) =>
  value.get("onDays").includes(currentDate.isoWeekday())
    ? list.concat(value.get("exercises"))
    : list;

const reduceIntervalToExrecises = currentDate => (list, value) => {
  const interval = value.get("onEveryxDay");

  const start = value.get("startDayofTraining");

  const differenceInDays = currentDate.diff(start, "day");

  return differenceInDays % interval === 0
    ? list.concat(value.get("exercises"))
    : list;
};

const filterFixedDays = value => value.get("onEveryxDay") === undefined;

const filterIntervalDays = value => value.get("onEveryxDay") !== undefined;


const getExercises = (mainWorkouts, currentDate) => {
  const exercisesFromFixedDays = mainWorkouts
    .filter(filterFixedDays)
    .reduce(reduceFixedToExrecises(currentDate), List());

  const exercisesFromIntervalDays = mainWorkouts
    .filter(filterIntervalDays)
    .reduce(reduceIntervalToExrecises(currentDate), List());

  return exercisesFromFixedDays.concat(exercisesFromIntervalDays);
};

/**
 * Returns the exercises from the state for the given day. Empty if the current day is a rest day.
 * @param  {Immutable.Collection} state [the application state]
 * @return {Immutable.List}
 */
export default createSelector(mainWorkouts, currentDate, getExercises);