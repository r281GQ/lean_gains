import Immutable, { fromJS, Map, List, Set } from 'immutable';
import * as _ from 'lodash';

import {
  DELETE_WORKOUT_LOG,
  WRITE_WORKOUT_LOG,
  WRITE_WORKOUT_LOGS,
  WRITE_WORKOUT_LOG_DATES,
  WRITE_WORKOUT_LOG_DATE
} from './../actions/workout_log_actions';

const INITIAL_STATE = Map().withMutations(map =>
  map.set('data', Map()).set('dates', List())
);

//TODO: every time needs to be consisntently converted to timesatamps
const workoutLog = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    
    case WRITE_WORKOUT_LOG_DATES:
      return state.set('dates', Set(fromJS(payload)));
    case WRITE_WORKOUT_LOG_DATE:
      return state.update('dates', set => set.add(payload));
    case DELETE_WORKOUT_LOG:
      return state.deleteIn(['data', payload]);
    case WRITE_WORKOUT_LOGS:
      return state.update('data', map =>
        map.concat(fromJS(_.keyBy(payload, '_id')))
      );
    case WRITE_WORKOUT_LOG:
      return state.setIn(['data', payload._id], fromJS(payload));
    default:
      return state;
  }
};

export default workoutLog;
