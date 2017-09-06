import React from 'react';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import moment from 'moment';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import { fromJS, Map, Set } from 'immutable';
import { StaticRouter } from 'react-router-dom';

import DureWorkoutTarget from './../../../src/containers/workout_logs/workout_logs_router';
import { PureWorkoutLogsMainContainer } from './../../../src/containers/workout_logs/workout_logs_main';

const store = createStore(
  combineReducers({
    app: () =>
      fromJS({
        isErrorModalOpen: false,
        message: [''],
        isConfirmDeleteModalOpen: false
      }),
    userDetails: () => Map().set('workoutTargets', Map()),
    workoutLogs: () =>
      Map()
        .set('data', Map())
        .set('dates', Set().add(moment('01-01-2017', 'DD-MM-YYYY').toDate())),
    formReducer
  })
);

const muiTheme = getMuiTheme();

injectTapEventPlugin();

describe('WorkoutLogsRouter integration test', () => {
  let componentDidMountSpy;

  afterEach(() => {
    if (componentDidMountSpy) componentDidMountSpy.restore();
  });

  it('should render', () => {
    
    componentDidMountSpy = sinon
      .stub(PureWorkoutLogsMainContainer.prototype, 'componentDidMount')
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
