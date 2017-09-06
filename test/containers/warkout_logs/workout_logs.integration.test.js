import React from 'react';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import sinon from 'sinon';
import moment from 'moment';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import { fromJS, Map, Set } from 'immutable';
import { StaticRouter } from 'react-router-dom';

import WorkoutLogForm, {
  PureWorkoutLogFormContainer
} from './../../../src/containers/workout_logs/workout_log_form';

const muiTheme = getMuiTheme();

const store = createStore(
  combineReducers({
    app: () => fromJS({ isErrorModalOpen: false, message: [''] }),
    workoutLogs: () =>
      Map().set(
        'dates',
        Set().add(moment('01-01-2017', 'DD-MM-YYYY').toDate())
      ),
    formReducer
  })
);

injectTapEventPlugin();

describe('Error integration test', () => {
  const dateStub = sinon.stub(Date, 'now').returns(1);

  afterAll(() => {
    dateStub.restore();
  });

  it('should render and call initFetch', () => {
    const componentDidMountSpy = sinon.spy(
      PureWorkoutLogFormContainer.prototype,
      'componentDidMount'
    );

    const updateWorkoutLogSpy = sinon.spy();
    const createWorkoutLogSpy = sinon.spy();
    const component = mount(
      <StaticRouter location="" context={{}}>
        <WorkoutLogForm
          handleSubmit={() => () => undefined}
          updateWorkoutLog={updateWorkoutLogSpy}
          createWorkoutLog={createWorkoutLogSpy}
          match={{ params: {}, path: 'before' }}
          datesWithWorkoutLogs={Set().add(Date.now)}
          selectedDate={Date.now}
        />
      </StaticRouter>,
      {
        context: { muiTheme, store },
        childContextTypes: {
          muiTheme: PropTypes.object,
          store: PropTypes.object
        }
      }
    );

    expect(componentDidMountSpy.calledOnce).toBe(true);
    expect(component).toHaveLength(1);

    componentDidMountSpy.restore();
  });
});
