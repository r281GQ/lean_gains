import { arrayPush, initialize } from 'redux-form/immutable';
import * as _ from 'lodash';
import { Map } from 'immutable';

import request from './../../services/request';
import {
  mapValues,
  formatResponse,
  mock,
  prepareAPI
} from './../../services/calorie_track';
import * as app from './../actions/app_actions';
import * as calorieLog from './../actions/calorie_actions';

export const updateCalorieLog = items => (dispatch, getState) => {
  dispatch({ type: app.INIT_API });
  if (getState().getIn(['app', 'openConsentModalDate'])) {
    request
      .put(
        '/api/calorielogs',
        _.map(items, item => ({ ...item, measures: _.toArray(item.measures) })),
        {
          params: { day: getState().getIn(['app', 'selectedDayCalorieLog']) }
        }
      )
      .then(({ data }) =>
        request.get('/api/calorielogs', {
          params: { day: getState().getIn(['app', 'openConsentModalDate']) }
        })
      )
      .then(({ data }) => {
        dispatch({ type: calorieLog.WRITE_CALORIE_LOG, payload: data });
        dispatch(
          initialize(
            'calorie-track',
            Map().set('foods', getState().getIn(['calorieLog', 'nutritions']))
          )
        );
        dispatch({
          type: app.SET_CALORIE_LOG_DAY,
          payload: getState().getIn(['app', 'openConsentModalDate'])
        });
        dispatch({ type: app.UNSET_PENDING_CALORIE_LOG_DAY });
        dispatch({ type: app.CLOSE_CONSENT_MODAL });
        dispatch({ type: app.CLOSE_API });
      })
      .catch(error => {
        dispatch({ type: app.CLOSE_API });
      });
  } else {
    request
      .put(
        '/api/calorielogs',
        _.map(items, item => ({ ...item, measures: _.toArray(item.measures) })),
        {
          params: { day: getState().getIn(['app', 'selectedDayCalorieLog']) }
        }
      )
      .then(({ data }) => {
        dispatch({ type: calorieLog.WRITE_CALORIE_LOG, payload: data });
        dispatch(
          initialize(
            'calorie-track',
            Map().set('foods', getState().getIn(['calorieLog', 'nutritions']))
          )
        );
        dispatch({ type: app.CLOSE_API });
      })
      .catch(error => {
        dispatch({ type: app.CLOSE_API });
      });
  }
};

export const initializeCalorieLog = () => (dispatch, getState) => {
  dispatch({ type: app.INIT_FETCH });
  request
    .get('/api/calorielogs', {
      params: { day: getState().getIn(['app', 'selectedDayCalorieLog']) }
    })
    .then(({ data }) => {
      dispatch({ type: calorieLog.WRITE_CALORIE_LOG, payload: data });
      dispatch(
        initialize(
          'calorie-track',
          Map().set('foods', getState().getIn(['calorieLog', 'nutritions']))
        )
      );
      dispatch({ type: app.CLOSE_FETCH });
    })
    .catch(error => {
      dispatch({ type: app.CLOSE_FETCH });
    });
};

export const search = query => dispatch =>
  dispatch(arrayPush('calorie-track', 'foods', mapValues(formatResponse(prepareAPI(query)))));
