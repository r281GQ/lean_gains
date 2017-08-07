import * as calorieLog from './../actions/calorie_actions';
import { Map, fromJS } from 'immutable';

const reducer = (state = Map(), { type, payload }) => {
  switch (type) {
    case calorieLog.WRITE_CALORIE_LOG:
      return fromJS(payload);
    default:
      return state;
  }
};

export default reducer;
