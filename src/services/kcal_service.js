import * as _ from "lodash";
const unlessItsAbovezero = value =>
  value > 0 ? value : 0.1;
const maleBodyFat = (height, neck, belly) =>
  _.round(
    86.01 * Math.log10(belly * 0.39 - neck * 0.39) -
      70.041 * Math.log10(height * 0.39) +
      36.76,
    1
  );

//TODO needs provide a way to measure these as well
const femaleBodyFat = (height, neck, waist, hip) =>
  // 163.205 x log10(waist + hip – neck) – 97.684 x log10(height) – 78.387
  _.round(0, 1);

const areArgsDefined = args =>
  _.every(args, argument => argument !== undefined || argument !== null);

const calculateBodyFat = (height, weight, sex, neck, belly) =>
  areArgsDefined([height, weight, sex, neck, belly])
    ? sex === "male" ? maleBodyFat(height, neck, belly) : femaleBodyFat()
    : 0;

const tdeeCalculator = (method, weight, height, age, sex, activity, bodyFat) =>
  method === "harris-benedict"
    ? harrisBenedict(weight, height, age, sex) * Number.parseFloat(activity)
    : katchMcardle(leanMass(weight, bodyFat)) * Number.parseFloat(activity);

const calulateProteinTarget = (bodyFat, method, protein, weight) =>
  areArgsDefined([bodyFat, method, protein, weight])
    ? method === "katch-mcardle"
      ? leanMass(weight, bodyFat) * Number.parseFloat(protein) * 4
      : weight * Number.parseFloat(protein) * 4
    : 0;

const harrisBenedict = (weight, height, age, sex) =>
  sex === "male"
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
      latestMeasurements.get('belly')
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

const dayCalorie = (tdee, day) => tdee * ((100 + day) / 100);


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


export { tdeeCalculator, calulateProteinTarget, calculateBodyFat, deleteCache, initValues, adjustFatRatio, adjustCaloriePercentage, minCalorie,maxFatPercentage,maxFatGram,dayCalorie};
