import { shallow } from 'enzyme';
import React from 'react';
import Header from './../../src/containers/header';

describe('Header container', () => {
  it('should render', () => {
    let name = 'tag';

    const mockClickHandler = jest.fn(bf => name = 'another');

    const wrapper = shallow(<Header label={name} clickHandler={mockClickHandler}/>)
    expect(wrapper.instance().props.label).toEqual('tag');

    // expect(wrapper).toMatchSnapshot();
    wrapper.find('button').simulate('click');
    const changed = shallow(<Header label={name} clickHandler={mockClickHandler}/>)
    expect(mockClickHandler).toBeCalled();
    expect(changed.instance().props.label).toEqual('another');
  });
});
