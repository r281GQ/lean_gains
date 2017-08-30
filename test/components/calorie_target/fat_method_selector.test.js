import React from 'react';
import { shallow } from 'enzyme';
import FatMethodSelector from './../../../src/';

describe('FatMethodSelector test', () => {
  it('should render', () => {
    const component = shallow(
      <FatMethodSelector/>
    );
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
