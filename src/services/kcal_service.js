import * as _ from "lodash";

const calculateBodyFat = (height, weight, sex, neck, belly) => sex === 'male' ?
  _.round(86.010 * Math.log10(belly*0.39 - neck*0.39) - 70.041 * Math.log10(height*0.39) + 36.76, 1) :
  0;
    // 163.205 x log10(waist + hip – neck) – 97.684 x log10(height) – 78.387

const tdeeCalculator =
  (method, weight, height, age, sex, activity, bodyFat) =>
    method === "harris-benedict"
      ? harrisBenedict(weight, height, age, sex) * Number.parseFloat(activity)
      : katchMcardle(leanMass(weight, bodyFat)) * Number.parseFloat(activity)



const calulateProteinTarget =
  (bodyFat, method, protein, weight) =>
    method === "katch-mcardle"
      ? leanMass(weight, bodyFat) * Number.parseFloat(protein) * 4
      : weight * Number.parseFloat(protein) * 4



const harrisBenedict =
  (weight, height, age, sex) =>
    sex === "male"
      ? 88 + 13.4 * weight + 4.8 * height - 5.7 * age
      : 447 + 9.27 * weight + 3.1 * height - 4.3 * age



const katchMcardle = leanMass => 370 + 21.6 * leanMass

const leanMass =
  (weight, bodyFat) => weight * ((100 - Number.parseFloat(bodyFat)) / 100)




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

export { tdeeCalculator, calulateProteinTarget, calculateBodyFat, deleteCache };
