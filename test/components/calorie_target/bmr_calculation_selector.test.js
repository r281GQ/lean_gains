import React from 'react';
import { shallow } from 'enzyme';
import BMRCalculationSelector from './../../../src/components/calorie_target/bmr_calculation_selector';

describe('BMRCalculationSelector test', () => {
  it('should render', () => {
    const component = shallow(<BMRCalculationSelector />);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
