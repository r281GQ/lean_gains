import { fromJS, List } from 'immutable';
import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';

const selector = formValueSelector('calorie-track');

const foods = state => selector(state, 'foods') || List();

const getSelectedWeight = item =>
  item
    .get('measures')
    .find(value => value.get('name') === item.get('unit'))
    .get('weight');

const calories = foods =>
  foods.reduce(
    (sum, item) =>
      sum.withMutations(map =>
        map
          .update(
            'protein',
            value =>
              value +
              item.get('protein') *
                (getSelectedWeight(item) /
                  item.get('gram') *
                  item.get('quantity'))
          )
          .update(
            'carbohydrate',
            value =>
              value +
              item.get('carbohydrate') *
                (getSelectedWeight(item) /
                  item.get('gram') *
                  item.get('quantity'))
          )
          .update(
            'fat',
            value =>
              value +
              item.get('fat') *
                (getSelectedWeight(item) /
                  item.get('gram') *
                  item.get('quantity'))
          )
          .update(
            'calories',
            value =>
              value +
              item.get('calorie') *
                (getSelectedWeight(item) /
                  item.get('gram') *
                  item.get('quantity'))
          )
      ),
    fromJS({ calories: 0, protein: 0, carbohydrate: 0, fat: 0 })
  );

export default createSelector(foods, calories);
