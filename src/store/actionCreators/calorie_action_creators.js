import { arrayPush, initialize } from 'redux-form/immutable';
import * as _ from 'lodash';
import axios from 'axios';

import { Map } from 'immutable';

import {
  mapValues,
  formatResponse,
  mock,
  prepareAPI
} from './../../services/calorie_track';

import * as app from './../actions/app_actions';

import * as calorieLog from './../actions/calorie_actions';

// const search = query => dispatch =>
//   prepareAPI(query)
//     .then(response => {
//       dispatch(arrayPush('kcal-k', 'foods', mapValues(formatResponse(response))));
//     })
//     .catch(err => {});

// const updateCalorieLog = (items) => (dispatch, getState) => {
//   dispatch({ type: app.INIT_API });
//   axios
//     .put(
//       '/api/calorielogs',
//       _.map(items, item => ({ ...item, measures: _.toArray(item.measures) })),
//       {
//         credentials: true,
//         params: { day: getState().getIn(['app', 'selectedDayCalorieLog']) }
//       }
//     )
//     .then(({ data }) => {
//       dispatch({ type: calorieLog.WRITE_CALORIE_LOG, payload: data });
//       dispatch(
//         initialize(
//           'calorie-track',
//           Map().set('foods', getState().getIn(['calorieLog', 'nutritions']))
//         )
//       );
//       dispatch({ type: app.CLOSE_API });
//     })
//     .catch(error => {
//       dispatch({ type: app.CLOSE_API });
//       console.log(error);
//     });
// };

const updateCalorieLog = items => (dispatch, getState) => {
  dispatch({ type: app.INIT_API });
  if (getState().getIn(['app', 'openConsentModalDate'])) {
    axios
      .put(
        '/api/calorielogs',
        _.map(items, item => ({ ...item, measures: _.toArray(item.measures) })),
        {
          credentials: true,
          params: { day: getState().getIn(['app', 'selectedDayCalorieLog']) }
        }
      )
      .then(({ data }) => {
        return axios.get('/api/calorielogs', {
          credentials: true,
          params: { day: getState().getIn(['app', 'openConsentModalDate']) }
        });
      })
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
        dispatch({ type: app.CLOSE_CONSENT_MODAL });
        dispatch({ type: app.CLOSE_API });
      })
      .catch(error => {
        dispatch({ type: app.CLOSE_API });
        console.log(error);
      });
  } else {
    axios
      .put(
        '/api/calorielogs',
        _.map(items, item => ({ ...item, measures: _.toArray(item.measures) })),
        {
          credentials: true,
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
        console.log(error);
      });
  }
};

const initializeCalorieLog = () => (dispatch, getState) => {
  dispatch({ type: app.INIT_FETCH });
  axios
    .get('/api/calorielogs', { credentials: true ,params: { day: getState().getIn(['app', 'selectedDayCalorieLog'])}})
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
      console.log(error);
    });
};

const search = query => dispatch =>
  dispatch(arrayPush('calorie-track', 'foods', mapValues(mock())));

export { search, updateCalorieLog, initializeCalorieLog };
