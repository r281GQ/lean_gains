import React from 'react';
import { shallow } from 'enzyme';
import App from './../../src/containers/app';

describe('App test', () => {
  it('should render', () => {
    const component = shallow(
      <App/>
    );
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
