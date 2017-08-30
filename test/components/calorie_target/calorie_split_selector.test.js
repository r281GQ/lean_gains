import React from 'react';
import { shallow } from 'enzyme';
import CalorieSplitSelector from './../../../src/components/calorie_target/calorie_split_selector';

describe('CalorieSplitSelector test', () => {
  it('should render', () => {
    const component = shallow(
      <CalorieSplitSelector/>
    );
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
