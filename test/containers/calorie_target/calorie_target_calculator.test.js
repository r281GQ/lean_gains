import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { fromJS } from 'immutable';
import { PureCalorieTargetCalculator } from './../../../src/containers/calorie_target/calorie_target_calculator';

const f = fromJS({
  finalValues: {}
});

const nextProps = fromJS({

    max: {
      restGram: 0,
      trainingGram: 0,
      restPercentage: 0,
      trainingPercentage: 0
    }

});

describe('CalorieTargetCalculator test', () => {
  it('should render', () => {
    const component = shallow(
      <PureCalorieTargetCalculator
        calorieTarget={f}
        handleSubmit={() => () => undefined}
        createCalorieTarget={() => undefined}
        initializeForm={() => undefined}
      />
    );

    const instance = component.instance();

    const v = instance.shouldComponentUpdate({calorieTarget:nextProps});

    // console.log(v);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });



  it('should shouldComponentUpdate return false when all the important properties are met', () => {
    const component = shallow(
      <PureCalorieTargetCalculator
        bmrCalculationMethod ='method'
        fatMethod = 'method'
        activity ={1}
        calorieSplit= 'split'
        restDay= {20}
        trainingDay= {20}
        restFatGrams = {0}
        restFatPercentage = {0}
        trainingFatGrams = {0}
        trainingFatPercentage ={0}
        calorieTarget={f}
        handleSubmit={() => () => undefined}
        createCalorieTarget={() => undefined}
        initializeForm={() => undefined}
      />
    );

    const g = fromJS({

        max: {
          restGram: 10,
          trainingGram: 10,
          restPercentage: 10,
          trainingPercentage: 10
        }

    });


    const next = {
      calorieTarget: g,
      bmrCalculationMethod : 'method',
      fatMethod: 'method',
      activity: 1,
      calorieSplit: 'split',
      restDay: 20,
      trainingDay: 20

    }


    const instance = component.instance();

    expect(instance.shouldComponentUpdate(next)).toBe(false);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should shouldComponentUpdate return false when all the important properties are met', () => {
    const component = shallow(
      <PureCalorieTargetCalculator
        bmrCalculationMethod ='method'
        fatMethod = 'method'
        activity ={1}
        calorieSplit= 'split'
        restDay= {20}
        trainingDay= {20}
        restFatGrams = {0}
        restFatPercentage = {0}
        trainingFatGrams = {0}
        trainingFatPercentage ={0}
        calorieTarget={f}
        handleSubmit={() => () => undefined}
        createCalorieTarget={() => undefined}
        initializeForm={() => undefined}
      />
    );

    const g = fromJS({

        max: {
          restGram: 10,
          trainingGram: 10,
          restPercentage: 10,
          trainingPercentage: 10
        }

    });


    const next = {
      calorieTarget: g,
      bmrCalculationMethod : 'method',
      fatMethod: 'method',
      activity: 1,
      calorieSplit: 'slowbulk',
      restDay: 20,
      trainingDay: 20

    }


    const instance = component.instance();

    const changeSpy = sinon.spy()

    instance._adjustCaloriePercentage({change:changeSpy},next);


    expect(changeSpy.calledWith('restDay', -10)).toBe(true);
    expect(changeSpy.calledWith('trainingDay', 30)).toBe(true);

    instance._adjustCaloriePercentage({change:changeSpy},{calorieSplit: 'cut'});


    expect(changeSpy.calledWith('restDay', -30)).toBe(true);
    expect(changeSpy.calledWith('trainingDay', 10)).toBe(true);


    instance._adjustCaloriePercentage({change:changeSpy},{calorieSplit: 'recomp'});


    expect(changeSpy.calledWith('restDay', -20)).toBe(true);
    expect(changeSpy.calledWith('trainingDay', 20)).toBe(true);


    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should shouldComponentUpdate return false when all the important properties are met', () => {
    const component = shallow(
      <PureCalorieTargetCalculator
        bmrCalculationMethod ='method'
        fatMethod = 'method'
        activity ={1}
        calorieSplit= 'split'
        restDay= {20}
        trainingDay= {20}
        restFatGrams = {0}
        restFatPercentage = {0}
        trainingFatGrams = {0}
        trainingFatPercentage ={0}
        calorieTarget={f}
        handleSubmit={() => () => undefined}
        createCalorieTarget={() => undefined}
        initializeForm={() => undefined}
      />
    );

    const g = fromJS({

        max: {
          restGram: 10,
          trainingGram: 10,
          restPercentage: 10,
          trainingPercentage: 10
        }

    });


    const actual =  {
      restFatGrams: 20,
      trainingFatGrams: 20,
      restFatPercentage: 20,
      trainingFatPercentage: 20
    }

    const next = {
      calorieTarget: g,
      bmrCalculationMethod : 'method',
      fatMethod: 'method',
      activity: 1,
      calorieSplit: 'slowbulk',
      restDay: 20,
      trainingDay: 20

    }


    const instance = component.instance();

    const changeSpy = sinon.spy()

    instance._adjustFatRatio({change:changeSpy, ...actual },next);

    // console.log(changeSpy);
    expect(changeSpy.calledWith('restFatGrams', 10)).toBe(true);
    expect(changeSpy.calledWith('trainingFatGrams', 10)).toBe(true);
    expect(changeSpy.calledWith('restFatPercentage', 10)).toBe(true);
    expect(changeSpy.calledWith('trainingFatPercentage', 10)).toBe(true);
    // expect(changeSpy.calledWith('trainingDay', 30)).toBe(true);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
