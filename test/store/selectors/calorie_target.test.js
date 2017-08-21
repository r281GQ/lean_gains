import { fromJS, Map } from 'immutable';
import moment from 'moment';
import * as _ from 'lodash';

import selector from './../../../src/store/selectors/calorie_target';
import { latestMeasurements } from './../../../shared/test_constants';


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
  describe('bodyFat', () => {
    it('defaultValue => 15.3', () => {
      expect(selector(state).get('bodyFat')).toMatchSnapshot();
    });

    it('female, modified weight && sex => 12.6', () => {
      const modifiedState = state.withMutations(map =>
        map
          .setIn(['userDetails', 'latestMeasurements', 'weight'], 54)
          .setIn(['userDetails', 'sex'], 'female')
      );

      expect(selector(modifiedState).get('bodyFat')).toMatchSnapshot();
    });

    it('female, modified weight && sex && waist => 21.8 ', () => {
      const modifiedState = state.withMutations(map =>
        map
          .setIn(['userDetails', 'latestMeasurements', 'weight'], 61)
          .setIn(['userDetails', 'sex'], 'female')
          .setIn(['userDetails', 'latestMeasurements', 'waist'], 76)
      );

      expect(selector(modifiedState).get('bodyFat')).toMatchSnapshot();
    });
  });

  //minCalorie
  describe('minCalorie', () => {
    it('basic minimum calorie % => 73', () => {
      expect(selector(state).get('minCalorie')).toMatchSnapshot();
    });

    it('reducing height should reduce |minCalorie| => -71', () => {
      const modifiedState = state.withMutations(map =>
        map.setIn(['userDetails', 'latestMeasurements', 'height'], 160)
      );

      expect(selector(modifiedState)).toMatchSnapshot();
    });
  });

});
