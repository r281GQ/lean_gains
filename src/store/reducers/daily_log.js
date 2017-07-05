import Immutable, { fromJS } from "immutable";
import moment from "moment";

import { WRITE_DAILY_LOG } from "./../actions/daily_log_actions";

//TODO: report creation later on
//TODO: creae undo option with higher order reducers
const INITIAL_STATE = fromJS({
  0: {
    _id: 0,
    date: moment(),
    isLatest: true,
    macros: {
      protein: undefined,
      carbohydrate: undefined,
      fat: undefined,
      fibre: undefined
    },
    measurements: {
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
    },
    sleepIssues: undefined,
    stressIssues: undefined,
    hungerIssues: undefined,
    fatigueLethargy: undefined
  },
  1: {
    _id: 1,
    date: moment("03-05-2017", "DD-MM-YYYY"),
    isLatest: false,
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
});

const handleWriteDailylog = (state, payload) =>
  state.set(payload._id, fromJS(payload));

const dailyLog = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case WRITE_DAILY_LOG:
      return handleWriteDailylog(state, payload);
    default:
      return state;
  }
};

export default dailyLog;
export { INITIAL_STATE };
