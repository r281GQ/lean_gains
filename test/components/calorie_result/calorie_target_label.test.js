import React from 'react';
import { shallow } from 'enzyme';
import CalorieTargetLabel from './../../../src/components/calorie_result/calore_target_label';

describe('CalorieTargetLabel test', () => {
  it('should render', () => {
    const component = shallow(
      <CalorieTargetLabel
        label="rest"
        calorieTarget={{ rest: { calorie: 1000 }, training: { calorie: 1500 } }}
      />
    );
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
