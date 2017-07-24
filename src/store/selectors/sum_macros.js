import { fromJS, List } from 'immutable';
import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';

const selector = formValueSelector('calorie-track');

const foods = state => selector(state, 'foods') || List();

const calories = foods =>
  foods.reduce((sum, item) => {
    const serving_weight = item
      .get('alt_measures')
      .find(value => value.get('measure') === item.get('serving_unit'))
      .get('serving_weight');

    return sum.withMutations(map =>
      map
        .update(
          'protein',
          value =>
            value +
            item.get('nf_protein') *
              (serving_weight /
                item.get('serving_weight_grams') *
                item.get('quantity'))
        )
        .update(
          'carbohydrate',
          value =>
            value +
            item.get('nf_total_carbohydrate') *
              (serving_weight /
                item.get('serving_weight_grams') *
                item.get('quantity'))
        )
        .update(
          'fat',
          value =>
            value +
            item.get('nf_total_fat') *
              (serving_weight /
                item.get('serving_weight_grams') *
                item.get('quantity'))
        )
        .update(
          'calories',
          value =>
            value +
            item.get('nf_calories') *
              (serving_weight /
                item.get('serving_weight_grams') *
                item.get('quantity'))
        )
    );
  }, fromJS({ calories: 0, protein: 0, carbohydrate: 0, fat: 0 }));

export default createSelector(foods, calories);
