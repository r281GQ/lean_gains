import * as _ from 'lodash';

import * as baseFunctions from './base';

const unlessItsAbovezero = value => (value > 0 ? value : 0.1);

const calculateBodyFat = (height, weight, sex, neck, belly, waist, hip) =>
  sex === 'male'
    ? baseFunctions.maleBodyFat(height, neck, belly)
    : baseFunctions.femaleBodyFat(height, neck, waist, hip);

const tdeeCalculator = (method, weight, height, age, sex, activity, bodyFat) =>
  method === 'harris-benedict'
    ? baseFunctions.harrisBenedict(weight, height, age, sex) * activity
    : baseFunctions.katchMcardle(baseFunctions.leanMass(weight, bodyFat)) *
      activity;

const calculateProteinTarget = (bodyFat, method, protein, weight) =>
  method === 'katch-mcardle'
    ? baseFunctions.leanMass(weight, bodyFat) * protein * 4
    : weight * protein * 4;

const calculateFinalFat = (fatMethod, tdee, dayCalorieV, percentage, gram) =>
  fatMethod === 'percentage'
    ? _.ceil(
        baseFunctions.dayCalorie(tdee, dayCalorieV) * (percentage / 100) / 9
      )
    : _.ceil(gram * 9) / 9;

const calculateFinalCalorie = (tdee, dayCalorieV) =>
  _.ceil(baseFunctions.dayCalorie(tdee, dayCalorieV));

const calculateFinalProtein = proteinCalorie => _.ceil(proteinCalorie / 4);

const minCalorie = (tdee, proteinCalorie) =>
  -1 * _.floor((tdee - proteinCalorie) / tdee * 100);

const calculateFinalCarbohydrate = (
  tdee,
  dayCalorieV,
  proteinCalorie,
  fatMethod,
  percentage,
  gram
) =>
  _.ceil(
    (baseFunctions.dayCalorie(tdee, dayCalorieV) -
      calculateFinalFat(fatMethod, tdee, dayCalorieV, percentage, gram) * 9 -
      proteinCalorie) /
      4
  );

const calculateMax = (tdee, dayCalorieV, proteinCalorie, type) =>
  _.floor(
    unlessItsAbovezero(
      type === 'percentage'
        ? baseFunctions.maxFatPercentage(
            baseFunctions.dayCalorie(tdee, dayCalorieV),
            proteinCalorie
          )
        : baseFunctions.maxFatGram(
            baseFunctions.dayCalorie(tdee, dayCalorieV),
            proteinCalorie
          )
    ),
    1
  );

export {
  calculateMax,
  calculateBodyFat,
  minCalorie,
  unlessItsAbovezero,
  calculateFinalCarbohydrate,
  calculateFinalProtein,
  calculateFinalCalorie,
  calculateFinalFat,
  calculateProteinTarget,
  tdeeCalculator
};
