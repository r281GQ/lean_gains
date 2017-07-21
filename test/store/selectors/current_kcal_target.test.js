import { fromJS, Map } from 'immutable';
import chai, { expect } from 'chai';
import moment from 'moment';
import * as _ from 'lodash';
import chaiImmutable from 'chai-immutable';

import selector from './../../../src/store/selectors/current_kcal_target';
import { kcalTargets } from './../../../shared/test_constants';

chai.use(chaiImmutable);

const state = Map().setIn(
  ['userDetails', 'kcalTargets'],
  fromJS(_.keyBy(kcalTargets, '_id'))
);

describe('current calorie target selector', () => {
  it('should get back the most recent target', () => {
    const currentTarget = selector(state);
    expect(currentTarget).to.equal(fromJS(kcalTargets[0]));
  });
  it('should get back empty Immutable Map() if there is no kcalTargets in state', () => {
    const stateWithoutTarget = state.setIn(
      ['userDetails', 'kcalTargets'],
      Map()
    );

    const currentTarget = selector(stateWithoutTarget);
    expect(currentTarget).to.equal(Map());
  });
});
