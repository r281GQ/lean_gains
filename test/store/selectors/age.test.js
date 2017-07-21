import { Map } from 'immutable';
import chai, { expect } from 'chai';
import moment from 'moment';
import chaiImmutable from 'chai-immutable';

import selector from './../../../src/store/selectors/age';
import { userDetails } from './../../../shared/test_constants';

chai.use(chaiImmutable);

const state = Map().setIn(['userDetails', 'dob'], userDetails.dob);

describe('age selector', () => {
  it('should get back age in years', () => {
    const age = selector(state);
    expect(age).to.equal(moment().diff(moment(userDetails.dob), 'years'));
  });

  it('should get back 0 if there is no dob', () => {
    const withoutDOB = state.setIn(['userDetails', 'dob'], undefined);
    const age = selector(withoutDOB);
    expect(age).to.equal(0);
  });
});
