import Immutable, {fromJS} from "immutable";
import moment from "moment";

import {
  WRITE_USER_DETAILS,
  UNSET_PICTURE,
  WRITE_WORKOUT_TARGET,
} from "./../actions/user_details_actions";


export const INITIAL_STATE = Immutable.fromJS({
  _id: undefined,
  dob: undefined,
  age: undefined,
  gender: undefined,
  picture: undefined,
  email: undefined,
  username: undefined,
  name: undefined,
  weightDisplayPreference: undefined,
  lengthDisplayPreference: undefined,
  supplements: [],
  workoutTargets: {
    // 0: {
    //   isLatest: true,
      0 : {
        type: 'main',
        startDayofTraining: moment('30-06-2017', 'DD-MM-YYYY'),
        onEveryxDay: undefined,
        onDays: [1,5],
        exercises: ['dead']
      }
      ,  2 : {
          type: 'main',
          startDayofTraining: undefined,
          onEveryxDay: undefined,
          onDays: [2,1],
          exercises: ['squat']
        }
      // restDay : {
      //   exercises: []
      // }
    // }
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
  },
  measurements: {
    0: {
      date: undefined,
      isLatest: true,
      weight: 123,
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

const handleWriteWorkoutTarget = (state, payload) =>{
  return state.withMutations(state => state
  .setIn(['workoutTargets',payload._id], fromJS(payload))

  )
}

const userDetails = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
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
