import { fromJS, Map } from 'immutable';
import moment from 'moment';

import getExercises from './../../../src/store/selectors/exercises';

describe('exercise selector', () => {
  let mockState = Map();
  beforeEach(() => {
    mockState = mockState.withMutations(map =>
      map
        .setIn(
          ['userDetails', 'workoutTargets', '0'],
          fromJS({
            type: 'main',
            startDayofTraining: moment().subtract(3, 'days'),
            isCycledTraining: 'fix',
            onEveryxDay: undefined,
            onDays: [moment().isoWeekday()],
            exercises: ['dead']
          })
        )
        .setIn(
          ['userDetails', 'workoutTargets', '1'],
          fromJS({
            type: 'main',
            isCycledTraining: 'fix',
            startDayofTraining: moment().subtract(3, 'days'),
            onEveryxDay: undefined,
            onDays: [moment().isoWeekday()],
            exercises: ['squat']
          })
        )
        .setIn(
          ['userDetails', 'workoutTargets', '2'],
          fromJS({
            isCycledTraining: 'fix',
            type: 'rest',
            startDayofTraining: moment().subtract(3, 'days'),
            onEveryxDay: undefined,
            onDays: [moment().isoWeekday()],
            exercises: ['box']
          })
        )
    );
  });

  it('both are fixed days', () => {
    const exercises = getExercises('main')(mockState);

    expect(exercises.toJS()).toEqual(expect.arrayContaining(['squat', 'dead']));
  });

  it('0 is interval and its not training day', () => {
    let modifiedstate = mockState
      .setIn(['userDetails', 'workoutTargets', '0', 'onEveryxDay'], 9)
      .setIn(
        ['userDetails', 'workoutTargets', '0', 'isCycledTraining'],
        'cycle'
      );

    const exercises = getExercises('main')(modifiedstate);
    expect(exercises).toContain('squat');
    expect(exercises).not.toContain('dead');
  });

  it('0 is interval and it is training day', () => {
    let modifiedstate = mockState
      .setIn(['userDetails', 'workoutTargets', '0', 'onEveryxDay'], 3)
      .setIn(
        ['userDetails', 'workoutTargets', '0', 'isCycledTraining'],
        'cycle'
      );

    const exercises = getExercises('main')(modifiedstate);
    expect(exercises).toContain('squat');
    expect(exercises).toContain('dead');
  });

  it(`should give back only the rest day's box`, () => {
    const exercises = getExercises('rest')(mockState);
    expect(exercises).toContain('box');
    expect(exercises).not.toContain('squat');
    expect(exercises).not.toContain('dead');
  });

  it(`should give back all exercises`, () => {
    const exercises = getExercises('all')(mockState);
    expect(exercises).toContain('box');
    expect(exercises).toContain('squat');
    expect(exercises).toContain('dead');
  });
});
