import { fromJS } from 'immutable';
import * as _ from 'lodash';

import * as userDetails from './../actions/user_details_actions';

export const INITIAL_STATE = fromJS({
  workoutTargets: {},
  kcalTargets: {},
  latestMeasurements: {}
});

const handleWriteUserDetails = (state, { dob, sex, picture, userName }) =>
  state.withMutations(state =>
    state
      .set('picture', picture)
      .set('userName', userName)
      .set('dob', dob)
      .set('sex', sex)
  );

const handleWriteKcalTargets = (state, payload) =>
  state.set('kcalTargets', fromJS(_.keyBy(payload, '_id')));

const handleWriteWorkoutTargets = (state, payload) =>
  state.set('workoutTargets', fromJS(_.keyBy(payload, '_id')));

const handleWriteWorkoutTarget = (state, payload) =>
  state.setIn(['workoutTargets', payload._id], fromJS(payload));

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case userDetails.WRITE_LATEST:
      return state.set('latestMeasurements', fromJS(payload));
    case userDetails.WRITE_KCAL_TARGETS:
      return handleWriteKcalTargets(state, payload);
    case userDetails.DELETE_WORKOUT_TARGET:
      return state.deleteIn(['workoutTargets', payload]);
    case userDetails.WRITE_WORKOUT_TARGET:
      return handleWriteWorkoutTarget(state, payload);
    case userDetails.WRITE_WORKOUT_TARGETS:
      return handleWriteWorkoutTargets(state, payload);
    case userDetails.UNSET_PICTURE:
      return state.set('picture', undefined);
    case userDetails.WRITE_USER_DETAILS:
      return handleWriteUserDetails(state, payload);
    default:
      return state;
  }
};

export default reducer;
