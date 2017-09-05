import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import sinon from 'sinon';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import { fromJS, List, Map, Set } from 'immutable';
import { StaticRouter } from 'react-router-dom';

import {latestMeasurements} from './../../../shared/test_constants';

import moment from 'moment';
import request from './../../../src/services/request';
import DureWorkoutTarget, {
  PureCalorieTargetCalculator
} from './../../../src/containers/calorie_target/calorie_target_calculator';
// import DureWorkoutTarget1, {
//   PureWorkoutLogsMainContainer
// } from './../../../src/containers/workout_logs/workout_logs_main';
// import DureWorkoutTarget from './../../../src/containers/workout_targets/workout_target';
import thunk from 'redux-thunk';

const muiTheme = getMuiTheme();

// const router = {
//   history: {
//     push: () => undefined,
//     replace: () => undefined,
//     createHref: () => undefined
//   },
//   route: {},
//   staticContext: { location: { pathname: '' } }
// };

const store = createStore(
  combineReducers({
    app: () =>
      fromJS({
        isErrorModalOpen: false,
        message: [''],
        isConfirmDeleteModalOpen: false
      }),
    userDetails: () => Map().set('workoutTargets', Map()).set('latestMeasurements' , fromJS(latestMeasurements)),
    workoutLogs: () =>
      Map()
        .set('data', Map())
        .set('dates', Set().add(moment('01-01-2017', 'DD-MM-YYYY').toDate())),
    formReducer
  }),
  applyMiddleware(thunk)
);

// const _reduxForm = {
//   getFormState: state => state,
//   asyncValidate: state => state,
//   getValues: state => state,
//   sectionPrefix: state => state,
//   register: state => state,
//   unregister: state => state,
//   registerInnerOnSubmit: state => state
// };

/*eslint no-undef: "off"*/
injectTapEventPlugin();

describe('Error integration test', () => {
  it('should render and call initFetch', () => {
    // const initFetchSpy = sinon.spy();
    const _reduxForm = {
      getFormState: state => state,
      asyncValidate: state => state,
      getValues: state => state,
      sectionPrefix: state => state,
      register: state => () => undefined,
      unregister: state => state,
      registerInnerOnSubmit: state => () => undefined
    };
    const componentDidMountSpy = sinon
      .stub(PureCalorieTargetCalculator.prototype, 'componentDidMount')
      .callsFake(() => Promise.resolve({}));

    const component = mount(
      <StaticRouter location="" context={{}}>
        <DureWorkoutTarget />
      </StaticRouter>,
      {
        context: { muiTheme, store },
        childContextTypes: {
          muiTheme: PropTypes.object,
          store: PropTypes.object
        }
      }
    );

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();

    componentDidMountSpy.restore();
  });
});
