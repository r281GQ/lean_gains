import { fromJS, Map } from 'immutable';
import moment from 'moment';

import selector from './../../../src/store/selectors/calorie_target';
import { latestMeasurements } from './../../../shared/test_constants';

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
    describe('male', () => {
      it('defaultValue => 15.3', () => {
        expect(selector(state).get('bodyFat')).toBe(15.3);
      });

      it('the higher the person the leaner he should be => 11.3', () => {
        const currentState = state.setIn(
          ['userDetails', 'latestMeasurements', 'height'],
          200
        );
        expect(selector(currentState).get('bodyFat')).toBe(11.3);
      });

      it('the bigger neck the person has the leaner he should be => 11.8', () => {
        const currentState = state.setIn(
          ['userDetails', 'latestMeasurements', 'neck'],
          40
        );
        expect(selector(currentState).get('bodyFat')).toBe(11.8);
      });

      it(' the wider the belly the less leaner he should be => 28.5', () => {
        const currentState = state.withMutations(map =>
          map.setIn(['userDetails', 'latestMeasurements', 'belly'], 100)
        );

        expect(selector(currentState).get('bodyFat')).toBe(28.5);
      });
    });
    describe('female', () => {
      let femaleState = state.withMutations(map =>
        map.setIn(['userDetails', 'sex'], 'female')
      );

      it('defaultValue => 12.6', () => {
        expect(selector(femaleState).get('bodyFat')).toBe(12.6);
      });

      it('female, the wider the waist the less leaner she is => 21.8', () => {
        const currentState = femaleState.withMutations(map =>
          map.setIn(['userDetails', 'latestMeasurements', 'waist'], 76)
        );

        expect(selector(currentState).get('bodyFat')).toBe(21.8);
      });

      it('female, the wider the hip the less leaner she is => 17.4', () => {
        const currentState = femaleState.withMutations(map =>
          map.setIn(['userDetails', 'latestMeasurements', 'hip'], 100)
        );

        expect(selector(currentState).get('bodyFat')).toBe(17.4);
      });
    });
  });

  describe('minCalorie', () => {
    it('basic minCalorie => |73|', () => {
      expect(Math.abs(selector(state).get('minCalorie'))).toBe(73);
    });

    it('increasing proteinCalorie should reduce |minCalorie| => 46', () => {
      const currentState = state.setIn(
        ['form', 'calorie-target', 'values', 'protein'],
        4
      );
      expect(Math.abs(selector(currentState).get('minCalorie'))).toBe(46);
    });

    describe('tdee', () => {
      describe('harris-benedict', () => {
        it('increasing activity should increase tdee which should increase |minCalorie| => 83', () => {
          const currentState = state.setIn(
            ['form', 'calorie-target', 'values', 'activity'],
            2
          );
          expect(Math.abs(selector(currentState).get('minCalorie'))).toBe(83);
        });

        it('increasing height should increase tdee which should increase |minCalorie| => 74', () => {
          const currentState = state.setIn(
            ['userDetails', 'latestMeasurements', 'height'],
            200
          );
          expect(Math.abs(selector(currentState).get('minCalorie'))).toBe(74);
        });

        it('increasing age should decrease tdee which should decrease |minCalorie| => 72', () => {
          const currentState = state.setIn(
            ['userDetails', 'dob'],
            moment('22-05-1978', 'DD-MM-YYYY').valueOf()
          );
          expect(Math.abs(selector(currentState).get('minCalorie'))).toBe(72);
        });

        it('increasing female should decrease tdee which should decrease |minCalorie| => 69', () => {
          const currentState = state.setIn(['userDetails', 'sex'], 'female');
          expect(Math.abs(selector(currentState).get('minCalorie'))).toBe(69);
        });
      });

      describe('katch-Mcardle', () => {
        it('increasing bodyFat should decrease tdee which should decrease |minCalorie| => 70', () => {
          const currentState = state
            .setIn(['form', 'calorie-target', 'values', 'bodyFat'], 20)
            .setIn(
              ['form', 'calorie-target', 'values', 'bmrCalculationMethod'],
              'katch-Mcardle'
            );
          expect(Math.abs(selector(currentState).get('minCalorie'))).toBe(70);
        });
      });
    });
  });

  describe('max', () => {
    it('defaultValue => [162, 74, 162, 74]', () => {
      const currentState = state;
      expect(Math.abs(selector(currentState).getIn(['max', 'restGram']))).toBe(
        162
      );
      expect(
        Math.abs(selector(currentState).getIn(['max', 'restPercentage']))
      ).toBe(74);
      expect(
        Math.abs(selector(currentState).getIn(['max', 'trainingGram']))
      ).toBe(162);
      expect(
        Math.abs(selector(currentState).getIn(['max', 'trainingPercentage']))
      ).toBe(74);
    });

    it('increasing dayCalories should increase max values => [250, 81, 250, 81]', () => {
      const currentState = state
        .setIn(['form', 'calorie-target', 'values', 'restDay'], 40)
        .setIn(['form', 'calorie-target', 'values', 'trainingDay'], 40);

      expect(Math.abs(selector(currentState).getIn(['max', 'restGram']))).toBe(
        250
      );
      expect(
        Math.abs(selector(currentState).getIn(['max', 'restPercentage']))
      ).toBe(81);
      expect(
        Math.abs(selector(currentState).getIn(['max', 'trainingGram']))
      ).toBe(250);
      expect(
        Math.abs(selector(currentState).getIn(['max', 'trainingPercentage']))
      ).toBe(81);
    });

    it('increasing protein should decrease values => [103, 47, 103, 47]', () => {
      const currentState = state.setIn(
        ['form', 'calorie-target', 'values', 'protein'],
        4
      );

      expect(Math.abs(selector(currentState).getIn(['max', 'restGram']))).toBe(
        103
      );
      expect(
        Math.abs(selector(currentState).getIn(['max', 'restPercentage']))
      ).toBe(47);
      expect(
        Math.abs(selector(currentState).getIn(['max', 'trainingGram']))
      ).toBe(103);
      expect(
        Math.abs(selector(currentState).getIn(['max', 'trainingPercentage']))
      ).toBe(47);
    });
  });
});
