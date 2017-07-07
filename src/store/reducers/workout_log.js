import Immutable, { fromJS, Map } from "immutable";
import * as _ from "lodash";

import {
  DELETE_WORKOUT_LOG,
  WRITE_WORKOUT_LOG,
  WRITE_WORKOUT_LOGS
} from "./../actions/workout_log_actions";

const workoutLog = (state = Map(), { type, payload }) => {
  switch (type) {
    case DELETE_WORKOUT_LOG:
      return state.delete(payload);
    case WRITE_WORKOUT_LOGS:
      return state.concat(fromJS(_.keyBy(payload, "_id")));
    case WRITE_WORKOUT_LOG:
      return state.set(payload._id, fromJS(payload));
    default:
      return state;
  }
};

export default workoutLog;
