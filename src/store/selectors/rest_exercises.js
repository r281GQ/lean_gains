import { List } from 'immutable';
import moment from 'moment';
import { createSelector } from 'reselect';

const restWorkouts = state =>
  state
    .getIn(['userDetails', 'workoutTargets'])
    .filter(value => value.get('type') === 'rest');

const currentDate = () => moment();

const reduceFixedToExercises = currentDate => (list, value) =>
  value.get('onDays').includes(currentDate.isoWeekday())
    ? list.concat(value.get('exercises'))
    : list;

const reduceIntervalToExercises = currentDate => (list, value) => {
  const interval = value.get('onEveryxDay');

  const start = value.get('startDayofTraining');

  const differenceInDays = currentDate.diff(start, 'day');

  return differenceInDays % interval === 0
    ? list.concat(value.get('exercises'))
    : list;
};

const filterFixedDays = value => value.get('onEveryxDay') === undefined;

const filterIntervalDays = value => value.get('onEveryxDay') !== undefined;

const getExercises = (restWorkouts, currentDate) => {
  const exercisesFromFixedDays = restWorkouts
    .filter(filterFixedDays)
    .reduce(reduceFixedToExercises(currentDate), List());

  const exercisesFromIntervalDays = restWorkouts
    .filter(filterIntervalDays)
    .reduce(reduceIntervalToExercises(currentDate), List());

  return exercisesFromFixedDays.concat(exercisesFromIntervalDays);
};

export default createSelector(restWorkouts, currentDate, getExercises);
