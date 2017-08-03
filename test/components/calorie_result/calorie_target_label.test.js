import React from 'react';
import { shallow, render, mount } from 'enzyme';
import CalorieTargetLabel from './../../../src/components/calorie_result/calore_target_label';

describe('calorie_target_result', () => {
  it('label should be 0 when no label provided', () => {
    const component = shallow(<CalorieTargetLabel />);
    expect(component).toMatchSnapshot();
  });
  it('should render label', () => {
    const component = shallow(<CalorieTargetLabel value="label" />);
    expect(component).toMatchSnapshot();
  });
});
