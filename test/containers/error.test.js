import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { PureError } from './../../src/containers/error';
import { List } from 'immutable';

describe('Error test', () => {
  it('should render', () => {
    const closeErrorModalSpy = sinon.spy();
    const unSetMessagesSpy = sinon.spy();

    const component = shallow(
      <PureError
        errorMessages={List().push('test')}
        isErrorModalOpen={false}
        closeErrorModal={closeErrorModalSpy}
        unSetMessages={unSetMessagesSpy}
      />
    );

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should call closeErrorModalSpy & unSetMessagesSpy on modalClose', () => {
    const closeErrorModalSpy = sinon.spy();
    const unSetMessagesSpy = sinon.spy();

    const component = shallow(
      <PureError
        errorMessages={List().push('test')}
        isErrorModalOpen={false}
        closeErrorModal={closeErrorModalSpy}
        unSetMessages={unSetMessagesSpy}
      />
    );

    component.instance()._handleModalClose();

    expect(closeErrorModalSpy.calledOnce).toBe(true);
    expect(unSetMessagesSpy.calledOnce).toBe(true);

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
