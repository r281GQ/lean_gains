import { Map, fromJS } from 'immutable';
import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import moment from 'moment';
import * as _ from 'lodash';
import currentMacros from './../../../src/store/selectors/current_macros';
import { kcalTargets } from './../../../shared/test_constants';

chai.use(chaiImmutable);

const mockState = Map().withMutations(map =>
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
    .setIn(['userDetails', 'kcalTargets'], fromJS(_.keyBy(kcalTargets, '_id')))
);

describe('current macros selector', () => {
  it('should give back the latest targets training values', () => {
    const nextState = currentMacros(mockState);
    expect(nextState).to.equal(fromJS(kcalTargets[0]).get('training'));
  });

  it('should give back empty Map() if values are misssing', () => {
    const nextState = currentMacros(
      mockState.setIn(['userDetails', 'kcalTargets'], undefined)
    );
    expect(nextState).to.equal(Map());
  });
});
