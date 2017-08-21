import { Map } from 'immutable';
import moment from 'moment';

import reducer from './../../../src/store/reducers/auth';
import * as auth from './../../../src/store/actions/auth_actions';
import { auth as authPayload } from './../../../shared/test_constants';

describe('auth reducer', () => {
  it('should set isLoading property to true when INIT_AUTH is dispatched', () => {
    const nextState = reducer(undefined, { type: auth.INIT_AUTH });
    expect(nextState.get('isLoading')).toBe(true);
  });

  it('should set isLoading property to false when CLOSE_AUTH is dispatched', () => {
    const nextState = reducer(Map().set('isLoading', true), {
      type: auth.CLOSE_AUTH
    });
    expect(nextState.get('isLoading')).toBe(false);
  });

  it('should set authenticated to true and token and user details on LOGIN_SUCCESS', () => {
    const nextState = reducer(undefined, {
      type: auth.LOGIN_SUCCESS,
      payload: authPayload
    });

    expect(nextState.get('authenticated')).toBe(true);
    expect(nextState.getIn(['user', 'lastLogin'])).toBe(
      moment('05-07-2017', 'DD-MM-YYYY').valueOf()
    );
    expect(nextState.getIn(['user', 'email'])).toBe('endre@mail.com');
    expect(nextState.getIn(['user', '_id'])).toBe('randomId');
  });
});
