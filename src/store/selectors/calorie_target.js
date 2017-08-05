import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { formValueSelector } from 'redux-form/immutable';
import * as _ from 'lodash';

import * as calorieCalculators from './calorie_target/calorie_calculators';
import ageSelector from './age';

const selector = formValueSelector('calorie-target');

const age = state => ageSelector(state);

const sex = state => state.getIn(['userDetails', 'sex']);

const latestMeasurements = state =>
  state.getIn(['userDetails', 'latestMeasurements']);

const formValues = state =>
  selector(
    state,
    'activity',
    'calorieSplit',
    'protein',
    'bmrCalculationMethod',
    'trainingDay',
    'trainingFatGrams',
    'restFatGrams',
    'trainingFatPercentage',
    'restFatPercentage',
    'restDay',
    'bodyFat',
    'fatMethod'
  );

const values = (
  age,
  sex,
  latestMeasurements,
  {
    bodyFat,
    bmrCalculationMethod,
    protein,
    activity,
    restDay,
    trainingDay,
    fatMethod,
    trainingFatPercentage,
    trainingFatGrams,
    restFatPercentage,
    restFatGrams
  }
) => {
  const proteinTarget = calorieCalculators.calculateProteinTarget(
    bodyFat,
    bmrCalculationMethod,
    protein,
    latestMeasurements.get('weight')
  );

  const tdee = calorieCalculators.tdeeCalculator(
    bmrCalculationMethod,
    latestMeasurements.get('weight'),
    latestMeasurements.get('height'),
    age,
    sex,
    activity,
    bodyFat
  );
  // const restDayCalories = dayCalorie(tdee, restDay);
  // const trainingDayCalories = dayCalorie(tdee, trainingDay);

  const finalProtein = calorieCalculators.calculateFinalProtein(proteinTarget);

  const finalFatRest = calorieCalculators.calculateFinalFat(
    fatMethod,
    tdee,
    restDay,
    restFatPercentage,
    restFatGrams
  );

  const finalFatTraining = calorieCalculators.calculateFinalFat(
    fatMethod,
    tdee,
    trainingDay,
    trainingFatPercentage,
    trainingFatGrams
  );

  const finalRestCarbohydrate = calorieCalculators.calculateFinalCarbohydrate(
    tdee,
    restDay,
    proteinTarget,
    fatMethod,
    restFatPercentage,
    restFatGrams
  );

  const finalTrainingCarbohydrate = calorieCalculators.calculateFinalCarbohydrate(
    tdee,
    trainingDay,
    proteinTarget,
    fatMethod,
    trainingFatPercentage,
    trainingFatGrams
  );

  const finalCalorieRest = calorieCalculators.calculateFinalCalorie(
    tdee,
    restDay
  );
  const finalCalorieTraining = calorieCalculators.calculateFinalCalorie(
    tdee,
    trainingDay
  );

  const maxRestGram = calorieCalculators.calculateMax(
    tdee,
    restDay,
    proteinTarget,
    'gram'
  );
  const maxRestPercentage = calorieCalculators.calculateMax(
    tdee,
    restDay,
    proteinTarget,
    'percentage'
  );
  const maxTrainingGram = calorieCalculators.calculateMax(
    tdee,
    trainingDay,
    proteinTarget,
    'gram'
  );
  const maxTrainingPercentage = calorieCalculators.calculateMax(
    tdee,
    trainingDay,
    proteinTarget,
    'percentage'
  );

  console.log(
    latestMeasurements.get('height'),
    latestMeasurements.get('weight'),
    sex,
    latestMeasurements.get('neck'),
    latestMeasurements.get('belly'),
    latestMeasurements.get('waist'),
    latestMeasurements.get('hip')


  );

  const f = {
    bodyFat: calorieCalculators.calculateBodyFat(
      latestMeasurements.get('height'),
      latestMeasurements.get('weight'),
      sex,
      latestMeasurements.get('neck'),
      latestMeasurements.get('belly'),
      latestMeasurements.get('waist'),
      latestMeasurements.get('hip')
    ),
    minCalorie: calorieCalculators.minCalorie(tdee, proteinTarget),
    max: {
      restGram: calorieCalculators.unlessItsAbovezero(maxRestGram),
      restPercentage: calorieCalculators.unlessItsAbovezero(maxRestPercentage),
      trainingGram: calorieCalculators.unlessItsAbovezero(maxTrainingGram),
      trainingPercentage: calorieCalculators.unlessItsAbovezero(
        maxTrainingPercentage
      )
    },
    finalValues: {
      rest: {
        calorie: finalCalorieRest,
        carbohydrate: finalRestCarbohydrate,
        fat: finalFatRest,
        protein: finalProtein
      },
      training: {
        calorie: finalCalorieTraining,
        carbohydrate: finalTrainingCarbohydrate,
        fat: finalFatTraining,
        protein: finalProtein
      }
    }
  }

  console.log(f)

  return fromJS(f);
};

export default createSelector(age, sex, latestMeasurements, formValues, values);
