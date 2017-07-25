import { createSelector } from 'reselect';
import { List, fromJS } from 'immutable';
import { formValueSelector } from 'redux-form/immutable';
import age1 from './age';

const selector = formValueSelector('calorie-target');

import * as _ from 'lodash';

const age = state => age1(state);

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
// method, weight, height, age, sex, activity, bodyFat
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
    bodyFat,
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
    bodyFat
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

  return fromJS({
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
  });
};

//calculate
//
//maxrestfatgrams, and etc

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
    163.205 * log10(waist + hip - neck) - 97.684 * log10(height) - 78.387,
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

// const tdeeCalculator = _.memoize(
//   (method, weight, height, age, sex, activity, bodyFat) =>
//     method === "harris-benedict"
//       ? harrisBenedict(weight, height, age, sex)
//       : katchMcardle(leanMass(weight, bodyFat)) * Number.parseFloat(activity),
//   args =>
//     args ? [args[0], args[1], args[2], args[3], args[4], args[5], args[6]] : 0
// );
//
// const calulateProteinTarget = _.memoize(
//   (bodyFat, method, protein, weight) =>
//     method === "katch-mcardle"
//       ? leanMass(weight, bodyFat) * Number.parseFloat(protein) * 4
//       : weight * Number.parseFloat(protein) * 4,
//   args => args ?[args[0], args[1], args[2], args[3]]:0
// );
//
// const harrisBenedict = _.memoize(
//   (weight, height, age, sex) =>
//     sex === "male"
//       ? 88 + 13.4 * weight + 4.8 * height - 5.7 * age
//       : 447 + 9.27 * weight + 3.1 * height - 4.3 * age,
//       args => [args[0], args[1], args[2], args[3]]
// );
//
// const katchMcardle = _.memoize(leanMass => 370 + 21.6 * leanMass);
//
// const leanMass = _.memoize(
//   (weight, bodyFat) => weight * ((100 - Number.parseFloat(bodyFat)) / 100),
//   args => [args[0], args[1]]
// );

const initValues = ({ change, sex, latestMeasurements }) => {
  change(
    'bodyFat',
    calculateBodyFat(
      latestMeasurements.get('height'),
      latestMeasurements.get('weight'),
      sex,
      latestMeasurements.get('neck'),
      latestMeasurements.get('belly'),
      latestMeasurements.get('waist'),
      latestMeasurements.get('hip')
    )
  );
  change('restDay', -20);
  change('trainingDay', 20);
  change('restFatGrams', 0);
  change('trainingFatGrams', 0);
  change('restFatPercentage', 0);
  change('trainingFatPercentage', 0);
  change('fatMethod', 'grams');
  change('activity', 1.2);
  change('protein', 2);
  change('calorieSplit', 'recomp');
  change('bmrCalculationMethod', 'harris-benedict');
};

const adjustCaloriePercentage = (props, nextProps) => {
  const { calorieSplit } = nextProps;
  const { change } = props;
  if (calorieSplit === 'slowbulk') {
    change('restDay', -10);
    change('trainingDay', 30);
  }
  if (calorieSplit === 'cut') {
    change('restDay', -30);
    change('trainingDay', 10);
  }
  if (calorieSplit === 'recomp') {
    change('restDay', -20);
    change('trainingDay', 20);
  }
};
const minCalorie = (tdee, proteinCalorie) =>
  -1 * _.floor((tdee - proteinCalorie) / tdee * 100);

const maxFatPercentage = (dayCalorie, proteinCalorie) =>
  (dayCalorie - proteinCalorie) / dayCalorie * 100;

const maxFatGram = (dayCalorie, proteinCalorie) =>
  (dayCalorie - proteinCalorie) / 9;

const dayCalorie = (tdee, dayPercentage) =>
  tdee * ((100 + dayPercentage) / 100);

