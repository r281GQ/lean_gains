import Immutable, { fromJS, Set } from "immutable";
import moment from "moment";
import * as _ from "lodash";

import {
  WRITE_USER_DETAILS,
  UNSET_PICTURE,
  WRITE_WORKOUT_TARGETS,
  WRITE_WORKOUT_TARGET,
  DELETE_WORKOUT_TARGET,
  WRITE_KCAL_TARGETS,
  WRITE_LATEST,
  WRITE_WORKOUT_LOG_DATES
} from "./../actions/user_details_actions";

export const INITIAL_STATE = Immutable.fromJS({
  _id: undefined,
  dob: undefined,
  sex: undefined,
  picture: undefined,
  email: undefined,
  userName: undefined,
  weightDisplayPreference: undefined,
  lengthDisplayPreference: undefined,
  workoutLogDates: [],
  supplements: [],
  workoutTargets: {},
  kcalTargets: {},
  latestMeasurements: {
    weight: undefined,
    neck: undefined,
    chest: undefined,
    rightArm: undefined,
    leftArm: undefined,
    aboveBelly: undefined,
    belly: undefined,
    belowBelly: undefined,
    hips: undefined,
    rightThigh: undefined,
    leftThigh: undefined
  }
});

const handleWriteUserDetails = (
  state,
  { name, dob, sex, picture, userName, earliestWorkoutLog, earliestDailyLog }
) =>
  state.withMutations(state =>
    state
      .set("picture", picture)
      .set("userName", userName)
      .set("dob", moment(dob).valueOf())
      .set("sex", sex)
      .update(
        "earliestDailyLog",
        value => (earliestDailyLog ? earliestDailyLog : value)
      )
      .update(
        "earliestWorkoutLog",
        value => (earliestWorkoutLog ? earliestWorkoutLog : value)
      )
  );

const handleWriteKcalTargets = (state, payload) => {
  payload = _.keyBy(payload, "_id");
  return state.withMutations(map =>
    map.delete("kcalTargets").set("kcalTargets", fromJS(payload))
  );
};

const handleWriteWorkoutTargets = (state, payload) => {
  payload = _.keyBy(payload, "_id");
  return state.withMutations(map =>
    map.delete("workoutTargets").set("workoutTargets", fromJS(payload))
  );
};

const handleWriteWorkoutTarget = (state, payload) =>
  state.setIn(["workoutTargets", payload._id], fromJS(payload));

const userDetails = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case WRITE_WORKOUT_LOG_DATES:
      return state.set("workoutLogDates", Set(fromJS(payload)));
    case WRITE_LATEST:
      return state.set("latestMeasurements", fromJS(payload));
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
