import React from 'react';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';
import moment from 'moment';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import { fromJS, List, Map, Set } from 'immutable';
import { StaticRouter } from 'react-router-dom';

import CalorieTargetCalculator, {
  PureCalorieTargetCalculator
} from './../../../src/containers/calorie_target/calorie_target_calculator';
import { latestMeasurements } from './../../../shared/test_constants';

const muiTheme = getMuiTheme();

const store = createStore(
  combineReducers({
    app: () =>
      fromJS({
        isErrorModalOpen: false,
        message: [''],
        isConfirmDeleteModalOpen: false
      }),
    userDetails: () =>
      Map()
        .set('workoutTargets', Map())
        .set('latestMeasurements', fromJS(latestMeasurements)),
    workoutLogs: () =>
      Map()
        .set('data', Map())
        .set('dates', Set().add(moment('01-01-2017', 'DD-MM-YYYY').toDate())),
    formReducer
  })
);

injectTapEventPlugin();

describe('CalorieTargetCalculator integration test', () => {
  it('should render', () => {});
});