const adjustFatRatio = (
  {
    change,
    restDay,
    trainingDay,
    restFatGrams,
    restFatPercentage,
    trainingFatGrams,
    trainingFatPercentage
  },
  nextProps
) => {
  let tdee = tdeeCalculator(
    nextProps.bmrCalculationMethod,
    nextProps.latestMeasurements.get('weight'),
    nextProps.latestMeasurements.get('height'),
    nextProps.age,
    nextProps.sex,
    nextProps.activity,
    nextProps.bodyFat
  );

  let nextProteinCalorie = calulateProteinTarget(
    nextProps.bodyFat,
    nextProps.bmrCalculationMethod,
    nextProps.protein,
    nextProps.latestMeasurements.get('weight')
  );

  let nextMinimumCaloriePercentage = minCalorie(tdee, nextProteinCalorie);

  if (restDay < nextMinimumCaloriePercentage) {
    change('restDay', nextMinimumCaloriePercentage);
    change('restFatGrams', 0);
    change('restFatPercentage', 0);
  }

  if (trainingDay < nextMinimumCaloriePercentage) {
    change('trainingDay', nextMinimumCaloriePercentage);
    change('trainingFatGrams', 0);
    change('trainingFatPercentage', 0);
  }

  let nextRestDayCalorie = dayCalorie(tdee, nextProps.restDay);

  let nextMaxRestFatPercentage = maxFatPercentage(
    nextRestDayCalorie,
    nextProteinCalorie
  );

  let nextTrainingDayCalorie = dayCalorie(tdee, nextProps.trainingDay);

  let nextMaxTrainingFatPercentage = maxFatPercentage(
    nextTrainingDayCalorie,
    nextProteinCalorie
  );

  let nextMaxRestFatGram = maxFatGram(nextRestDayCalorie, nextProteinCalorie);
  let nextMaxTrainingFatGram = maxFatGram(
    nextTrainingDayCalorie,
    nextProteinCalorie
  );

  if (restFatGrams > unlessItsAbovezero(nextMaxRestFatGram)) {
    change('restFatGrams', _.floor(unlessItsAbovezero(nextMaxRestFatGram)));
  }
  if (trainingFatGrams > unlessItsAbovezero(nextMaxTrainingFatGram))
    change(
      'trainingFatGrams',
      _.floor(unlessItsAbovezero(nextMaxTrainingFatGram))
    );

  if (restFatPercentage > unlessItsAbovezero(nextMaxRestFatPercentage))
    change(
      'restFatPercentage',
      _.floor(unlessItsAbovezero(nextMaxRestFatPercentage))
    );
  if (trainingFatPercentage > unlessItsAbovezero(nextMaxTrainingFatPercentage))
    change(
      'trainingFatPercentage',
      _.floor(unlessItsAbovezero(nextMaxTrainingFatPercentage))
    );
};

const deleteCache = () =>
  _.forEach(
    [
      tdeeCalculator,
      calulateProteinTarget,
      harrisBenedict,
      leanMass,
      katchMcardle
    ],
    fn => (fn.Cache = {})
  );

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

const createFinalValues = (
  tdee,
  proteinCalorie,
  {
    restDay,
    trainingDay,
    fatMethod,
    restFatPercentage,
    restFatGrams,
    trainingFatGrams,
    trainingFatPercentage
  }
) => ({
  rest: {
    calorie: calculateFinalCalorie(tdee, restDay),
    protein: calculateFinalProtein(proteinCalorie),
    carbohydrate: calculateFinalCarbohydrate(
      tdee,
      restDay,
      proteinCalorie,
      fatMethod,
      restFatPercentage,
      restFatGrams
    ),
    fat: calculateFinalFat(
      fatMethod,
      tdee,
      restDay,
      restFatPercentage,
      restFatGrams
    )
  },
  training: {
    calorie: calculateFinalCalorie(tdee, trainingDay),
    protein: calculateFinalProtein(proteinCalorie),
    carbohydrate: calculateFinalCarbohydrate(
      tdee,
      trainingDay,
      proteinCalorie,
      fatMethod,
      trainingFatPercentage,
      trainingFatGrams
    ),
    fat: calculateFinalFat(
      fatMethod,
      tdee,
      trainingDay,
      trainingFatPercentage,
      trainingFatGrams
    )
  }
});

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
