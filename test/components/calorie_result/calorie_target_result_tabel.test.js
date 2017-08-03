import React from 'react';
import { shallow, render, mount } from 'enzyme';
import CalorieTargetResultTable from './../../../src/components/calorie_result/calorie_target_result_table';

describe('calorie_target_result_sum_label', () => {
  it('should render label with given properties', () => {
    const component = shallow(
      <CalorieTargetResultTable
        label="rest"
        calorieTarget={{ rest: { calorie: 1500, protein: 100, fat: 50, carbohydrate: 100 } }}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
