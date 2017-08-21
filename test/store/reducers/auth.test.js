import { Map } from 'immutable';
import moment from 'moment';

import reducer from './../../../src/store/reducers/auth';
import * as auth from './../../../src/store/actions/auth_actions';
import { auth as authPayload } from './../../../shared/test_constants';


describe('auth reducer', () => {
  it('should set isLoading property to true when INIT_AUTH is dispatched', () => {
    const nextState = reducer(undefined, { type: auth.INIT_AUTH });
    expect(nextState.get('isLoading')).to.equal(true);
  });

  it('should set isLoading property to false when CLOSE_AUTH is dispatched', () => {
    const nextState = reducer(Map().set('isLoading', true), {
      type: auth.CLOSE_AUTH
    });
    expect(nextState.get('isLoading')).to.equal(false);
  });

  it('should set authenticated to true and token and user details on LOGIN_SUCCESS', () => {
    const nextState = reducer(undefined, {
      type: auth.LOGIN_SUCCESS,
      payload: authPayload
    });

    expect(nextState.get('authenticated')).to.equal(true);
    expect(nextState.getIn(['user', 'lastLogin'])).to.equal(
      moment('05-07-2017', 'DD-MM-YYYY').valueOf()
    );
    expect(nextState.getIn(['user', 'email'])).to.equal('endre@mail.com');
    expect(nextState.getIn(['user', '_id'])).to.equal('randomId');
    expect(nextState.get('token')).to.not.be.undefined;
  });

  describe('with LOGGED_IN_STATE', () => {
    let LOGGED_IN_STATE;
    beforeEach(() => {
      LOGGED_IN_STATE = reducer(undefined, {
        type: auth.LOGIN_SUCCESS,
        payload: authPayload
      });
    });

    it('should return INITIAL_STATE on LOG_OUT', () => {
      const nextState = reducer(LOGGED_IN_STATE, { type: auth.LOG_OUT });
      expect(nextState).to.equal(
        Map().withMutations(map =>
          map
            .set('authenticated', false)
            .set('isLoading', false)
            .set('token', null)
        )
      );
    });
  });
});
