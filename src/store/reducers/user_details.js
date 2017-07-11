import Immutable, { fromJS } from "immutable";
import moment from "moment";
import * as _ from "lodash";

import {
  WRITE_USER_DETAILS,
  UNSET_PICTURE,
  WRITE_WORKOUT_TARGETS,
  WRITE_WORKOUT_TARGET,
  DELETE_WORKOUT_TARGET,
  WRITE_KCAL_TARGETS,
  WRITE_LATEST
} from "./../actions/user_details_actions";

export const INITIAL_STATE = Immutable.fromJS({
  _id: undefined,
  dob: undefined,
  gender: undefined,
  picture: undefined,
  email: undefined,
  username: undefined,
  weightDisplayPreference: undefined,
  lengthDisplayPreference: undefined,
  supplements: [],
  workoutTargets: {},
  kcalTargets: {},
  latestMeasurements: {
    weight: 123,
    neck: undefined,
    chest: undefined,
    rightArm: undefined,
    leftArm: undefined,
    aboveBelly: undefined,
    belly: undefined,
    belowBelly: undefined,
    hips: 45,
    rightThigh: undefined,
    leftThigh: undefined
  }
});

const handleWriteUserDetails = (
  state,
  { name, dob, gender, picture, username }
) => {
  return state.withMutations(state =>
    state
      .set("picture", picture)
      .set("username", username)
      .set("name", name)
      .set("dob", moment(dob, "DD-MM-YYYY").valueOf())
      .set("gender", gender)
  );
};

const handleWriteKcalTargets = (state, payload) => {
  payload = _.keyBy(payload, "_id");
  console.log("from reducer", payload);
  return state.withMutations(map =>
    map.delete("kcalTargets").set("kcalTargets", fromJS(payload))
  );
};

const handleWriteWorkoutTargets = (state, payload) => {
  payload = _.keyBy(payload, "_id");
  console.log("from reducer", payload);
  return state.withMutations(map =>
    map.delete("workoutTargets").set("workoutTargets", fromJS(payload))
  );
};

const handleWriteWorkoutTarget = (state, payload) =>
  state.setIn(["workoutTargets", payload._id], fromJS(payload));

const userDetails = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case WRITE_LATEST:
      return state.set('latestMeasurements', fromJS(payload));
    case WRITE_KCAL_TARGETS:
      return handleWriteKcalTargets(state, payload);
    case DELETE_WORKOUT_TARGET:
      return state.deleteIn(["workoutTargets", payload]);
    case WRITE_WORKOUT_TARGET:
      return handleWriteWorkoutTarget(state, payload);
    case WRITE_WORKOUT_TARGETS:
      return handleWriteWorkoutTargets(state, payload);
    case UNSET_PICTURE:
      return state.set("picture", undefined);
    case WRITE_USER_DETAILS:
      return handleWriteUserDetails(state, payload);
    default:
      return state;
  }
};

export default userDetails;
