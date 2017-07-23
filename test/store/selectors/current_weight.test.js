import { Map, fromJS } from 'immutable';
import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import getWeight from './../../../src/store/selectors/current_weight';

chai.use(chaiImmutable);

const state = Map().setIn(['userDetails', 'latestMeasurements', 'weight'], 70);

describe('current weight selector', () => {
  it('should give back the current weight', () => {
    const weight = getWeight(state);
    expect(weight).to.equal(70);
  });

  it('should give back the current weight', () => {
    const weight = getWeight(
      Map().setIn(['userDetails', 'latestMeasurements'], Map())
    );
    expect(weight).to.equal(undefined);
  });
});
