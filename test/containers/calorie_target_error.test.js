import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon'
import {PureCalorieTargetError} from './../../src/containers/calorie_target_error';

describe('CalorieTargetError test', () => {
  it('should render', () => {
    const openErrorModalSpy = sinon.spy();
    const setMessagesSpy = sinon.spy();

    const component = shallow(
      <PureCalorieTargetError
        openErrorModal={openErrorModalSpy}
        setMessages={setMessagesSpy}


      />
    );


    component.instance()._handleOpenErrorModal();

    expect(openErrorModalSpy.calledOnce).toBe(true)
    expect(setMessagesSpy.calledOnce).toBe(true)

    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
