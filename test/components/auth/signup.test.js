import React from 'react';
import { shallow, render, mount } from 'enzyme';
import SignUp from './../../../src/components/auth/signup';

describe('calorie_target_result_sum_label', () => {
  it('should render', () => {
    const component = shallow(
      <SignUp
        signUpHandler={value => value}
        validateEmail={value => value}
        validatePasswordAgain={value => value}
      />
    );
    expect(component).toHaveLength(1);
  });
});
