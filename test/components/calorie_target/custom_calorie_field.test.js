import React from 'react';
import { shallow } from 'enzyme';
import CustomCalorieField from './../../../src/components/calorie_target/custom_calorie_field';

describe('CustomCalorieField test', () => {
  it('should render', () => {
    const component = shallow(
      <CustomCalorieField normalize={value => value} />
    );
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
