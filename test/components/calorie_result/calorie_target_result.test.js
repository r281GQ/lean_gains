import React from 'react';
import { shallow } from 'enzyme';
import CalorieTargetResult from './../../../src/components/calorie_result/calorie_target_result';

describe('CalorieTargetResult test', () => {
  it('should render', () => {
    const component = shallow(<CalorieTargetResult />);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
