import { arrayPush, initialize } from 'redux-form/immutable';
import { Map, fromJS, List } from 'immutable';
import * as _ from 'lodash';

import request from './../../services/request';
import prepareAPI from './../../services/calorie_track';
import * as app from './../actions/app_actions';

export const updateCalorieLog = (items, day, nextDay) => dispatch => {
  dispatch({ type: app.INIT_API });
  if (nextDay) {
    return request
      .put(
        '/api/calorielogs',
        _.map(items, item => ({ ...item, measures: _.toArray(item.measures) })),
        {
          params: { day }
        }
      )
      .then(() =>
        request.get('/api/calorielogs', {
          params: { day: nextDay }
        })
      )
      .then(({ data }) => {
        dispatch(
          initialize(
            'calorie-track',
            Map().set('foods', fromJS(data).get('nutritions'))
          )
        );
        dispatch({
          type: app.SET_CALORIE_LOG_DAY,
          payload: nextDay
        });
        dispatch({ type: app.CLOSE_CONSENT_MODAL });
        dispatch({ type: app.CLOSE_API });
      })
      .catch(() => {
        dispatch({ type: app.CLOSE_API });
      });
  } else {
    return request
      .put(
        '/api/calorielogs',
        _.map(items, item => ({ ...item, measures: _.toArray(item.measures) })),
        {
          params: { day }
        }
      )
      .then(({ data }) => {
        dispatch(
          initialize(
            'calorie-track',
            Map().set('foods', fromJS(data).get('nutritions'))
          )
        );
        dispatch({ type: app.CLOSE_CONSENT_MODAL });
        dispatch({ type: app.CLOSE_API });
      })
      .catch(() => {
        dispatch({ type: app.CLOSE_API });
      });
  }
};

export const loadNutritionsForDay = (day, isPristine) => dispatch => {
  if (!isPristine)
    return dispatch({ type: app.OPEN_CONSENT_MODAL, payload: day });

  dispatch({ type: app.INIT_API });
  return request
    .get('/api/calorielogs', { params: { day } })
    .then(({ data }) => {
      dispatch({
        type: app.SET_CALORIE_LOG_DAY,
        payload: day
      });
      dispatch(
        initialize(
          'calorie-track',
          Map().set(
            'foods',
            fromJS(data).get('nutritions')
              ? fromJS(data).get('nutritions')
              : List()
          )
        )
      );
      dispatch({ type: app.CLOSE_API });
    })
    .catch(() => dispatch({ type: app.CLOSE_API }));
};

export const search = query => dispatch => {
  dispatch({ type: app.INIT_API });
  return prepareAPI(query)
    .then(response => {
      dispatch(arrayPush('calorie-track', 'foods', response));

      dispatch({ type: app.CLOSE_API });
    })
    .catch(() => dispatch({ type: app.CLOSE_API }));
};
