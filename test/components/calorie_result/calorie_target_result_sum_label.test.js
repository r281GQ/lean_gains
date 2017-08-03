import React from 'react';
import { shallow, render, mount } from 'enzyme';
import CalorieTargetResultSumLabel from './../../../src/components/calorie_result/calorie_target_result_sum_label';

describe('calorie_target_result_sum_label', () => {
  it('should render label with given properties', () => {
    const component = shallow(
      <CalorieTargetResultSumLabel
        label="rest"
        calorieTarget={{ rest: { calorie: 1500 } }}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
