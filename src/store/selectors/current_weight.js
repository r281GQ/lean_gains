import { createSelector } from 'reselect';

export default createSelector(
  state => state,
  state =>
    state.getIn(['userDetails', 'latestMeasurements', 'weight'])
      ? state.getIn(['userDetails', 'latestMeasurements', 'weight'])
      : undefined
);
