import React from 'react';
import { shallow } from 'enzyme';

import Footer from './../../../src/containers/layout/footer';

describe('Header test', () => {
  it('should render', () => {
    const component = shallow(<Footer />);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
