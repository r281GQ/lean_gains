import * as _ from 'lodash';

const harrisBenedict = (weight, height, age, sex) =>
  sex === 'male'
    ? 88 + 13.4 * weight + 4.8 * height - 5.7 * age
    : 447 + 9.27 * weight + 3.1 * height - 4.3 * age;

const katchMcardle = leanMass => 370 + 21.6 * leanMass;

const leanMass = (weight, bodyFat) =>
  weight * ((100 - Number.parseFloat(bodyFat)) / 100);

const maxFatPercentage = (dayCalorie, proteinCalorie) =>
  (dayCalorie - proteinCalorie) / dayCalorie * 100;

const maxFatGram = (dayCalorie, proteinCalorie) =>
  (dayCalorie - proteinCalorie) / 9;

const dayCalorie = (tdee, dayPercentage) =>
  tdee * ((100 + dayPercentage) / 100);

const maleBodyFat = (height, neck, belly) =>
  _.round(
    86.01 * Math.log10(belly * 0.39 - neck * 0.39) -
      70.041 * Math.log10(height * 0.39) +
      36.76,
    1
  );

const femaleBodyFat = (height, neck, waist, hip) =>
  _.round(
    163.205 * Math.log10(waist * 0.39 + hip * 0.39 - neck * 0.39) -
      97.684 * Math.log10(height * 0.39) -
      78.387,
    1
  );

export {
  femaleBodyFat,
  maleBodyFat,
  dayCalorie,
  maxFatGram,
  maxFatPercentage,
  leanMass,
  katchMcardle,
  harrisBenedict
};
