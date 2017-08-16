import { fromJS, Map, Set } from 'immutable';
import * as _ from 'lodash';

import * as dailyLogs from './../actions/daily_logs_actions';

const INITIAL_STATE = Map().withMutations(map =>
  map.set('data', Map()).set('dates', Set())
);

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case dailyLogs.DELETE_DAILY_LOG:
      return state.deleteIn(['data', payload]);
    case dailyLogs.DELETE_DAILY_LOG_DATE:
      return state.update('dates', set => set.remove(payload));
    case dailyLogs.WRITE_DAILY_LOGS:
      return state.update('data', value =>
        value.concat(fromJS(_.keyBy(payload, '_id')))
      );
    case dailyLogs.WRITE_DAILY_LOG:
      return state.setIn(['data', payload._id], fromJS(payload));
    case dailyLogs.WRITE_DAILY_LOG_DATES:
      return state.update('dates', set => set.concat(fromJS(payload)));
    case dailyLogs.WRITE_DAILY_LOG_DATE:
      return state.update('dates', set => set.add(fromJS(payload)));
    default:
      return state;
  }
};

export default reducer;
