import { createSelector } from 'reselect';
import { Map } from 'immutable';

export default createSelector(
  state => state,
  state =>
    state.getIn(['userDetails', 'kcalTargets']) &&
    !state.getIn(['userDetails', 'kcalTargets']).isEmpty()
      ? state
          .getIn(['userDetails', 'kcalTargets'])
          .find(value => value.get('isLatest'))
      : Map()
);
