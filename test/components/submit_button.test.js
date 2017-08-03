import React from 'react';
import { shallow, render, mount } from 'enzyme';
import SubmitButton from './../../src/components/submit_button';

describe('calorie_target_result_sum_label', () => {
  it('should render label with given properties', () => {
    const component = shallow(<SubmitButton label="label given" />);
    expect(component).toHaveLength(1);
  });
});
