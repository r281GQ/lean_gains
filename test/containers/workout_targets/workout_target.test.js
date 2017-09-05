import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import {fromJS} from 'immutable';
import {SubmissionError} from 'redux-form/immutable'

import {PureWorkoutTarget} from './../../../src/containers/workout_targets/workout_target';

Date.now = jest.fn(()=>1)
describe('WorkoutTarget test', () => {
  // before(() => {
  //
  // });
  it('should render', () => {
    const componentDidMountSpy = sinon.spy(
      PureWorkoutTarget.prototype,
      'componentDidMount'
    );

    const handleSubmitSpy = sinon.stub().returns(f=>f);

    const updateWorkoutTarget= sinon.spy();
    const createWorkoutTarget = sinon.spy();
    const submitHandler = sinon.spy();
    const resetSpy = sinon.spy();

    const component = shallow(
      <PureWorkoutTarget
        handleSubmit = {handleSubmitSpy}
        updateWorkoutTarget = {updateWorkoutTarget}
        createWorkoutTarget ={createWorkoutTarget}
        reset = {resetSpy}
      />
    );

    try {

      component.instance()._handleFormSubmit(fromJS({}))
    } catch (e) {
      expect(e).toBeInstanceOf(SubmissionError)
    }

    expect(componentDidMountSpy.calledOnce).toBe(false)
    expect(updateWorkoutTarget.calledOnce).toBe(false)
    expect(createWorkoutTarget.calledOnce).toBe(false)
    expect(resetSpy.calledOnce).toBe(false)

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should throw error on fix training days and when no days are selected', () => {


    const handleSubmitSpy = sinon.stub().returns(f=>f);

    const updateWorkoutTarget= sinon.spy();
    const createWorkoutTarget = sinon.spy();
    const submitHandler = sinon.spy();
    const resetSpy = sinon.spy();

    const component = shallow(
      <PureWorkoutTarget
        handleSubmit = {handleSubmitSpy}
        updateWorkoutTarget = {updateWorkoutTarget}
        createWorkoutTarget ={createWorkoutTarget}
        reset = {resetSpy}
      />
    );

    try {

      component.instance()._handleFormSubmit(fromJS({

        isCycledTraining: 'fix'

      }))
    } catch (e) {
      expect(e).toBeInstanceOf(SubmissionError)
      console.log(e);
      expect(e.errors).toEqual({
        isCycledTraining: 'on fixed days you must select at least one day',
        _error: 'days'
      })
    }

    expect(updateWorkoutTarget.calledOnce).toBe(false)
    expect(createWorkoutTarget.calledOnce).toBe(false)
    expect(resetSpy.calledOnce).toBe(false)

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should throw error on fix training days and when exercise are given', () => {


    const handleSubmitSpy = sinon.stub().returns(f=>f);

    const updateWorkoutTarget= sinon.spy();
    const createWorkoutTarget = sinon.spy();
    const submitHandler = sinon.spy();
    const resetSpy = sinon.spy();

    const component = shallow(
      <PureWorkoutTarget
        handleSubmit = {handleSubmitSpy}
        updateWorkoutTarget = {updateWorkoutTarget}
        createWorkoutTarget ={createWorkoutTarget}
        reset = {resetSpy}
      />
    );

    try {

      component.instance()._handleFormSubmit(fromJS({

        isCycledTraining: 'fix',
        monday: true

      }))
    } catch (e) {
      expect(e).toBeInstanceOf(SubmissionError)
      console.log(e);
      expect(e.errors).toEqual({
        isCycledTraining: 'You must provide at least one valid exercise!',
        _error: 'exercise name'
      })
    }

    expect(updateWorkoutTarget.calledOnce).toBe(false)
    expect(createWorkoutTarget.calledOnce).toBe(false)
    expect(resetSpy.calledOnce).toBe(false)

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should throw error on cycle training days and whenstarting is absent ', () => {


    const handleSubmitSpy = sinon.stub().returns(f=>f);

    const updateWorkoutTarget= sinon.spy();
    const createWorkoutTarget = sinon.spy();
    const submitHandler = sinon.spy();
    const resetSpy = sinon.spy();

    const component = shallow(
      <PureWorkoutTarget
        handleSubmit = {handleSubmitSpy}
        updateWorkoutTarget = {updateWorkoutTarget}
        createWorkoutTarget ={createWorkoutTarget}
        reset = {resetSpy}
      />
    );

    try {

      component.instance()._handleFormSubmit(fromJS({

        isCycledTraining: 'cycle'

      }))
    } catch (e) {
      expect(e).toBeInstanceOf(SubmissionError)
      console.log(e);
      expect(e.errors).toEqual({
        isCycledTraining:
          'On cycled training you must set the starting date and on which days the training should occur!',
        _error: 'exercise name'
      })
    }

    expect(updateWorkoutTarget.calledOnce).toBe(false)
    expect(createWorkoutTarget.calledOnce).toBe(false)
    expect(resetSpy.calledOnce).toBe(false)

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should throw error on cycle training days and whenstarting is absent ', () => {


    const handleSubmitSpy = sinon.stub().returns(f=>f);

    const updateWorkoutTarget= sinon.spy();
    const createWorkoutTarget = sinon.spy();
    const submitHandler = sinon.spy();
    const resetSpy = sinon.spy();

    const component = shallow(
      <PureWorkoutTarget
        handleSubmit = {handleSubmitSpy}
        updateWorkoutTarget = {updateWorkoutTarget}
        createWorkoutTarget ={createWorkoutTarget}
        reset = {resetSpy}
      />
    );

    try {

      component.instance()._handleFormSubmit(fromJS({

        isCycledTraining: 'cycle',
        startDayofTraining: 'something'

      }))
    } catch (e) {
      expect(e).toBeInstanceOf(SubmissionError)
      console.log(e);
      expect(e.errors).toEqual({
        isCycledTraining:
          'On cycled training you must set the starting date and on which days the training should occur!',
        _error: 'exercise name'
      })
    }

    expect(updateWorkoutTarget.calledOnce).toBe(false)
    expect(createWorkoutTarget.calledOnce).toBe(false)
    expect(resetSpy.calledOnce).toBe(false)

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });


  it('should throw error on cycle training days and whenstarting is absent ', () => {


    const handleSubmitSpy = sinon.stub().returns(f=>f);

    const updateWorkoutTarget= sinon.spy();
    const createWorkoutTarget = sinon.spy();
    const submitHandler = sinon.spy();
    const resetSpy = sinon.spy();

    const component = shallow(
      <PureWorkoutTarget
        handleSubmit = {handleSubmitSpy}
        updateWorkoutTarget = {updateWorkoutTarget}
        createWorkoutTarget ={createWorkoutTarget}
        reset = {resetSpy}
      />
    );

    try {

      component.instance()._handleFormSubmit(fromJS({

        isCycledTraining: 'cycle',
        onEveryxDay: 4

      }))
    } catch (e) {
      expect(e).toBeInstanceOf(SubmissionError)
      console.log(e);
      expect(e.errors).toEqual({
        isCycledTraining:
          'On cycled training you must set the starting date and on which days the training should occur!',
        _error: 'exercise name'
      })
    }

    expect(updateWorkoutTarget.calledOnce).toBe(false)
    expect(createWorkoutTarget.calledOnce).toBe(false)
    expect(resetSpy.calledOnce).toBe(false)

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should throw error on cycle training days and whenstarting is absent ', () => {


    const handleSubmitSpy = sinon.stub().returns(f=>f);

    const updateWorkoutTarget= sinon.spy();
    const createWorkoutTarget = sinon.spy();
    const submitHandler = sinon.spy();
    const resetSpy = sinon.spy();

    const component = shallow(
      <PureWorkoutTarget
        handleSubmit = {handleSubmitSpy}
        updateWorkoutTarget = {updateWorkoutTarget}
        createWorkoutTarget ={createWorkoutTarget}
        reset = {resetSpy}
      />
    );

    try {

      component.instance()._handleFormSubmit(fromJS({

        isCycledTraining: 'cycle',
        onEveryxDay: 4,
        startDayofTraining: "s"

      }))
    } catch (e) {
      expect(e).toBeInstanceOf(SubmissionError)
      console.log(e);
      expect(e.errors).toEqual({
        isCycledTraining: 'You must provide at least one valid exercise!',
        _error: 'exercise name'
      })
    }

    expect(updateWorkoutTarget.calledOnce).toBe(false)
    expect(createWorkoutTarget.calledOnce).toBe(false)
    expect(resetSpy.calledOnce).toBe(false)

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should throw error on cycle training days and whenstarting is absent ', () => {


    const handleSubmitSpy = sinon.stub().returns(f=>f);

    const updateWorkoutTarget= sinon.spy();
    const createWorkoutTarget = sinon.spy();
    const submitHandler = sinon.spy();
    const resetSpy = sinon.spy();

    const component = shallow(
      <PureWorkoutTarget
        handleSubmit = {handleSubmitSpy}
        updateWorkoutTarget = {updateWorkoutTarget}
        createWorkoutTarget ={createWorkoutTarget}
        reset = {resetSpy}
        match = {{params: {id: 2}}}
      />
    );

    try {

      component.instance()._handleFormSubmit(fromJS({

        isCycledTraining: 'cycle',
        onEveryxDay: 4,
        startDayofTraining: new Date(),
        exercises: ["d"]

      }))
    } catch (e) {
      expect(e).toBeInstanceOf(SubmissionError)
      console.log(e);
      expect(e.errors).toEqual({
        isCycledTraining: 'You must provide at least one valid exercise!',
        _error: 'exercise name'
      })
    }

    expect(updateWorkoutTarget.calledOnce).toBe(true)
    expect(createWorkoutTarget.calledOnce).toBe(false)
    expect(resetSpy.calledOnce).toBe(true)

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });


  it('should throw error on cycle training days and whenstarting is absent ', () => {


    const handleSubmitSpy = sinon.stub().returns(f=>f);

    const updateWorkoutTarget= sinon.spy();
    const createWorkoutTarget = sinon.spy();
    const submitHandler = sinon.spy();
    const resetSpy = sinon.spy();

    const component = shallow(
      <PureWorkoutTarget
        handleSubmit = {handleSubmitSpy}
        updateWorkoutTarget = {updateWorkoutTarget}
        createWorkoutTarget ={createWorkoutTarget}
        reset = {resetSpy}
        match = {{params: {id: 2}}}
      />
    );

    // try {
    //
    //   component.instance()._handleFormSubmit(fromJS({
    //
    //     isCycledTraining: 'cycle',
    //     onEveryxDay: 4,
    //     startDayofTraining: new Date(),
    //     exercises: ["d"]
    //
    //   }))
    // } catch (e) {
    //   expect(e).toBeInstanceOf(SubmissionError)
    //   console.log(e);
    //   expect(e.errors).toEqual({
    //     isCycledTraining: 'You must provide at least one valid exercise!',
    //     _error: 'exercise name'
    //   })
    // }

    // expect(updateWorkoutTarget.calledOnce).toBe(true)
    // expect(createWorkoutTarget.calledOnce).toBe(false)
    // expect(resetSpy.calledOnce).toBe(true)

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
