import { arrayPush, arrayRemoveAll, initialize } from 'redux-form/immutable';
import * as _ from 'lodash';
import axios from 'axios';

import { fromJS, Map } from 'immutable';

import {
  mapValues,
  formatResponse,
  mock,
  prepareAPI
} from './../../services/calorie_track';

import * as calorieLog from './../actions/calorie_actions';

// const search = query => dispatch =>
//   prepareAPI(query)
//     .then(response => {
//       dispatch(arrayPush('kcal-k', 'foods', mapValues(formatResponse(response))));
//     })
//     .catch(err => {});

const updateCalorieLog = items => dispatch => {
  axios
    .put(
      '/api/calorielogs',
      _.map(items, item => ({ ...item, measures: _.toArray(item.measures) })),
      { credentials: true }
    )
    .then(({ data }) => {
      console.log(data);
      dispatch({ type: calorieLog.WRITE_CALORIE_LOG, payload: data });
      dispatch(arrayRemoveAll('calorie-track', 'foods'));
      // dispatch(arrayRemoveAll('calorie-log', 'nutritions'));
      _.forEach(items, nutrition =>
        dispatch(arrayPush('calorie-log', 'nutritions', fromJS(nutrition)))
      );
      // _.forEach(data.nutritions, nutrition => dispatch(arrayPush('calorie-log', 'nutritions',fromJS(nutrition))))
    })
    .catch(error => console.log(error));
};
const initLog = () => (dispatch, getState) =>
  axios
    .get('/api/calorielogs', { credentials: true })
    .then(({ data }) => {
      dispatch({ type: calorieLog.WRITE_CALORIE_LOG, payload: data });
      dispatch(
        initialize(
          'calorie-log',
          Map().set(
            'nutritions',
            getState().getIn(['calorieLog', 'nutritions'])
          )
        )
      );
    })
    .catch(error => console.log(error));

const getCalorieLog = date =>
  axios
    .get('/api/calorielogs', { credentials: true })
    .then(item =>
      dispatch({ type: calorieLog.WRITE_CALORIE_LOG, payload: item })
    )
    .catch(error => console.log(error));

const search = query => dispatch =>
  dispatch(arrayPush('calorie-track', 'foods', mapValues(mock())));

export { search, updateCalorieLog, getCalorieLog, initLog };
