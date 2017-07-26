import { fromJS, Map } from 'immutable';
import chai, { expect } from 'chai';
import moment from 'moment';
import * as _ from 'lodash';
import chaiImmutable from 'chai-immutable';

import selector from './../../../src/store/selectors/calorie_target';
import {
  latestMeasurements
} from './../../../shared/test_constants';

chai.use(chaiImmutable);

// const formValues = fromJS({
//   trainingDay: 20,
//   bmrCalculationMethod: 'harris-benedict',
//   protein: 2,
//   restDay: -20,
//   calorieSplit: 'recomp',
//   activity: 1.2,
//   restFatGrams: 0,
//   bodyFat: 15.3,
//   trainingFatPercentage: 0,
//   fatMethod: 'percentage',
//   // fatMethod: 'grams',
//   trainingFatGrams: 0,
//   restFatPercentage: 0
// });


const formValues = fromJS({
  trainingDay: 0,
  bmrCalculationMethod: 'harris-benedict',
  protein: 2,
  restDay: 0,
  calorieSplit: 'custom',
  activity: 1.2,
  restFatGrams: 0,
  bodyFat: 15.3,
  trainingFatPercentage: 0,
  fatMethod: 'percentage',
  // fatMethod: 'grams',
  trainingFatGrams: 0,
  restFatPercentage: 0
});


const state = Map().withMutations(map =>
  map
    .setIn(['userDetails', 'latestMeasurements'], fromJS(latestMeasurements))
    .setIn(['userDetails', 'dob'], moment('22-05-1988', 'DD-MM-YYYY').valueOf())
    .setIn(['userDetails', 'sex'], 'male')
    .setIn(['form', 'calorie-target', 'values'], formValues)
);

describe('calorie target props selector', () => {
  it('should get back the most recent target', () => {
    // console.log(state);
   console.log(selector(state))
  });
});
