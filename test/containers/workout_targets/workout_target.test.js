import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { SubmissionError } from 'redux-form/immutable';

import { PureWorkoutTarget } from './../../../src/containers/workout_targets/workout_target';

describe('WorkoutTarget test', () => {
  let dateStub;

  const handleSubmitSpy = sinon.stub().returns(value => value);
  const updateWorkoutTarget = sinon.spy();
  const createWorkoutTarget = sinon.spy();
  const resetSpy = sinon.spy();

  beforeEach(() => {
    handleSubmitSpy.returns(value => value);
    dateStub = sinon.stub(Date, 'now').returns(1);
  });

  afterEach(() => {
    handleSubmitSpy.reset();
    updateWorkoutTarget.reset();
    createWorkoutTarget.reset();
    resetSpy.reset();
    dateStub.restore();
  });

  it('should render ', () => {

    const component = shallow(
      <PureWorkoutTarget
        handleSubmit={handleSubmitSpy}
        updateWorkoutTarget={updateWorkoutTarget}
        createWorkoutTarget={createWorkoutTarget}
        reset={resetSpy}
        match={{ params: { id: 2 } }}
      />
    );

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
  it('should throw error on fix training days and when no days are selected', () => {

    const component = shallow(
      <PureWorkoutTarget
        handleSubmit={handleSubmitSpy}
        updateWorkoutTarget={updateWorkoutTarget}
        createWorkoutTarget={createWorkoutTarget}
        reset={resetSpy}
      />
    );

    try {
      component.instance()._handleFormSubmit(
        fromJS({
          isCycledTraining: 'fix'
        })
      );
    } catch (e) {
      expect(e).toBeInstanceOf(SubmissionError);
      expect(e.errors).toEqual({
        isCycledTraining: 'on fixed days you must select at least one day',
        _error: 'days'
      });
    }

    expect(updateWorkoutTarget.calledOnce).toBe(false);
    expect(createWorkoutTarget.calledOnce).toBe(false);
    expect(resetSpy.calledOnce).toBe(false);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should throw error on fix training days and when exercise are given', () => {

    const component = shallow(
      <PureWorkoutTarget
        handleSubmit={handleSubmitSpy}
        updateWorkoutTarget={updateWorkoutTarget}
        createWorkoutTarget={createWorkoutTarget}
        reset={resetSpy}
      />
    );

    try {
      component.instance()._handleFormSubmit(
        fromJS({
          isCycledTraining: 'fix',
          monday: true
        })
      );
    } catch (e) {
      expect(e).toBeInstanceOf(SubmissionError);
      expect(e.errors).toEqual({
        isCycledTraining: 'You must provide at least one valid exercise!',
        _error: 'exercise name'
      });
    }

    expect(updateWorkoutTarget.calledOnce).toBe(false);
    expect(createWorkoutTarget.calledOnce).toBe(false);
    expect(resetSpy.calledOnce).toBe(false);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should throw error on cycle training days and when starting day and onEveryxDay are absent', () => {

    const component = shallow(
      <PureWorkoutTarget
        handleSubmit={handleSubmitSpy}
        updateWorkoutTarget={updateWorkoutTarget}
        createWorkoutTarget={createWorkoutTarget}
        reset={resetSpy}
      />
    );

    try {
      component.instance()._handleFormSubmit(
        fromJS({
          isCycledTraining: 'cycle'
        })
      );
    } catch (e) {
      expect(e).toBeInstanceOf(SubmissionError);
      expect(e.errors).toEqual({
        isCycledTraining:
          'On cycled training you must set the starting date and on which days the training should occur!',
        _error: 'exercise name'
      });
    }

    expect(updateWorkoutTarget.calledOnce).toBe(false);
    expect(createWorkoutTarget.calledOnce).toBe(false);
    expect(resetSpy.calledOnce).toBe(false);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should throw error on cycle training days and onEveryxDay is absent ', () => {

    const component = shallow(
      <PureWorkoutTarget
        handleSubmit={handleSubmitSpy}
        updateWorkoutTarget={updateWorkoutTarget}
        createWorkoutTarget={createWorkoutTarget}
        reset={resetSpy}
      />
    );

    try {
      component.instance()._handleFormSubmit(
        fromJS({
          isCycledTraining: 'cycle',
          startDayofTraining: 'something'
        })
      );
    } catch (e) {
      expect(e).toBeInstanceOf(SubmissionError);
      expect(e.errors).toEqual({
        isCycledTraining:
          'On cycled training you must set the starting date and on which days the training should occur!',
        _error: 'exercise name'
      });
    }

    expect(updateWorkoutTarget.calledOnce).toBe(false);
    expect(createWorkoutTarget.calledOnce).toBe(false);
    expect(resetSpy.calledOnce).toBe(false);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should throw error on cycle training days and when starting day is absent ', () => {

    const component = shallow(
      <PureWorkoutTarget
        handleSubmit={handleSubmitSpy}
        updateWorkoutTarget={updateWorkoutTarget}
        createWorkoutTarget={createWorkoutTarget}
        reset={resetSpy}
      />
    );

    try {
      component.instance()._handleFormSubmit(
        fromJS({
          isCycledTraining: 'cycle',
          onEveryxDay: 4
        })
      );
    } catch (e) {
      expect(e).toBeInstanceOf(SubmissionError);
      expect(e.errors).toEqual({
        isCycledTraining:
          'On cycled training you must set the starting date and on which days the training should occur!',
        _error: 'exercise name'
      });
    }

    expect(updateWorkoutTarget.calledOnce).toBe(false);
    expect(createWorkoutTarget.calledOnce).toBe(false);
    expect(resetSpy.calledOnce).toBe(false);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should throw error on training days when there is no given exercise', () => {

    const component = shallow(
      <PureWorkoutTarget
        handleSubmit={handleSubmitSpy}
        updateWorkoutTarget={updateWorkoutTarget}
        createWorkoutTarget={createWorkoutTarget}
        reset={resetSpy}
      />
    );

    try {
      component.instance()._handleFormSubmit(
        fromJS({
          isCycledTraining: 'cycle',
          onEveryxDay: 4,
          startDayofTraining: 's'
        })
      );
    } catch (e) {
      expect(e).toBeInstanceOf(SubmissionError);
      expect(e.errors).toEqual({
        isCycledTraining: 'You must provide at least one valid exercise!',
        _error: 'exercise name'
      });
    }

    expect(updateWorkoutTarget.calledOnce).toBe(false);
    expect(createWorkoutTarget.calledOnce).toBe(false);
    expect(resetSpy.calledOnce).toBe(false);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should call updateWorkoutTarget', () => {
    const component = shallow(
      <PureWorkoutTarget
        handleSubmit={handleSubmitSpy}
        updateWorkoutTarget={updateWorkoutTarget}
        createWorkoutTarget={createWorkoutTarget}
        reset={resetSpy}
        match={{ params: { id: 2 } }}
      />
    );

    try {
      component.instance()._handleFormSubmit(
        fromJS({
          isCycledTraining: 'cycle',
          onEveryxDay: 4,
          startDayofTraining: new Date(),
          exercises: ['d']
        })
      );
    } catch (e) {
      expect(e).toBeInstanceOf(SubmissionError);
    }

    expect(updateWorkoutTarget.calledOnce).toBe(true);
    expect(createWorkoutTarget.calledOnce).toBe(false);
    expect(resetSpy.calledOnce).toBe(true);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should throw error on invalid input', () => {
    const component = shallow(
      <PureWorkoutTarget
        handleSubmit={handleSubmitSpy}
        updateWorkoutTarget={updateWorkoutTarget}
        createWorkoutTarget={createWorkoutTarget}
        reset={resetSpy}
      />
    );

    try {
      component.instance()._handleFormSubmit(fromJS({}));
    } catch (e) {
      expect(e).toBeInstanceOf(SubmissionError);
    }

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
