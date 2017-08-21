import React from 'react';
import { shallow } from 'enzyme';
import CalorieTargetResultSumLabel from './../../../src/components/calorie_result/calorie_target_result_sum_label';

describe('CalorieTargetResultSumLabel test', () => {
  it('should render', () => {
    const component = shallow(<CalorieTargetResultSumLabel />);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
