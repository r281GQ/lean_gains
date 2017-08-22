import React from 'react';
import { shallow } from 'enzyme';
import SubmitButton from './../../src/components/submit_button';

describe('SubmitButton test', () => {
  it('should render label with given properties', () => {
    const component = shallow(<SubmitButton label="label given" />);
    expect(component).toHaveLength(1);
  });
});
