import axios from 'axios';

import { WRITE_SEARCH_RESULTS } from './../actions/kcal_action';

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
const searchForNutrition = query => (dispatch, getState) =>
  prepareAPI(query)
    .then(response => {
      console.log(response);
      dispatch({
        type: WRITE_SEARCH_RESULTS,
        payload: _.map(response.data.foods, food => _.pick(food, [
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
        ])
      )});
    })
    .catch(error => console.log(error));

export { searchForNutrition };
