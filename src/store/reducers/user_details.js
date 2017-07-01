import Immutable from "immutable";
import moment from "moment";

import {
  WRITE_USER_DETAILS,
  UNSET_PICTURE
} from "./../actions/user_details_actions";

export const INITIAL_STATE = Immutable.fromJS({
  dob: undefined,
  age: undefined,
  gender: undefined,
  picture: undefined,
  email: undefined,
  username: undefined,
  name: undefined,
  supplements: [],
  workoutTargets: {
    0: {}
  },
  kcalTargets: {
    0: {
      startDate: undefined,
      endDate: undefined,
      isLatest: undefined,
      usage: undefined,
      isCycling: false,
      flat: {
        kcal: undefined,
        protein: undefined,
        carbohydrate: undefined,
        fat: undefined,
        fiber: undefined
      },
      rest: {
        kcal: undefined,
        protein: undefined,
        carbohydrate: undefined,
        fat: undefined,
        fiber: undefined
      },
      training: {
        kcal: undefined,
        protein: undefined,
        carbohydrate: undefined,
        fat: undefined,
        fiber: undefined
      }
    }
  },
  measurements: {
    initial: {},
    current: {}
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

const userDetails = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case UNSET_PICTURE:
      return state.set("picture", undefined);
    case WRITE_USER_DETAILS:
      return handleWriteUserDetails(state, payload);
    default:
      return state;
  }
};

export default userDetails;
