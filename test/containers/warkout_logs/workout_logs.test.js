import React from 'react';
import sinon from 'sinon';
import moment from 'moment';
import { shallow } from 'enzyme';
import { Set } from 'immutable';
import { PureWorkoutLogFormContainer } from './../../../src/containers/workout_logs/workout_log_form';

describe('WorkoutLogs test', () => {
  const dateStub = sinon.stub(Date, 'now').returns(1);

  const updateWorkoutLogSpy = sinon.spy();
  const createWorkoutLogSpy = sinon.spy();

  beforeEach(() => {});

  afterEach(() => {
    updateWorkoutLogSpy.reset();
    createWorkoutLogSpy.reset();
  });

  beforeAll(() => {});

  afterAll(() => {
    dateStub.restore();
  });

  it('should render', () => {
    const component = shallow(
      <PureWorkoutLogFormContainer
        handleSubmit={() => () => undefined}
        updateWorkoutLog={updateWorkoutLogSpy}
        createWorkoutLog={createWorkoutLogSpy}
        match={{ params: { id: 1 } }}
        datesWithWorkoutLogs={Set()}
      />
    );
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it(`should not render datePicker when path doesn't match 'before'`, () => {
    const component = shallow(
      <PureWorkoutLogFormContainer
        handleSubmit={() => () => undefined}
        updateWorkoutLog={updateWorkoutLogSpy}
        createWorkoutLog={createWorkoutLogSpy}
        match={{ params: { id: 1 }, path: 'bedsgfdfore' }}
        datesWithWorkoutLogs={Set()}
      />
    );

    const inst = component.instance();

    expect(inst._renderDate()).toBe(false);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it(`should not render datePicker when path doesn't exists`, () => {
    const component = shallow(
      <PureWorkoutLogFormContainer
        handleSubmit={() => () => undefined}
        updateWorkoutLog={updateWorkoutLogSpy}
        createWorkoutLog={createWorkoutLogSpy}
        match={{ params: {} }}
        datesWithWorkoutLogs={Set()}
      />
    );

    const inst = component.instance();

    expect(inst._renderDate()).toBe(false);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it(`should render datePicker when path matches 'before'`, () => {
    const component = shallow(
      <PureWorkoutLogFormContainer
        handleSubmit={() => () => undefined}
        updateWorkoutLog={updateWorkoutLogSpy}
        createWorkoutLog={createWorkoutLogSpy}
        match={{ params: { id: 1 }, path: 'before' }}
        datesWithWorkoutLogs={Set()}
      />
    );

    const inst = component.instance();

    expect(inst._renderDate()).toBe(true);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it(`should call updateWorkoutLogSpy when there is an id`, () => {
    const component = shallow(
      <PureWorkoutLogFormContainer
        handleSubmit={() => () => undefined}
        updateWorkoutLog={updateWorkoutLogSpy}
        createWorkoutLog={createWorkoutLogSpy}
        match={{ params: { id: 1 } }}
        datesWithWorkoutLogs={Set()}
      />
    );

    const inst = component.instance();

    inst._handleFormSubmit(Set());
    expect(updateWorkoutLogSpy.calledOnce).toBe(true);
    expect(createWorkoutLogSpy.calledOnce).toBe(false);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it(`should call createWorkoutLogSpy when there is no id`, () => {
    const component = shallow(
      <PureWorkoutLogFormContainer
        handleSubmit={() => () => undefined}
        updateWorkoutLog={updateWorkoutLogSpy}
        createWorkoutLog={createWorkoutLogSpy}
        match={{ params: {}, path: 'before' }}
        datesWithWorkoutLogs={Set()}
      />
    );

    const inst = component.instance();

    inst._handleFormSubmit(Set());
    expect(updateWorkoutLogSpy.calledOnce).toBe(false);
    expect(createWorkoutLogSpy.calledOnce).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should not disable create button when the current date is empty', () => {
    const component = shallow(
      <PureWorkoutLogFormContainer
        handleSubmit={() => () => undefined}
        updateWorkoutLog={updateWorkoutLogSpy}
        createWorkoutLog={createWorkoutLogSpy}
        match={{ params: {}, path: 'before' }}
        datesWithWorkoutLogs={Set()}
        selectedDate={moment(10000).toDate()}
      />
    );

    const inst = component.instance();

    expect(inst._isDisabled()).toBe(false);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should not disable create button when the current date is not among the logDates', () => {
    const component = shallow(
      <PureWorkoutLogFormContainer
        handleSubmit={() => () => undefined}
        updateWorkoutLog={updateWorkoutLogSpy}
        createWorkoutLog={createWorkoutLogSpy}
        match={{ params: { id: 1 }, path: 'before' }}
        datesWithWorkoutLogs={Set().add(moment(1).toDate())}
        selectedDate={moment(1).toDate()}
      />
    );

    const inst = component.instance();

    expect(inst._isDisabled()).toBe(false);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should disable create button when the current date is among the logDates', () => {
    const component = shallow(
      <PureWorkoutLogFormContainer
        handleSubmit={() => () => undefined}
        updateWorkoutLog={updateWorkoutLogSpy}
        createWorkoutLog={createWorkoutLogSpy}
        match={{ params: {}, path: 'before' }}
        datesWithWorkoutLogs={Set().add(moment(1).toDate())}
        selectedDate={moment(1).toDate()}
      />
    );

    const inst = component.instance();

    expect(inst._isDisabled()).toBe(true);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should disable dates in datePicker that are in logDates already', () => {
    const component = shallow(
      <PureWorkoutLogFormContainer
        handleSubmit={() => () => undefined}
        updateWorkoutLog={updateWorkoutLogSpy}
        createWorkoutLog={createWorkoutLogSpy}
        match={{ params: {}, path: 'before' }}
        datesWithWorkoutLogs={Set().add(moment(1).toDate())}
        selectedDate={moment(1).toDate()}
      />
    );

    const functionInstance = component
      .instance()
      ._disableThese(Set().add(moment('01-01-2017', 'DD-MM-YYYY').toDate()));

    expect(functionInstance(moment('01-01-2017', 'DD-MM-YYYY').toDate())).toBe(
      true
    );

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should not disable dates in datePicker that are not in logDates', () => {
    const component = shallow(
      <PureWorkoutLogFormContainer
        handleSubmit={() => () => undefined}
        updateWorkoutLog={updateWorkoutLogSpy}
        createWorkoutLog={createWorkoutLogSpy}
        match={{ params: {}, path: 'before' }}
        datesWithWorkoutLogs={Set().add(moment(1).toDate())}
        selectedDate={moment(1).toDate()}
      />
    );

    const inst = component.instance();
    const t = inst._disableThese(
      Set().add(moment('01-01-2017', 'DD-MM-YYYY').toDate())
    );
    expect(t(moment('01-02-2017', 'DD-MM-YYYY').toDate())).toBe(false);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
