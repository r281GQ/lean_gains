import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import {Map, Set} from 'immutable';
import moment from 'moment';
import { PureWorkoutLogsMainContainer } from './../../../src/containers/workout_logs/workout_logs_main';

describe('PureWorkoutLogsMainContainer test', () => {

  it('should render', () => {


    const didMountSpy = sinon.spy(PureWorkoutLogsMainContainer.prototype, 'componentDidMount');



    const setSelectedWorkoutLog = sinon.spy();
    const getWorkoutLogDatesSpy = sinon.spy();
    const openWorkoutModal = sinon.spy();
    const getWorkoutLogsForMonth= sinon.spy();
    const setSelectedMonthForWorkoutLogs = sinon.spy();

    const component = shallow(
      // datesWithWorkoutLogs: ImmutablePropTypes.set,
      // monthsWithWorkoutLogs: ImmutablePropTypes.set,
      // selectedMonth: PropTypes.string,
      // workoutLogsForMonth: ImmutablePropTypes.map,
      // openWorkoutModal: PropTypes.func.isRequired,
      // isTodaysWorkoutLogExists: PropTypes.bool

      <PureWorkoutLogsMainContainer
        setSelectedWorkoutLog={setSelectedWorkoutLog}
        getWorkoutLogDates={getWorkoutLogDatesSpy}
        setSelectedMonthForWorkoutLogs={setSelectedMonthForWorkoutLogs}
        getWorkoutLogsForMonth = {getWorkoutLogsForMonth}
        openWorkoutModal={openWorkoutModal}
        workoutLogsForMonth = {Map()}
        datesWithWorkoutLogs = {Set()}
        monthsWithWorkoutLogs= {Set().add('01-2017').add('02-2017')}
      />
    );

    let f = component.instance();
      f.componentDidMount();


    expect(didMountSpy.calledOnce).toBe(true)
    // expect(getWorkoutLogDatesSpy.calledOnce).toBe(true)
    expect(getWorkoutLogsForMonth.calledOnce).toBe(true)
    expect(setSelectedMonthForWorkoutLogs.calledWith('02-2017')).toBe(true)

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();



     didMountSpy.restore();



    //  setSelectedWorkoutLog.restore();
    //  getWorkoutLogDatesSpy.restore();
    //  openWorkoutModal.restore();
    //  getWorkoutLogsForMonth.restore();
    //  setSelectedMonthForWorkoutLogs.restore();
  });


  it('should render', () => {


    const didMountSpy = sinon.spy(PureWorkoutLogsMainContainer.prototype, 'componentDidMount');



    const setSelectedWorkoutLog = sinon.spy();
    const getWorkoutLogDatesSpy = sinon.spy();
    const openWorkoutModal = sinon.spy();
    const getWorkoutLogsForMonth= sinon.spy();
    const setSelectedMonthForWorkoutLogs = sinon.spy();

    const component = shallow(
      // datesWithWorkoutLogs: ImmutablePropTypes.set,
      // monthsWithWorkoutLogs: ImmutablePropTypes.set,
      // selectedMonth: PropTypes.string,
      // workoutLogsForMonth: ImmutablePropTypes.map,
      // openWorkoutModal: PropTypes.func.isRequired,
      // isTodaysWorkoutLogExists: PropTypes.bool

      <PureWorkoutLogsMainContainer
        setSelectedWorkoutLog={setSelectedWorkoutLog}
        getWorkoutLogDates={getWorkoutLogDatesSpy}
        setSelectedMonthForWorkoutLogs={setSelectedMonthForWorkoutLogs}
        getWorkoutLogsForMonth = {getWorkoutLogsForMonth}
        openWorkoutModal={openWorkoutModal}
        workoutLogsForMonth = {Map()}
        datesWithWorkoutLogs = {Set().add(moment().valueOf())}
        monthsWithWorkoutLogs= {Set().add('01-2017').add('02-2017')}
      />
    );

    let f = component.instance();
      f.componentDidMount();


    expect(didMountSpy.calledOnce).toBe(true)
    expect(getWorkoutLogDatesSpy.calledOnce).toBe(false)
    expect(getWorkoutLogsForMonth.calledOnce).toBe(true)
    expect(setSelectedMonthForWorkoutLogs.calledWith('02-2017')).toBe(true)

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();



     didMountSpy.restore();



    //  setSelectedWorkoutLog.restore();
    //  getWorkoutLogDatesSpy.restore();
    //  openWorkoutModal.restore();
    //  getWorkoutLogsForMonth.restore();
    //  setSelectedMonthForWorkoutLogs.restore();
  });

  it('should render', () => {


    const didMountSpy = sinon.spy(PureWorkoutLogsMainContainer.prototype, 'componentDidMount');



    const setSelectedWorkoutLog = sinon.spy();
    const getWorkoutLogDatesSpy = sinon.spy();
    const openWorkoutModal = sinon.spy();
    const getWorkoutLogsForMonth= sinon.spy();
    const setSelectedMonthForWorkoutLogs = sinon.spy();

    const component = shallow(
      // datesWithWorkoutLogs: ImmutablePropTypes.set,
      // monthsWithWorkoutLogs: ImmutablePropTypes.set,
      // selectedMonth: PropTypes.string,
      // workoutLogsForMonth: ImmutablePropTypes.map,
      // openWorkoutModal: PropTypes.func.isRequired,
      // isTodaysWorkoutLogExists: PropTypes.bool

      <PureWorkoutLogsMainContainer
        setSelectedWorkoutLog={setSelectedWorkoutLog}
        getWorkoutLogDates={getWorkoutLogDatesSpy}
        setSelectedMonthForWorkoutLogs={setSelectedMonthForWorkoutLogs}
        getWorkoutLogsForMonth = {getWorkoutLogsForMonth}
        openWorkoutModal={openWorkoutModal}
        workoutLogsForMonth = {Map().set('1', Map())}
        datesWithWorkoutLogs = {Set()}
        monthsWithWorkoutLogs= {Set().add('01-2017').add('02-2017')}
      />
    );

    let f = component.instance();
      f.componentDidMount();


    expect(didMountSpy.calledOnce).toBe(true)
    // expect(getWorkoutLogDatesSpy.calledOnce).toBe(true)
    expect(getWorkoutLogsForMonth.calledOnce).toBe(true)
    expect(setSelectedMonthForWorkoutLogs.calledWith('02-2017')).toBe(true)

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();



     didMountSpy.restore();



    //  setSelectedWorkoutLog.restore();
    //  getWorkoutLogDatesSpy.restore();
    //  openWorkoutModal.restore();
    //  getWorkoutLogsForMonth.restore();
    //  setSelectedMonthForWorkoutLogs.restore();
  });


  // it('should render', () => {
  //
  //
  //   const didMountSpy = sinon.spy(PureWorkoutLogsMainContainer.prototype, 'componentDidMount');
  //
  //
  //
  //   const setSelectedWorkoutLog = sinon.spy();
  //   const getWorkoutLogDatesSpy = sinon.spy();
  //   const openWorkoutModal = sinon.spy();
  //   const getWorkoutLogsForMonth= sinon.spy();
  //   const setSelectedMonthForWorkoutLogs = sinon.spy();
  //
  //   const component = shallow(
  //     // datesWithWorkoutLogs: ImmutablePropTypes.set,
  //     // monthsWithWorkoutLogs: ImmutablePropTypes.set,
  //     // selectedMonth: PropTypes.string,
  //     // workoutLogsForMonth: ImmutablePropTypes.map,
  //     // openWorkoutModal: PropTypes.func.isRequired,
  //     // isTodaysWorkoutLogExists: PropTypes.bool
  //
  //     <PureWorkoutLogsMainContainer
  //       setSelectedWorkoutLog={setSelectedWorkoutLog}
  //       getWorkoutLogDates={getWorkoutLogDatesSpy}
  //       setSelectedMonthForWorkoutLogs={setSelectedMonthForWorkoutLogs}
  //       getWorkoutLogsForMonth = {getWorkoutLogsForMonth}
  //       openWorkoutModal={openWorkoutModal}
  //       workoutLogsForMonth = {Map().set('1', Map())}
  //       datesWithWorkoutLogs = {Set().add(moment().valueOf())}
  //       monthsWithWorkoutLogs= {Set().add('01-2017').add('02-2017')}
  //     />
  //   );
  //
  //   let f = component.instance();
  //     f.componentDidMount();
  //
  //
  //   expect(didMountSpy.calledOnce).toBe(true)
  //   expect(getWorkoutLogDatesSpy.calledOnce).toBe(false)
  //   expect(getWorkoutLogsForMonth.calledOnce).toBe(false)
  //   expect(setSelectedMonthForWorkoutLogs.calledWith('02-2017')).toBe(false)
  //
  //   expect(component).toHaveLength(1);
  //   expect(component).toMatchSnapshot();
  //
  //
  //
  //    didMountSpy.restore();
  //
  //
  //
  //   //  setSelectedWorkoutLog.restore();
  //   //  getWorkoutLogDatesSpy.restore();
  //   //  openWorkoutModal.restore();
  //   //  getWorkoutLogsForMonth.restore();
  //   //  setSelectedMonthForWorkoutLogs.restore();
  // });


  it('should render', () => {


    const didMountSpy = sinon.spy(PureWorkoutLogsMainContainer.prototype, 'componentDidMount');

    const willreceive = sinon.spy(PureWorkoutLogsMainContainer.prototype, 'componentWillReceiveProps');

// setSelectedWorkoutLog.restore()

    const setSelectedWorkoutLog = sinon.spy();
    const getWorkoutLogDatesSpy = sinon.spy();
    const openWorkoutModal = sinon.spy();
    const getWorkoutLogsForMonth= sinon.spy();
    const setSelectedMonthForWorkoutLogs = sinon.spy();

    const component = shallow(
      // datesWithWorkoutLogs: ImmutablePropTypes.set,
      // monthsWithWorkoutLogs: ImmutablePropTypes.set,
      // selectedMonth: PropTypes.string,
      // workoutLogsForMonth: ImmutablePropTypes.map,
      // openWorkoutModal: PropTypes.func.isRequired,
      // isTodaysWorkoutLogExists: PropTypes.bool

      <PureWorkoutLogsMainContainer
        setSelectedWorkoutLog={setSelectedWorkoutLog}
        getWorkoutLogDates={getWorkoutLogDatesSpy}
        setSelectedMonthForWorkoutLogs={setSelectedMonthForWorkoutLogs}
        getWorkoutLogsForMonth = {getWorkoutLogsForMonth}
        openWorkoutModal={openWorkoutModal}
        selectedMonth = '01-2017'
        workoutLogsForMonth = {Map().set('1', Map())}
        datesWithWorkoutLogs = {Set().add(moment().valueOf())}
        monthsWithWorkoutLogs= {Set().add('01-2017').add('02-2017')}
      />
    );

    let f = component.instance();
      f.componentWillReceiveProps({monthsWithWorkoutLogs: Set().add('01-2017')});






    // expect(didMountSpy.calledOnce).toBe(true)
    // expect(getWorkoutLogDatesSpy.calledOnce).toBe(false)
    expect(getWorkoutLogsForMonth.calledOnce).toBe(false)
    expect(setSelectedMonthForWorkoutLogs.calledOnce).toBe(false)
//
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();



     didMountSpy.restore();


willreceive.restore();
    //  setSelectedWorkoutLog.restore();
    //  getWorkoutLogDatesSpy.restore();
    //  openWorkoutModal.restore();
    //  getWorkoutLogsForMonth.restore();
    //  setSelectedMonthForWorkoutLogs.restore();
  });


  it('should render', () => {


    const didMountSpy = sinon.spy(PureWorkoutLogsMainContainer.prototype, 'componentDidMount');

    const willreceive = sinon.spy(PureWorkoutLogsMainContainer.prototype, 'componentWillReceiveProps');

// setSelectedWorkoutLog.restore()

    const setSelectedWorkoutLog = sinon.spy();
    const getWorkoutLogDatesSpy = sinon.spy();
    const openWorkoutModal = sinon.spy();
    const getWorkoutLogsForMonth= sinon.spy();
    const setSelectedMonthForWorkoutLogs = sinon.spy();

    const component = shallow(
      // datesWithWorkoutLogs: ImmutablePropTypes.set,
      // monthsWithWorkoutLogs: ImmutablePropTypes.set,
      // selectedMonth: PropTypes.string,
      // workoutLogsForMonth: ImmutablePropTypes.map,
      // openWorkoutModal: PropTypes.func.isRequired,
      // isTodaysWorkoutLogExists: PropTypes.bool

      <PureWorkoutLogsMainContainer
        setSelectedWorkoutLog={setSelectedWorkoutLog}
        getWorkoutLogDates={getWorkoutLogDatesSpy}
        setSelectedMonthForWorkoutLogs={setSelectedMonthForWorkoutLogs}
        getWorkoutLogsForMonth = {getWorkoutLogsForMonth}
        openWorkoutModal={openWorkoutModal}
        selectedMonth = '01-2017'
        workoutLogsForMonth = {Map().set('1', Map())}
        datesWithWorkoutLogs = {Set().add(moment().valueOf())}
        monthsWithWorkoutLogs= {Set()}
      />
    );

    let f = component.instance();
      f.componentWillReceiveProps({monthsWithWorkoutLogs: Set().add('01-2017')});






    // expect(didMountSpy.calledOnce).toBe(true)
    // expect(getWorkoutLogDatesSpy.calledOnce).toBe(false)
    expect(getWorkoutLogsForMonth.calledOnce).toBe(true)
    expect(setSelectedMonthForWorkoutLogs.calledOnce).toBe(true)
//
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();



     didMountSpy.restore();
willreceive.restore();


    //  setSelectedWorkoutLog.restore();
    //  getWorkoutLogDatesSpy.restore();
    //  openWorkoutModal.restore();
    //  getWorkoutLogsForMonth.restore();
    //  setSelectedMonthForWorkoutLogs.restore();
  });

  it('should render', () => {


    const didMountSpy = sinon.spy(PureWorkoutLogsMainContainer.prototype, 'componentDidMount');

    const willreceive = sinon.spy(PureWorkoutLogsMainContainer.prototype, 'componentWillReceiveProps');

// setSelectedWorkoutLog.restore()

    const setSelectedWorkoutLog = sinon.spy();
    const getWorkoutLogDatesSpy = sinon.spy();
    const openWorkoutModal = sinon.spy();
    const getWorkoutLogsForMonth= sinon.spy();
    const setSelectedMonthForWorkoutLogs = sinon.spy();

    const component = shallow(
      // datesWithWorkoutLogs: ImmutablePropTypes.set,
      // monthsWithWorkoutLogs: ImmutablePropTypes.set,
      // selectedMonth: PropTypes.string,
      // workoutLogsForMonth: ImmutablePropTypes.map,
      // openWorkoutModal: PropTypes.func.isRequired,
      // isTodaysWorkoutLogExists: PropTypes.bool

      <PureWorkoutLogsMainContainer
        setSelectedWorkoutLog={setSelectedWorkoutLog}
        getWorkoutLogDates={getWorkoutLogDatesSpy}
        setSelectedMonthForWorkoutLogs={setSelectedMonthForWorkoutLogs}
        getWorkoutLogsForMonth = {getWorkoutLogsForMonth}
        openWorkoutModal={openWorkoutModal}
        selectedMonth = {''}
        workoutLogsForMonth = {Map().set('1', Map())}
        datesWithWorkoutLogs = {Set().add(moment().valueOf())}
        monthsWithWorkoutLogs= {Set()}
      />
    );

    let f = component.instance();
      f.componentWillReceiveProps({monthsWithWorkoutLogs: Set().add('01-2017')});






    // expect(didMountSpy.calledOnce).toBe(true)
    // expect(getWorkoutLogDatesSpy.calledOnce).toBe(false)
    expect(getWorkoutLogsForMonth.calledOnce).toBe(true)
    expect(setSelectedMonthForWorkoutLogs.calledOnce).toBe(true)
//
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();



     didMountSpy.restore();
willreceive.restore();


    //  setSelectedWorkoutLog.restore();
    //  getWorkoutLogDatesSpy.restore();
    //  openWorkoutModal.restore();
    //  getWorkoutLogsForMonth.restore();
    //  setSelectedMonthForWorkoutLogs.restore();
  });
});
