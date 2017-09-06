import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import sinon from 'sinon';
import moment from 'moment';
import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import { fromJS, Map, Set } from 'immutable';
import { StaticRouter } from 'react-router-dom';

import WorkoutLogsMain, {
  PureWorkoutLogsMainContainer
} from './../../../src/containers/workout_logs/workout_logs_main';

const muiTheme = getMuiTheme();

const store = createStore(
  combineReducers({
    app: () =>
      fromJS({
        isErrorModalOpen: false,
        message: [''],
        isConfirmDeleteModalOpen: false
      }),
    workoutLogs: () =>
      Map()
        .set('data', Map())
        .set('dates', Set().add(moment('01-01-2017', 'DD-MM-YYYY').toDate())),
    formReducer
  })
);

injectTapEventPlugin();

describe('workoutLogsMain integration test', () => {
  const dateStub = sinon.stub(Date, 'now').returns(1);

  afterAll(() => {
    dateStub.restore();
  });
  it('should render', () => {
    const componentDidMountSpy = sinon
      .stub(PureWorkoutLogsMainContainer.prototype, 'componentDidMount')
      .callsFake(() => null);

    const setSelectedWorkoutLog = sinon.spy();
    const getWorkoutLogDatesSpy = sinon.spy();
    const openWorkoutModal = sinon.spy();
    const getWorkoutLogsForMonth = sinon.spy();
    const setSelectedMonthForWorkoutLogs = sinon.spy();

    const component = mount(
      <StaticRouter location="" context={{}}>
        <WorkoutLogsMain
          setSelectedWorkoutLog={setSelectedWorkoutLog}
          getWorkoutLogDates={getWorkoutLogDatesSpy}
          setSelectedMonthForWorkoutLogs={setSelectedMonthForWorkoutLogs}
          getWorkoutLogsForMonth={getWorkoutLogsForMonth}
          openWorkoutModal={openWorkoutModal}
          selectedMonth={''}
          workoutLogsForMonth={Map().set('1', Map())}
          datesWithWorkoutLogs={Set().add(moment().valueOf())}
          monthsWithWorkoutLogs={Set()}
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
    expect(component).toMatchSnapshot();
    componentDidMountSpy.restore();
  });
});
