import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { PureUserDetailsContainer } from './../../src/containers/user_details';

describe('Header test', () => {
  it('should render', () => {
    const updateUserDetailsSpy = sinon.spy();
    const dateStub = sinon.stub(Date, 'now').returns(1);
    const component = shallow(
      <PureUserDetailsContainer
        updateUserDetails={updateUserDetailsSpy}
        handleSubmit={() => func => func}
      />
    );
    expect(component.instance()._normalizeDate()).toBeInstanceOf(Function);

    component.instance()._handleFormSubmit({ get: () => undefined });

    expect(updateUserDetailsSpy.calledOnce).toBe(true);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
    dateStub.restore();
  });
});
