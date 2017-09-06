import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import { PureSideBarContainer } from './../../../src/containers/layout/side_bar';

describe('SideBar test', () => {
  it('should render', () => {
    const logOutSpy = sinon.spy();
    const closeSideBarSpy = sinon.spy();
    const component = shallow(
      <PureSideBarContainer logOut={logOutSpy} closeSideBar={closeSideBarSpy} />
    );

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should call logOutSpy & closeSideBarSpy', () => {
    const logOutSpy = sinon.spy();
    const closeSideBarSpy = sinon.spy();
    const component = shallow(
      <PureSideBarContainer logOut={logOutSpy} closeSideBar={closeSideBarSpy} />
    );

    component.instance()._handleLogOut();
    component.instance()._handleCloseSideBar();

    expect(closeSideBarSpy.calledOnce).toBe(true);
    expect(logOutSpy.calledOnce).toBe(true);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
