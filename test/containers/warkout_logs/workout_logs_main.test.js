import React from 'react';
import sinon from 'sinon';
import moment from 'moment';
import { Map, Set } from 'immutable';
import { shallow } from 'enzyme';

import { PureWorkoutLogsMainContainer } from './../../../src/containers/workout_logs/workout_logs_main';

describe('WorkoutLogsMainContainer test', () => {
  const didMountSpy = sinon.spy(
    PureWorkoutLogsMainContainer.prototype,
    'componentDidMount'
  );

  const willReceive = sinon.spy(
    PureWorkoutLogsMainContainer.prototype,
    'componentWillReceiveProps'
  );

  const setSelectedWorkoutLog = sinon.spy();
  const getWorkoutLogDatesSpy = sinon.spy();
  const openWorkoutModal = sinon.spy();
  const getWorkoutLogsForMonth = sinon.spy();
  const setSelectedMonthForWorkoutLogs = sinon.spy();

  afterEach(() => {
    didMountSpy.reset();
    willReceive.reset();
    setSelectedWorkoutLog.reset();
    getWorkoutLogDatesSpy.reset();
    openWorkoutModal.reset();
    getWorkoutLogsForMonth.reset();
    setSelectedMonthForWorkoutLogs.reset();
  });

  afterAll(() => {
    didMountSpy.restore();
    willReceive.restore();
  });

  it('should render', () => {
    const component = shallow(
      <PureWorkoutLogsMainContainer
        setSelectedWorkoutLog={setSelectedWorkoutLog}
        getWorkoutLogDates={getWorkoutLogDatesSpy}
        setSelectedMonthForWorkoutLogs={setSelectedMonthForWorkoutLogs}
        getWorkoutLogsForMonth={getWorkoutLogsForMonth}
        openWorkoutModal={openWorkoutModal}
        workoutLogsForMonth={Map()}
        datesWithWorkoutLogs={Set()}
        monthsWithWorkoutLogs={Set()
          .add('01-2017')
          .add('02-2017')}
      />
    );

    component.instance().componentDidMount();

    expect(didMountSpy.calledOnce).toBe(true);
    expect(getWorkoutLogsForMonth.calledOnce).toBe(true);
    expect(setSelectedMonthForWorkoutLogs.calledWith('02-2017')).toBe(true);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should render', () => {
    const component = shallow(
      <PureWorkoutLogsMainContainer
        setSelectedWorkoutLog={setSelectedWorkoutLog}
        getWorkoutLogDates={getWorkoutLogDatesSpy}
        setSelectedMonthForWorkoutLogs={setSelectedMonthForWorkoutLogs}
        getWorkoutLogsForMonth={getWorkoutLogsForMonth}
        openWorkoutModal={openWorkoutModal}
        workoutLogsForMonth={Map()}
        datesWithWorkoutLogs={Set().add(moment().valueOf())}
        monthsWithWorkoutLogs={Set()
          .add('01-2017')
          .add('02-2017')}
      />
    );

    component.instance().componentDidMount();

    expect(didMountSpy.calledOnce).toBe(true);
    expect(getWorkoutLogDatesSpy.calledOnce).toBe(false);
    expect(getWorkoutLogsForMonth.calledOnce).toBe(true);
    expect(setSelectedMonthForWorkoutLogs.calledWith('02-2017')).toBe(true);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should render', () => {
    const component = shallow(
      <PureWorkoutLogsMainContainer
        setSelectedWorkoutLog={setSelectedWorkoutLog}
        getWorkoutLogDates={getWorkoutLogDatesSpy}
        setSelectedMonthForWorkoutLogs={setSelectedMonthForWorkoutLogs}
        getWorkoutLogsForMonth={getWorkoutLogsForMonth}
        openWorkoutModal={openWorkoutModal}
        workoutLogsForMonth={Map().set('1', Map())}
        datesWithWorkoutLogs={Set()}
        monthsWithWorkoutLogs={Set()
          .add('01-2017')
          .add('02-2017')}
      />
    );

    component.instance().componentDidMount();

    expect(didMountSpy.calledOnce).toBe(true);
    expect(getWorkoutLogsForMonth.calledOnce).toBe(true);
    expect(setSelectedMonthForWorkoutLogs.calledWith('02-2017')).toBe(true);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should render', () => {
    const component = shallow(
      <PureWorkoutLogsMainContainer
        setSelectedWorkoutLog={setSelectedWorkoutLog}
        getWorkoutLogDates={getWorkoutLogDatesSpy}
        setSelectedMonthForWorkoutLogs={setSelectedMonthForWorkoutLogs}
        getWorkoutLogsForMonth={getWorkoutLogsForMonth}
        openWorkoutModal={openWorkoutModal}
        selectedMonth="01-2017"
        workoutLogsForMonth={Map().set('1', Map())}
        datesWithWorkoutLogs={Set().add(moment().valueOf())}
        monthsWithWorkoutLogs={Set()
          .add('01-2017')
          .add('02-2017')}
      />
    );

    component.instance().componentWillReceiveProps({
      monthsWithWorkoutLogs: Set().add('01-2017')
    });

    expect(getWorkoutLogsForMonth.calledOnce).toBe(false);
    expect(setSelectedMonthForWorkoutLogs.calledOnce).toBe(false);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should render', () => {
    const component = shallow(
      <PureWorkoutLogsMainContainer
        setSelectedWorkoutLog={setSelectedWorkoutLog}
        getWorkoutLogDates={getWorkoutLogDatesSpy}
        setSelectedMonthForWorkoutLogs={setSelectedMonthForWorkoutLogs}
        getWorkoutLogsForMonth={getWorkoutLogsForMonth}
        openWorkoutModal={openWorkoutModal}
        selectedMonth="01-2017"
        workoutLogsForMonth={Map().set('1', Map())}
        datesWithWorkoutLogs={Set().add(moment().valueOf())}
        monthsWithWorkoutLogs={Set()}
      />
    );

    component.instance().componentWillReceiveProps({
      monthsWithWorkoutLogs: Set().add('01-2017')
    });

    expect(getWorkoutLogsForMonth.calledOnce).toBe(true);
    expect(setSelectedMonthForWorkoutLogs.calledOnce).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should render', () => {
    const component = shallow(
      <PureWorkoutLogsMainContainer
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
    );

    component.instance().componentWillReceiveProps({
      monthsWithWorkoutLogs: Set().add('01-2017')
    });

    expect(getWorkoutLogsForMonth.calledOnce).toBe(true);
    expect(setSelectedMonthForWorkoutLogs.calledOnce).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
