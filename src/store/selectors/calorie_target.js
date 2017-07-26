import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { formValueSelector } from 'redux-form/immutable';
import * as _ from 'lodash';

import ageSelector from './age';
const selector = formValueSelector('calorie-target');

const age = state => ageSelector(state);

const sex = state => state.getIn(['userDetails', 'sex']);

const latestMeasurements = state =>
  state.getIn(['userDetails', 'latestMeasurements']);

const formValues = state =>
  fromJS(
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
    )
  );

const values = (age, sex, latestMeasurements, formValues) => {
  const bodyFat = calculateBodyFat(
    latestMeasurements.get('height'),
    latestMeasurements.get('weight'),
    sex,
    latestMeasurements.get('neck'),
    latestMeasurements.get('belly'),
    latestMeasurements.get('waist'),
    latestMeasurements.get('hip')
  );
  const proteinTarget = calulateProteinTarget(
    formValues.get('bodyFat'),
    formValues.get('bmrCalculationMethod'),
    formValues.get('protein'),
    latestMeasurements.get('weight')
  );

  const tdee = tdeeCalculator(
    formValues.get('bmrCalculationMethod'),
    latestMeasurements.get('weight'),
    latestMeasurements.get('height'),
    age,
    sex,
    formValues.get('activity'),
    formValues.get('bodyFat')
  );
  const restDayCalories = dayCalorie(tdee, formValues.get('restDay'));
  const trainingDayCalories = dayCalorie(tdee, formValues.get('trainingDay'));

  const finalProtein = calculateFinalProtein(proteinTarget);

  const finalFatRest = calculateFinalFat(
    formValues.get('fatMethod'),
    tdee,
    formValues.get('restDay'),
    formValues.get('restFatPercentage'),
    formValues.get('restFatGrams')
  );

  const finalFatTraining = calculateFinalFat(
    formValues.get('fatMethod'),
    tdee,
    formValues.get('trainingDay'),
    formValues.get('trainingFatPercentage'),
    formValues.get('trainingFatGrams')
  );
  // tdee,
  // restDay,
  // proteinCalorie,
  // fatMethod,
  // restFatPercentage,
  // restFatGrams
  const finalRestCarbohydrate = calculateFinalCarbohydrate(
    tdee,
    formValues.get('restDay'),
    proteinTarget,
    formValues.get('fatMethod'),
    formValues.get('restFatPercentage'),
    formValues.get('restFatGrams')
  );

  const finalTrainingCarbohydrate = calculateFinalCarbohydrate(
    tdee,
    formValues.get('trainingDay'),
    proteinTarget,
    formValues.get('fatMethod'),
    formValues.get('trainingFatPercentage'),
    formValues.get('trainingFatGrams')
  );

  const finalCalorieRest = calculateFinalCalorie(
    tdee,
    formValues.get('restDay')
  );
  const finalCalorieTraining = calculateFinalCalorie(
    tdee,
    formValues.get('trainingDay')
  );

  const maxRestGram = calculateMax(
    tdee,
    formValues.get('restDay'),
    proteinTarget,
    'gram'
  );
  const maxRestPercentage = calculateMax(
    tdee,
    formValues.get('restDay'),
    proteinTarget,
    'percentage'
  );
  const maxTrainingGram = calculateMax(
    tdee,
    formValues.get('trainingDay'),
    proteinTarget,
    'gram'
  );
  const maxTrainingPercentage = calculateMax(
    tdee,
    formValues.get('trainingDay'),
    proteinTarget,
    'percentage'
  );

  return fromJS({
    bodyFat,
    minCalorie: minCalorie(tdee, proteinTarget),
    max: {
      maxRestGram: unlessItsAbovezero(maxRestGram),
      maxRestPercentage: unlessItsAbovezero(maxRestPercentage),
      maxTrainingGram: unlessItsAbovezero(maxRestPercentage),
      maxTrainingPercentage: unlessItsAbovezero(maxRestPercentage)
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
  });
};

const unlessItsAbovezero = value => (value > 0 ? value : 0.1);

const maleBodyFat = (height, neck, belly) =>
  _.round(
    86.01 * Math.log10(belly * 0.39 - neck * 0.39) -
      70.041 * Math.log10(height * 0.39) +
      36.76,
    1
  );

const femaleBodyFat = (height, neck, waist, hip) =>
  _.round(
    163.205 * Math.log10(waist + hip - neck) -
      97.684 * Math.log10(height) -
      78.387,
    1
  );

const areArgsDefined = args =>
  _.every(args, argument => argument !== undefined || argument !== null);

const calculateBodyFat = (height, weight, sex, neck, belly, waist, hip) =>
  areArgsDefined([height, weight, sex, neck, belly])
    ? sex === 'male'
      ? maleBodyFat(height, neck, belly)
      : femaleBodyFat(height, neck, waist, hip)
    : 0;

const tdeeCalculator = (method, weight, height, age, sex, activity, bodyFat) =>
  method === 'harris-benedict'
    ? harrisBenedict(weight, height, age, sex) * Number.parseFloat(activity)
    : katchMcardle(leanMass(weight, bodyFat)) * Number.parseFloat(activity);

const calulateProteinTarget = (bodyFat, method, protein, weight) =>
  areArgsDefined([bodyFat, method, protein, weight])
    ? method === 'katch-mcardle'
      ? leanMass(weight, bodyFat) * Number.parseFloat(protein) * 4
      : weight * Number.parseFloat(protein) * 4
    : 0;

const harrisBenedict = (weight, height, age, sex) =>
  sex === 'male'
    ? 88 + 13.4 * weight + 4.8 * height - 5.7 * age
    : 447 + 9.27 * weight + 3.1 * height - 4.3 * age;

const katchMcardle = leanMass => 370 + 21.6 * leanMass;

const leanMass = (weight, bodyFat) =>
  weight * ((100 - Number.parseFloat(bodyFat)) / 100);

const minCalorie = (tdee, proteinCalorie) =>
  -1 * _.floor((tdee - proteinCalorie) / tdee * 100);

const maxFatPercentage = (dayCalorie, proteinCalorie) =>
  (dayCalorie - proteinCalorie) / dayCalorie * 100;

const maxFatGram = (dayCalorie, proteinCalorie) =>
  (dayCalorie - proteinCalorie) / 9;

const dayCalorie = (tdee, dayPercentage) =>
  tdee * ((100 + dayPercentage) / 100);

const calculateFinalFat = (fatMethod, tdee, dayCalorieV, percentage, gram) =>
  fatMethod === 'percentage'
    ? _.ceil(dayCalorie(tdee, dayCalorieV) * (percentage / 100) / 9)
    : _.ceil(gram * 9) / 9;

const calculateFinalCalorie = (tdee, dayCalorieV) =>
  _.ceil(dayCalorie(tdee, dayCalorieV));

const calculateFinalProtein = proteinCalorie => _.ceil(proteinCalorie / 4);

const calculateFinalCarbohydrate = (
  tdee,
  dayCalorieV,
  proteinCalorie,
  fatMethod,
  percentage,
  gram
) =>
  _.ceil(
    (dayCalorie(tdee, dayCalorieV) -
      calculateFinalFat(fatMethod, tdee, dayCalorieV, percentage, gram) * 9 -
      proteinCalorie) /
      4
  );

const calculateMax = (tdee, dayCalorieV, proteinCalorie, type) =>
  _.floor(
    unlessItsAbovezero(
      type === 'percentage'
        ? maxFatPercentage(dayCalorie(tdee, dayCalorieV), proteinCalorie)
        : maxFatGram(dayCalorie(tdee, dayCalorieV), proteinCalorie)
    ),
    1
  );

export default createSelector(age, sex, latestMeasurements, formValues, values);
