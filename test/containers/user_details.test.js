import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { Map } from 'immutable';

import { PureUserDetailsContainer } from './../../src/containers/user_details';

describe('UserDetails test', () => {
  let dateStub;
  beforeEach(() => {
    dateStub = sinon.stub(Date, 'now').returns(1);
  });

  afterEach(() => {
    dateStub.restore();
  });

  it('should render', () => {
    const updateUserDetailsSpy = sinon.spy();

    const component = shallow(
      <PureUserDetailsContainer
        updateUserDetails={updateUserDetailsSpy}
        handleSubmit={() => value => value}
      />
    );

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should updateUserDetailsSpy be callod when _handleFormSubmit invoked', () => {
    const updateUserDetailsSpy = sinon.spy();

    const component = shallow(
      <PureUserDetailsContainer
        updateUserDetails={updateUserDetailsSpy}
        handleSubmit={() => value => value}
      />
    );

    component.instance()._handleFormSubmit(Map());

    expect(updateUserDetailsSpy.calledOnce).toBe(true);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
