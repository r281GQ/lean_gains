import { fromJS, Map } from 'immutable';
import * as _ from 'lodash';

import selector from './../../../src/store/selectors/current_kcal_target';
import { kcalTargets } from './../../../shared/test_constants';

const state = Map().setIn(
  ['userDetails', 'kcalTargets'],
  fromJS(_.keyBy(kcalTargets, '_id'))
);

describe('current calorie target selector', () => {
  it('should get back the most recent target', () => {
    const currentTarget = selector(state);
    expect(currentTarget).toEqual(fromJS(kcalTargets[0]));
  });
  it('should get back empty Immutable Map() if there is no kcalTargets in state', () => {
    const stateWithoutTarget = state.setIn(
      ['userDetails', 'kcalTargets'],
      Map()
    );

    const currentTarget = selector(stateWithoutTarget);
    expect(currentTarget).toEqual(Map());
  });
});
