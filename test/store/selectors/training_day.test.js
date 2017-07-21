import { fromJS, Map } from 'immutable';
import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import moment from 'moment';

import getExercises from './../../../src/store/selectors/exercises';

chai.use(chaiImmutable);

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
            onEveryxDay: undefined,
            onDays: [moment().isoWeekday()],
            exercises: ['dead']
          })
        )
        .setIn(
          ['userDetails', 'workoutTargets', '1'],
          fromJS({
            type: 'main',
            startDayofTraining: moment().subtract(3, 'days'),
            onEveryxDay: undefined,
            onDays: [moment().isoWeekday()],
            exercises: ['squat']
          })
        )
        .setIn(
          ['userDetails', 'workoutTargets', '2'],
          fromJS({
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

    expect(exercises).to.include('squat', 'dead');
  });

  it('0 is interval and its not training day', () => {
    let modifiedstate = mockState.setIn(
      ['userDetails', 'workoutTargets', '0', 'onEveryxDay'],
      9
    );

    const exercises = getExercises('main')(modifiedstate);
    expect(exercises).to.include('squat');
    expect(exercises).to.not.include('dead');
  });

  it('0 is interval and it is training day', () => {
    let modifiedstate = mockState.setIn(
      ['userDetails', 'workoutTargets', '0', 'onEveryxDay'],
      3
    );

    const exercises = getExercises('main')(modifiedstate);
    expect(exercises).to.include('squat');
    expect(exercises).to.include('dead');
  });

  it(`should give back only the rest day's box`, () => {
    const exercises = getExercises('rest')(mockState);
    expect(exercises).to.include('box');
    expect(exercises).to.not.include('squat');
    expect(exercises).to.not.include('dead');
  });

  it(`should give back all exercises`, () => {
    const exercises = getExercises('all')(mockState);
    expect(exercises).to.include('box');
    expect(exercises).to.include('squat');
    expect(exercises).to.include('dead');
  });
});
