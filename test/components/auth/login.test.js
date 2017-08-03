import React from 'react';
import { shallow, render, mount } from 'enzyme';
import SignUp from './../../src/components/auth/logIn';

describe('calorie_target_result_sum_label', () => {
  it('should render', () => {
    const component = shallow(
      <Login
        validateEmail={value => value}
        loginHandler={value => value}
      />
    );
    expect(component).toHaveLength(1);
  });
});