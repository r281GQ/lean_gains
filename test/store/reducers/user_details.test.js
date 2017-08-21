import { fromJS } from 'immutable';
import chai, { expect } from 'chai';
import moment from 'moment';

import {
  workoutTargets,
  userDetails as userDetailsPayload,
  kcalTargets
} from './../../../shared/test_constants';
import reducer from './../../../src/store/reducers/user_details';
import * as userDetails from './../../../src/store/actions/user_details_actions';


describe('user details reducer', () => {
  it('should write workout targets', () => {
    const nextState = reducer(undefined, {
      type: userDetails.WRITE_WORKOUT_TARGETS,
      payload: workoutTargets
    });
    expect(nextState.get('workoutTargets').size).to.equal(2);
    expect(nextState.get('workoutTargets')).to.include.keys(
      '0_workout_target',
      '1_workout_target'
    );
  });

  it('should write one workout target', () => {
    const nextState = reducer(undefined, {
      type: userDetails.WRITE_WORKOUT_TARGET,
      payload: workoutTargets[0]
    });
    expect(nextState.get('workoutTargets').size).to.equal(1);
    expect(nextState.get('workoutTargets')).to.include.keys(
      '0_workout_target'
    );
  });

  it('should write kcal targets', () => {
    const nextState = reducer(undefined, {
      type: userDetails.WRITE_KCAL_TARGETS,
      payload: kcalTargets
    });
    expect(nextState.get('kcalTargets').size).to.equal(2);
    expect(nextState.get('kcalTargets')).to.include.keys(
      '0_kcal_target',
      '1_kcal_target'
    );
  });

  it('should write the basic info the the userDetals', () => {
    const nextState = reducer(undefined, {
      type: userDetails.WRITE_USER_DETAILS,
      payload: userDetailsPayload
    });
    expect(nextState.get('sex')).to.equal('male');
    expect(nextState.get('picture')).to.equal(
      `https://somerandomurl/pictureid`
    );
    expect(nextState.get('dob')).to.equal(
      moment('22-05-1988', 'DD-MM-YYYY').valueOf()
    );
    expect(nextState.get('userName')).to.equal('kfbr392');
  });

  describe('with some basic state', () => {
    let basicState;
    beforeEach(() => {
      const nextState = reducer(undefined, {
        type: userDetails.WRITE_USER_DETAILS,
        payload: userDetailsPayload
      });
      basicState = nextState;
    });

    it('should remove set the picture to undefined on UNSET_PICTURE', () => {
      const nextState = reducer(basicState, {
        type: userDetails.UNSET_PICTURE
      });
      expect(nextState.get('picture')).to.be.undefined;
    });

    it('should remove workoutTarget', () => {
      const stateWithWorkout = reducer(undefined, {
        type: userDetails.WRITE_WORKOUT_TARGETS,
        payload: workoutTargets
      });
      let payload = stateWithWorkout
        .get('workoutTargets')
        .findKey(value => true);

      const nextState = reducer(stateWithWorkout, {
        type: userDetails.DELETE_WORKOUT_TARGET,
        payload
      });

      expect(nextState.getIn(['workoutTargets', payload])).to.be.undefined;
    });
  });
});
