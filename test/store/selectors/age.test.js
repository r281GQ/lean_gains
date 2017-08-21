import { Map } from 'immutable';
import moment from 'moment';

import selector from './../../../src/store/selectors/age';
import { userDetails } from './../../../shared/test_constants';

const state = Map().setIn(['userDetails', 'dob'], userDetails.dob);

describe('age selector', () => {
  it('should get back age in years', () => {
    const age = selector(state);
    expect(age).toBe(moment().diff(moment(userDetails.dob), 'years'));
  });

  it('should get back undefined if there is no dob', () => {
    const withoutDOB = state.setIn(['userDetails', 'dob'], undefined);
    const age = selector(withoutDOB);
    expect(age).toBeUndefined();
  });
});
