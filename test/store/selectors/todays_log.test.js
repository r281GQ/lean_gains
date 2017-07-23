import { fromJS, Map, Set } from 'immutable';
import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import moment from 'moment';

import {
  dailyLogDates,
  workoutLogDates
} from './../../../shared/test_constants';

import todaysLog from './../../../src/store/selectors/todays_log';

const state = Map().withMutations(map =>
  map
    .setIn(['workoutLogs', 'dates'], fromJS(workoutLogDates).toSet())
    .setIn(['dailyLogs', 'dates'], fromJS(dailyLogDates).toSet())
);

const dailyLogSelector = todaysLog('dailyLogs');
const workoutLogSelector = todaysLog('workoutLogs');

chai.use(chaiImmutable);

describe('todays log selector', () => {
  it('should return false if todays date is not among state vars', () => {
    const daily = dailyLogSelector(state);
    const workout = workoutLogSelector(state);

    expect(daily).to.be.false;
    expect(workout).to.be.false;
  });

  it('should return false if dates are empty', () => {
    const modifiedState = state.withMutations(map =>
      map
        .setIn(['workoutLogs', 'dates'], Set())
        .setIn(['dailyLogs', 'dates'], Set())
    );

    const daily = dailyLogSelector(modifiedState);
    const workout = workoutLogSelector(modifiedState);

    expect(daily).to.be.false;
    expect(workout).to.be.false;
  });

  it(`should return true if today's date is among state vars`, () => {
    const modifiedState = state.withMutations(map =>
      map
        .updateIn(['workoutLogs', 'dates'], set => set.add(moment().valueOf()))
        .updateIn(['dailyLogs', 'dates'], set => set.add(moment().valueOf()))
    );

    const daily = dailyLogSelector(modifiedState);
    const workout = workoutLogSelector(modifiedState);

    expect(daily).to.be.true;
    expect(workout).to.be.true;
  });
});
