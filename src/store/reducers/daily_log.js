import { fromJS } from 'immutable';
import moment from 'moment';
import * as _ from 'lodash';

import {
  WRITE_DAILY_LOG,
  WRITE_DAILY_LOGS,
  WRITE_DAILY_LOG_DATES
} from './../actions/daily_log_actions';

const INITIAL_STATE = fromJS({
  data: {
    0: {
      _id: 0,
      date: moment(),
      macros: {
        protein: undefined,
        carbohydrate: undefined,
        fat: undefined,
        fibre: undefined
      },
      measurements: {
        weight: 123,
        neck: undefined,
        chest: undefined,
        rightArm: undefined,
        leftArm: undefined,
        aboveBelly: undefined,
        belly: undefined,
        belowBelly: undefined,
        hips: 45,
        rightThigh: undefined,
        leftThigh: undefined
      },
      sleepIssues: undefined,
      stressIssues: undefined,
      hungerIssues: undefined,
      fatigueLethargy: undefined
    },
    1: {
      _id: 1,
      date: moment(`03-05-2017`, `DD-MM-YYYY`),
      macros: {
        protein: undefined,
        carbohydrate: undefined,
        fat: undefined,
        fibre: undefined
      },
      measurements: {
        weight: 145,
        chest: 23,
        rightArm: undefined,
        leftArm: undefined,
        aboveBelly: undefined,
        belly: undefined,
        belowBelly: undefined,
        hips: undefined,
        rightThigh: undefined,
        leftThigh: undefined
      },
      sleepIssues: undefined,
      stressIssues: undefined,
      hungerIssues: undefined,
      fatigueLethargy: undefined
    }
  },
  dates: []
});

const handleWriteDailylog = (state, payload) =>
  state.setIn(['data',payload._id], fromJS(payload));

const handleWriteDailylogs = (state, payload) => {
  _.forEach(payload, j => console.log(moment(j.date).format('DD-MM-YYYY')));
  const arrayToWrite = _.keyBy(payload, '_id');
  return state.update('data', value => value.concat(fromJS(arrayToWrite)));
};

const dailyLog = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
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
