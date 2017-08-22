import React from 'react';
import { shallow } from 'enzyme';
import LogIn from './../../../src/components/auth/login';

describe('calorie_target_result_sum_label', () => {
  it('should render', () => {
    const component = shallow(
      <LogIn validateEmail={value => value} handleSubmit={value => value} />
    );
    expect(component).toHaveLength(1);
  });
});
