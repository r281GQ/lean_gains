import React from 'react';
import { shallow } from 'enzyme';
import { PureMainContainer } from './../../src/containers/main';

describe('Main test', () => {
  it('should render', () => {
    const component = shallow(<PureMainContainer />);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
