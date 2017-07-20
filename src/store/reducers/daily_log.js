import { fromJS, Map, List, Set } from 'immutable';
import moment from 'moment';
import * as _ from 'lodash';

import {
  WRITE_DAILY_LOG,
  WRITE_DAILY_LOGS,
  WRITE_DAILY_LOG_DATES,
  DELETE_DAILY_LOG
} from './../actions/daily_log_actions';

const INITIAL_STATE = Map().withMutations(map =>
  map.set('data', Map()).set('dates', List())
);

const handleWriteDailylog = (state, payload) =>
  state.setIn(['data', payload._id], fromJS(payload));

const handleWriteDailylogs = (state, payload) => {
  _.forEach(payload, j => console.log(moment(j.date).format('DD-MM-YYYY')));
  const arrayToWrite = _.keyBy(payload, '_id');
  return state.update('data', value => value.concat(fromJS(arrayToWrite)));
};

const dailyLog = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case DELETE_DAILY_LOG:
      return state.deleteIn(['data', payload]);
    case WRITE_DAILY_LOGS:
      return handleWriteDailylogs(state, payload);
    case WRITE_DAILY_LOG:
      return handleWriteDailylog(state, payload);
    case WRITE_DAILY_LOG_DATES:
      return state.set('dates', fromJS(payload));
    default:
      return state;
  }
};

export default dailyLog;
export { INITIAL_STATE };
