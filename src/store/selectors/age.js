import moment from 'moment';
import { createSelector } from 'reselect';

const dob = state => state.getIn(['userDetails', 'dob']);

const calculateAge = dob =>
  dob ? moment().diff(moment(dob), 'years') : undefined;

export default createSelector(dob, calculateAge);
