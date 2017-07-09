import Immutable, { fromJS } from "immutable";
import moment from "moment";

import {
  WRITE_USER_DETAILS,
  UNSET_PICTURE,
  WRITE_WORKOUT_TARGET,
  DELETE_WORKOUT_TARGET
} from "./../actions/user_details_actions";

export const INITIAL_STATE = Immutable.fromJS({
  _id: undefined,
  dob: undefined,
  gender: undefined,
  picture: undefined,
  email: undefined,
  username: undefined,
  name: undefined,
  weightDisplayPreference: undefined,
  lengthDisplayPreference: undefined,
  supplements: [],
  workoutTargets: {
    // _id : {
    //   _id: objectID
    //   type: 'main' || 'rest',
    //   startDayofTraining: date,
    //   onEveryxDay: number,
    //   onDays: [number],
    //   exercises: [string]
    // }
    //
      0 : {
        _id: 0,
        type: 'main',
        startDayofTraining: undefined,
        onEveryxDay: undefined,
        onDays: [4],
        exercises: ['dead']
      }
  },
  kcalTargets: {
    0: {
      startDate: undefined,
      endDate: undefined,
      isLatest: true,
      isCycling: true,
      flat: {
        kcal: 3000,
        protein: undefined,
        carbohydrate: undefined,
        fat: undefined,
        fiber: undefined
      },
      rest: {
        kcal: 1000,
        protein: undefined,
        carbohydrate: undefined,
        fat: undefined,
        fiber: undefined
      },
      training: {
        kcal: 2100,
        protein: undefined,
        carbohydrate: undefined,
        fat: undefined,
        fiber: undefined
      }
    }
  }
  ,
  latestMeasurements: {


      weight: 123,
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



const handleWriteWorkoutTarget = (state, payload) =>
  state.setIn(["workoutTargets", payload._id], fromJS(payload));

const userDetails = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case DELETE_WORKOUT_TARGET:
      return state.deleteIn(["workoutTargets", payload]);
    case WRITE_WORKOUT_TARGET:
      return handleWriteWorkoutTarget(state, payload);
    case UNSET_PICTURE:
      return state.set("picture", undefined);
    case WRITE_USER_DETAILS:
      return handleWriteUserDetails(state, payload);
    default:
      return state;
  }
};

export default userDetails;
