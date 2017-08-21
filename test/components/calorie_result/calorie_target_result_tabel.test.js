import React from 'react';
import { shallow } from 'enzyme';
import CalorieTargetResultTable from './../../../src/components/calorie_result/calorie_target_result_table';

describe('CalorieTargetResultTable test', () => {
  it('should render label with given properties', () => {
    const component = shallow(
      <CalorieTargetResultTable
        label="rest"
        calorieTarget={{
          rest: { calorie: 1500, protein: 100, fat: 50, carbohydrate: 100 }
        }}
      />
    );
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
