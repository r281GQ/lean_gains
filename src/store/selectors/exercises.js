import { List } from 'immutable';
import moment from 'moment';
import { createSelector } from 'reselect';

const mainWorkouts = state =>
  state
    .getIn(['userDetails', 'workoutTargets'])
    .filter(value => value.get('type') === 'main');

const restWorkouts = state =>
  state
    .getIn(['userDetails', 'workoutTargets'])
    .filter(value => value.get('type') === 'rest');

const workouts = state => state.getIn(['userDetails', 'workoutTargets']);

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

const filterFixedDays = value => value.get('isCycledTraining') === 'fix';

const filterIntervalDays = value => value.get('isCycledTraining') === 'cycle';

const getExercises = (mainWorkouts, currentDate) => {
  const exercisesFromFixedDays = mainWorkouts
    .filter(filterFixedDays)
    .reduce(reduceFixedToExercises(currentDate), List());

  const exercisesFromIntervalDays = mainWorkouts
    .filter(filterIntervalDays)
    .reduce(reduceIntervalToExercises(currentDate), List());

  return exercisesFromFixedDays.concat(exercisesFromIntervalDays);
};

const factory = type => {
  switch (type) {
    case 'main':
      return createSelector(mainWorkouts, currentDate, getExercises);
    case 'rest':
      return createSelector(restWorkouts, currentDate, getExercises);
    case 'all':
      return createSelector(workouts, currentDate, getExercises);
    default:
      return new Error('Type not supported!');
  }
};

export default factory;
