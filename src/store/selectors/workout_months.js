import {createSelector} from 'reselect';
import moment from 'moment';

const state = state => state

const months = state => {
  const startDate = moment(state.getIn(['userDetails', 'earliestWorkoutLog']));

  let iterate = startDate;

  let dates = [];


  while(moment(iterate).isSameOrBefore(moment(), 'month')){
    dates.push(iterate.valueOf());
      iterate = moment(iterate).add(1, 'month');
  }
  return dates;
}

export default createSelector(state, months);
