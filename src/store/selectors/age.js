import moment from 'moment';
import { createSelector } from 'reselect';

const dob = state => state.getIn(['userDetails', 'dob']);

const calculateAge = dob => moment().diff(moment(dob), 'years');

export default createSelector(dob, calculateAge);
