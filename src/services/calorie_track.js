import axios from 'axios';
import * as _ from 'lodash';
import { fromJS } from 'immutable';

const API_ENDPOINT = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
const REF_KEY = process.env.REACT_APP_NUTRITIONIX_REF_KEY;
const APP_KEY = process.env.REACT_APP_NUTRITIONIX_APP_KEY;
const APP_ID = process.env.REACT_APP_NUTRITIONIX_APP_ID;

export default query =>
  new Promise((resolve, reject) =>
    axios
      .post(API_ENDPOINT, query, {
        headers: {
          'x-app-id': APP_ID,
          'x-app-key': APP_KEY,
          'x-remote-user-id': REF_KEY
        }
      })
      .then(response => {
        resolve(mapValues(formatResponse(response)));
      })
      .catch(error => reject(error))
  );

const mapValues = raw =>
  fromJS({
    quantity: raw.quantity,
    calorie: raw.nf_calories,
    name: raw.food_name,
    gram: raw.serving_weight_grams,
    protein: raw.nf_protein,
    carbohydrate: raw.nf_total_carbohydrate,
    unit: raw.serving_unit,
    fat: raw.nf_total_fat,
    photo: raw.photo,
    tags: _.omit(raw.tags, ['measure', 'quantity']),
    measures: _.mapValues(raw.alt_measures, measure => ({
      name: measure.measure,
      weight: measure.serving_weight
    }))
  });

const formatResponse = response =>
  _.map(response.data.foods, food =>
    _.extend(
      _.pick(food, [
        'serving_weight_grams',
        'nf_protein',
        'food_name',
        'nf_total_carbohydrate',
        'serving_unit',
        'nf_total_fat',
        'alt_measures',
        'photo',
        'tags',
        'nf_calories'
      ]),
      { quantity: 1 }
    )
  )[0];

// const mock = () => ({
//   serving_weight_grams: 182,
//   nf_protein: 0.47,
//   food_name: 'apple',
//   nf_total_carbohydrate: 25.13,
//   serving_unit: 'medium',
//   nf_total_fat: 0.31,
//   alt_measures: {
//     0: {
//       serving_weight: 242,
//       measure: 'NLEA serving',
//       seq: 7,
//       qty: 1
//     },
//     2: {
//       serving_weight: 182,
//       measure: 'medium',
//       seq: 7,
//       qty: 1
//     },
//     1: {
//       serving_weight: 149,
//       measure: 'small (2-3/4',
//       seq: 5,
//       qty: 1
//     }
//   },
//   photo: {
//     thumb: 'https://d2xdmhkmkbyw75.cloudfront.net/384_thumb.jpg',
//     highres: 'https://d2xdmhkmkbyw75.cloudfront.net/384_highres.jpg'
//   },
//   tags: {
//     item: 'apple',
//     measure: null,
//     quantity: '1.0',
//     tag_id: 384
//   },
//   nf_calories: 94.64,
//   quantity: 1
// });
