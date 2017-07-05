import Immutable, { fromJS } from "immutable";

import { WRITE_WORKOUT_LOG } from "./../actions/workout_log";

const INITIAL_STATE = fromJS({
  0: {
    _id: "",
    date: undefined,
    exercises: [
      {
        name: "",
        _id: "",
        repetitions: [
          {
            _id: "",
            set: "",
            kg: ""
          }
        ]
      }
    ]
  }
});

const workoutLog = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case WRITE_WORKOUT_LOG:
      return state.set(payload._id, payload);
    default:
      return state;
  }
};

export default workoutLog;
