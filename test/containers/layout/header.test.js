import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { PureHeaderContainer } from './../../../src/containers/layout/header';

describe('Header test', () => {
  it('should render', () => {
    const openSideBarSpy = sinon.spy();
    const component = shallow(
      <PureHeaderContainer
        location={{ pathname: '' }}
        openSideBar={openSideBarSpy}
      />
    );

    component.instance()._handleOpenSideBar();

    expect(openSideBarSpy.calledOnce).toBe(true);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
