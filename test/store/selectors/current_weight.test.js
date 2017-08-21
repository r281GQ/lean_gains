import { Map } from 'immutable';

import getWeight from './../../../src/store/selectors/current_weight';

const state = Map().setIn(['userDetails', 'latestMeasurements', 'weight'], 70);

describe('current weight selector', () => {
  it('should give back the current weight', () => {
    const weight = getWeight(state);
    expect(weight).toBe(70);
  });

  it('should give back the current weight', () => {
    const weight = getWeight(
      Map().setIn(['userDetails', 'latestMeasurements'], Map())
    );
    expect(weight).toBe(undefined);
  });
});
