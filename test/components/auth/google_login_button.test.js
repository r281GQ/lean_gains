import React from 'react';
import { shallow } from 'enzyme';
import GoogleLoginButton from './../../../src/components/auth/google_login_button';

describe('GoogleLoginButton test', () => {
  it('should render', () => {
    const component = shallow(<GoogleLoginButton />);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
