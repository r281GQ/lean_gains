import axios from 'axios';
import { fromJS } from 'immutable';
import { arrayPush } from 'redux-form/immutable';

const NUTRITIONIX_SEARCH_API_ENDPOINT = `https://trackapi.nutritionix.com/v2/natural/nutrients`;
const REF_KEY = 0;
const APP_KEY = 'a9ff02753543e452faaaa3bb2936e49e';
const APP_ID = '8c0712d2';

const prepareAPI = query =>
  axios({
    url: NUTRITIONIX_SEARCH_API_ENDPOINT,
    method: 'POST',
    data: {
      query
    },
    headers: {
      'x-app-id': APP_ID,
      'x-app-key': APP_KEY,
      'x-remote-user-id': REF_KEY
    }
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

const mock = () =>
  fromJS({
    serving_weight_grams: 182,
    nf_protein: 0.47,
    food_name: 'apple',
    nf_total_carbohydrate: 25.13,
    serving_unit: 'medium',
    nf_total_fat: 0.31,
    alt_measures: {
      0: {
        serving_weight: 242,
        measure: 'NLEA serving',
        seq: 7,
        qty: 1
      },
      2: {
        serving_weight: 182,
        measure: 'medium',
        seq: 7,
        qty: 1
      },
      1: {
        serving_weight: 149,
        measure: 'small (2-3/4',
        seq: 5,
        qty: 1
      }
    },
    photo: {
      thumb: 'https://d2xdmhkmkbyw75.cloudfront.net/384_thumb.jpg',
      highres: 'https://d2xdmhkmkbyw75.cloudfront.net/384_highres.jpg'
    },
    tags: {
      item: 'apple',
      measure: null,
      quantity: '1.0',
      tag_id: 384
    },
    nf_calories: 94.64,
    quantity: 1
  });

// const search = query => dispatch =>
//   prepareAPI(query)
//     .then(response => {
//       dispatch(arrayPush('kcal-k', 'foods', formatResponse(response)));
//     })
//     .catch(err => {});

const search = query => dispatch =>
  dispatch(arrayPush('calorie-track', 'foods', mock()));

export default search;
