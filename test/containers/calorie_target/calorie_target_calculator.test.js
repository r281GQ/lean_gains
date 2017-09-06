import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import { PureCalorieTargetCalculator } from './../../../src/containers/calorie_target/calorie_target_calculator';

const calorieTarget = fromJS({
  finalValues: {}
});

describe('CalorieTargetCalculator test', () => {
  it('should render', () => {
    const component = shallow(
      <PureCalorieTargetCalculator
        calorieTarget={calorieTarget}
        handleSubmit={() => () => undefined}
        createCalorieTarget={() => undefined}
        initializeForm={() => undefined}
      />
    );

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should shouldComponentUpdate return false when all the important properties are met', () => {
    const component = shallow(
      <PureCalorieTargetCalculator
        bmrCalculationMethod="method"
        fatMethod="method"
        activity={1}
        calorieSplit="split"
        restDay={20}
        trainingDay={20}
        restFatGrams={0}
        restFatPercentage={0}
        trainingFatGrams={0}
        trainingFatPercentage={0}
        calorieTarget={calorieTarget}
        handleSubmit={() => () => undefined}
        createCalorieTarget={() => undefined}
        initializeForm={() => undefined}
      />
    );

    const nextProps = {
      calorieTarget: fromJS({
        max: {
          restGram: 10,
          trainingGram: 10,
          restPercentage: 10,
          trainingPercentage: 10
        }
      }),
      bmrCalculationMethod: 'method',
      fatMethod: 'method',
      activity: 1,
      calorieSplit: 'split',
      restDay: 20,
      trainingDay: 20
    };

    const instance = component.instance();

    expect(instance.shouldComponentUpdate(nextProps)).toBe(false);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should adjust calorie percentage according to the selecethed split', () => {
    const changeSpy = sinon.spy();

    const component = shallow(
      <PureCalorieTargetCalculator
        bmrCalculationMethod="method"
        fatMethod="method"
        activity={1}
        calorieSplit="split"
        restDay={20}
        trainingDay={20}
        restFatGrams={0}
        restFatPercentage={0}
        trainingFatGrams={0}
        trainingFatPercentage={0}
        calorieTarget={calorieTarget}
        handleSubmit={() => () => undefined}
        createCalorieTarget={() => undefined}
        initializeForm={() => undefined}
      />
    );

    const instance = component.instance();

    instance._adjustCaloriePercentage({ change: changeSpy }, {calorieSplit: 'slowbulk'});

    expect(changeSpy.calledWith('restDay', -10)).toBe(true);
    expect(changeSpy.calledWith('trainingDay', 30)).toBe(true);

    instance._adjustCaloriePercentage(
      { change: changeSpy },
      { calorieSplit: 'cut' }
    );

    expect(changeSpy.calledWith('restDay', -30)).toBe(true);
    expect(changeSpy.calledWith('trainingDay', 10)).toBe(true);

    instance._adjustCaloriePercentage(
      { change: changeSpy },
      { calorieSplit: 'recomp' }
    );

    expect(changeSpy.calledWith('restDay', -20)).toBe(true);
    expect(changeSpy.calledWith('trainingDay', 20)).toBe(true);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should adjust Ratio when current values are higher the allowed max', () => {
    const changeSpy = sinon.spy();

    const component = shallow(
      <PureCalorieTargetCalculator
        bmrCalculationMethod="method"
        fatMethod="method"
        activity={1}
        calorieSplit="split"
        restDay={20}
        trainingDay={20}
        restFatGrams={0}
        restFatPercentage={0}
        trainingFatGrams={0}
        trainingFatPercentage={0}
        calorieTarget={calorieTarget}
        handleSubmit={() => () => undefined}
        createCalorieTarget={() => undefined}
        initializeForm={() => undefined}
      />
    );

    const actualProps = {
      restFatGrams: 20,
      trainingFatGrams: 20,
      restFatPercentage: 20,
      trainingFatPercentage: 20
    };

    const nextProps = {
      calorieTarget: fromJS({
        max: {
          restGram: 10,
          trainingGram: 10,
          restPercentage: 10,
          trainingPercentage: 10
        }
      }),
      bmrCalculationMethod: 'method',
      fatMethod: 'method',
      activity: 1,
      calorieSplit: 'slowbulk',
      restDay: 20,
      trainingDay: 20
    };

    const instance = component.instance();

    instance._adjustFatRatio({ change: changeSpy, ...actualProps }, nextProps);

    expect(changeSpy.calledWith('restFatGrams', 10)).toBe(true);
    expect(changeSpy.calledWith('trainingFatGrams', 10)).toBe(true);
    expect(changeSpy.calledWith('restFatPercentage', 10)).toBe(true);
    expect(changeSpy.calledWith('trainingFatPercentage', 10)).toBe(true);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
