import { fromJS, Map, Set } from 'immutable';
import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import moment from 'moment';

import {
  dailyLogDates,
  workoutLogDates
} from './../../../shared/test_constants';

import months from './../../../src/store/selectors/month_log';

const state = Map().withMutations(map =>
  map
    .setIn(['workoutLogs', 'dates'], fromJS(workoutLogDates).toSet())
    .setIn(['dailyLogs', 'dates'], fromJS(dailyLogDates).toSet())
);

const dailyLogMonths = months('dailyLogs');
const workoutLogMonths = months('workoutLogs');

chai.use(chaiImmutable);

describe('months selector', () => {
  it('should get back 0417 and 0517 on dailyLogs', () => {
    expect(dailyLogMonths(state)).to.equal(Set().add('04-2017').add('05-2017'));
  });
  it('should get back 0417 and 0517 on dailyLogs', () => {
    expect(workoutLogMonths(state)).to.equal(
      Set().add('07-2017').add('01-2017')
    );
  });
});
