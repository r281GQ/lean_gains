import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import {Set} from 'immutable';
import moment from 'moment';
import {PureWorkoutLogFormContainer} from './../../../src/containers/workout_logs/workout_log_form';

describe('WorkoutLogs test', () => {
  it('should render', () => {
    const dateStub = sinon.stub(Date, 'now').returns(1);
    const updateWorkoutLogSpy = sinon.spy();
    const createWorkoutLogSpy = sinon.spy();


    const component = shallow(
      <PureWorkoutLogFormContainer

        handleSubmit ={() => ()=> undefined}
        updateWorkoutLog = {updateWorkoutLogSpy}
        createWorkoutLog = {createWorkoutLogSpy}
        match = {{params: {id: 1}}}
        datesWithWorkoutLogs = {Set()}
      />
    );
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
     dateStub.restore();
  });

  it('should render', () => {
    const dateStub = sinon.stub(Date, 'now').returns(1);
    const updateWorkoutLogSpy = sinon.spy();
    const createWorkoutLogSpy = sinon.spy();


    const component = shallow(
      <PureWorkoutLogFormContainer

        handleSubmit ={() => ()=> undefined}
        updateWorkoutLog = {updateWorkoutLogSpy}
        createWorkoutLog = {createWorkoutLogSpy}
        match = {{params: {id: 1}, path: 'bedsgfdfore'}}
        datesWithWorkoutLogs = {Set()}
      />
    );


    const inst = component.instance();

    expect(inst._renderDate()).toBe(false)

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
     dateStub.restore();
  });

  it('should render', () => {
    const dateStub = sinon.stub(Date, 'now').returns(1);
    const updateWorkoutLogSpy = sinon.spy();
    const createWorkoutLogSpy = sinon.spy();


    const component = shallow(
      <PureWorkoutLogFormContainer

        handleSubmit ={() => ()=> undefined}
        updateWorkoutLog = {updateWorkoutLogSpy}
        createWorkoutLog = {createWorkoutLogSpy}
        match = {{params:{}}}
        datesWithWorkoutLogs = {Set()}
      />
    );


    const inst = component.instance();

    expect(inst._renderDate()).toBe(false)

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
     dateStub.restore();
  });

  it('should render', () => {
    const dateStub = sinon.stub(Date, 'now').returns(1);
    const updateWorkoutLogSpy = sinon.spy();
    const createWorkoutLogSpy = sinon.spy();


    const component = shallow(
      <PureWorkoutLogFormContainer

        handleSubmit ={() => ()=> undefined}
        updateWorkoutLog = {updateWorkoutLogSpy}
        createWorkoutLog = {createWorkoutLogSpy}
        match = {{params: {id: 1}, path: 'before'}}
        datesWithWorkoutLogs = {Set()}
      />
    );


    const inst = component.instance();

    expect(inst._renderDate()).toBe(true)

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
     dateStub.restore();
  });

  it('should render', () => {
    const dateStub = sinon.stub(Date, 'now').returns(1);
    const updateWorkoutLogSpy = sinon.spy();
    const createWorkoutLogSpy = sinon.spy();


    const component = shallow(
      <PureWorkoutLogFormContainer

        handleSubmit ={() => ()=> undefined}
        updateWorkoutLog = {updateWorkoutLogSpy}
        createWorkoutLog = {createWorkoutLogSpy}
        match = {{params: {id: 1}, path: 'before'}}
        datesWithWorkoutLogs = {Set()}
      />
    );


    const inst = component.instance();

    // expect(inst._renderDate()).toBe(true)
inst._handleFormSubmit(Set())
    expect(updateWorkoutLogSpy.calledOnce).toBe(true)
    expect(createWorkoutLogSpy.calledOnce).toBe(false)
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
     dateStub.restore();
  });

  it('should render', () => {
    const dateStub = sinon.stub(Date, 'now').returns(1);
    const updateWorkoutLogSpy = sinon.spy();
    const createWorkoutLogSpy = sinon.spy();


    const component = shallow(
      <PureWorkoutLogFormContainer

        handleSubmit ={() => ()=> undefined}
        updateWorkoutLog = {updateWorkoutLogSpy}
        createWorkoutLog = {createWorkoutLogSpy}
        match = {{params: {}, path: 'before'}}
        datesWithWorkoutLogs = {Set()}
      />
    );


    const inst = component.instance();

    // expect(inst._renderDate()).toBe(true)
inst._handleFormSubmit(Set())
    expect(updateWorkoutLogSpy.calledOnce).toBe(false)
    expect(createWorkoutLogSpy.calledOnce).toBe(true)
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
     dateStub.restore();
  });

  it('should render', () => {
    const dateStub = sinon.stub(Date, 'now').returns(1);
    const updateWorkoutLogSpy = sinon.spy();
    const createWorkoutLogSpy = sinon.spy();


    const component = shallow(
      <PureWorkoutLogFormContainer

        handleSubmit ={() => ()=> undefined}
        updateWorkoutLog = {updateWorkoutLogSpy}
        createWorkoutLog = {createWorkoutLogSpy}
        match = {{params: {}, path: 'before'}}
        datesWithWorkoutLogs = {Set()}
        selectedDate ={moment(10000).toDate()}
      />
    );


    const inst = component.instance();

    expect(inst._isDisabled()).toBe(false)
// inst._handleFormSubmit(Set())
    // expect(updateWorkoutLogSpy.calledOnce).toBe(false)
    // expect(createWorkoutLogSpy.calledOnce).toBe(true)
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
     dateStub.restore();
  });

  it('should render', () => {
    const dateStub = sinon.stub(Date, 'now').returns(1);
    const updateWorkoutLogSpy = sinon.spy();
    const createWorkoutLogSpy = sinon.spy();


    const component = shallow(
      <PureWorkoutLogFormContainer

        handleSubmit ={() => ()=> undefined}
        updateWorkoutLog = {updateWorkoutLogSpy}
        createWorkoutLog = {createWorkoutLogSpy}
        match = {{params: {id: 1}, path: 'before'}}
        datesWithWorkoutLogs = {Set().add(moment(1).toDate())}
        selectedDate ={moment(1).toDate()}
      />
    );


    const inst = component.instance();

    expect(inst._isDisabled()).toBe(false)
// inst._handleFormSubmit(Set())
    // expect(updateWorkoutLogSpy.calledOnce).toBe(false)
    // expect(createWorkoutLogSpy.calledOnce).toBe(true)
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
     dateStub.restore();
  });

  it('should render', () => {
    const dateStub = sinon.stub(Date, 'now').returns(1);
    const updateWorkoutLogSpy = sinon.spy();
    const createWorkoutLogSpy = sinon.spy();


    const component = shallow(
      <PureWorkoutLogFormContainer

        handleSubmit ={() => ()=> undefined}
        updateWorkoutLog = {updateWorkoutLogSpy}
        createWorkoutLog = {createWorkoutLogSpy}
        match = {{params: {}, path: 'before'}}
        datesWithWorkoutLogs = {Set().add(moment(1).toDate())}
        selectedDate ={moment(1).toDate()}
      />
    );


    const inst = component.instance();

    expect(inst._isDisabled()).toBe(true)
// inst._handleFormSubmit(Set())
    // expect(updateWorkoutLogSpy.calledOnce).toBe(false)
    // expect(createWorkoutLogSpy.calledOnce).toBe(true)
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
     dateStub.restore();
  });

  it('should render', () => {
    const dateStub = sinon.stub(Date, 'now').returns(1);
    const updateWorkoutLogSpy = sinon.spy();
    const createWorkoutLogSpy = sinon.spy();


    const component = shallow(
      <PureWorkoutLogFormContainer

        handleSubmit ={() => ()=> undefined}
        updateWorkoutLog = {updateWorkoutLogSpy}
        createWorkoutLog = {createWorkoutLogSpy}
        match = {{params: {}, path: 'before'}}
        datesWithWorkoutLogs = {Set().add(moment(1).toDate())}
        selectedDate ={moment(1).toDate()}
      />
    );


    const inst = component.instance();
    const t = inst._disableThese(Set().add(moment('01-01-2017', 'DD-MM-YYYY').toDate()))
    expect(t(moment('01-01-2017', 'DD-MM-YYYY').toDate())).toBe(true)
// inst._handleFormSubmit(Set())
    // expect(updateWorkoutLogSpy.calledOnce).toBe(false)
    // expect(createWorkoutLogSpy.calledOnce).toBe(true)
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
     dateStub.restore();
  });

  it('should render', () => {
    const dateStub = sinon.stub(Date, 'now').returns(1);
    const updateWorkoutLogSpy = sinon.spy();
    const createWorkoutLogSpy = sinon.spy();


    const component = shallow(
      <PureWorkoutLogFormContainer

        handleSubmit ={() => ()=> undefined}
        updateWorkoutLog = {updateWorkoutLogSpy}
        createWorkoutLog = {createWorkoutLogSpy}
        match = {{params: {}, path: 'before'}}
        datesWithWorkoutLogs = {Set().add(moment(1).toDate())}
        selectedDate ={moment(1).toDate()}
      />
    );


    const inst = component.instance();
    const t = inst._disableThese(Set().add(moment('01-01-2017', 'DD-MM-YYYY').toDate()))
    expect(t(moment('01-02-2017', 'DD-MM-YYYY').toDate())).toBe(false)
// inst._handleFormSubmit(Set())
    // expect(updateWorkoutLogSpy.calledOnce).toBe(false)
    // expect(createWorkoutLogSpy.calledOnce).toBe(true)
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
     dateStub.restore();
  });
});
