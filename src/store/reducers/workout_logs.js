import { fromJS, Map, Set } from 'immutable';
import * as _ from 'lodash';

import * as workoutLogs from './../actions/workout_logs_actions';

const INITIAL_STATE = Map().withMutations(map =>
  map.set('data', Map()).set('dates', Set())
);

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case workoutLogs.WRITE_WORKOUT_LOG_DATES:
      return state.update('dates', set => set.concat(fromJS(payload)));
    case workoutLogs.WRITE_WORKOUT_LOG_DATE:
      return state.update('dates', set => set.add(payload));
    case workoutLogs.DELETE_WORKOUT_LOG_DATE:
      return state.update('dates', set => set.remove(payload));
    case workoutLogs.DELETE_WORKOUT_LOG:
      return state.deleteIn(['data', payload]);
    case workoutLogs.WRITE_WORKOUT_LOGS:
      return state.update('data', map =>
        map.concat(fromJS(_.keyBy(payload, '_id')))
      );
    case workoutLogs.WRITE_WORKOUT_LOG:
      return state.setIn(['data', payload._id], fromJS(payload));
    default:
      return state;
  }
};

export default reducer;
