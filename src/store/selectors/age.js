import moment from "moment";
import { createSelector } from "reselect";

const state = state => state;

const calculateAge = state =>
  moment().diff(moment(state.getIn(["userDetails", "dob"])), "years");

export default createSelector(state, calculateAge);
