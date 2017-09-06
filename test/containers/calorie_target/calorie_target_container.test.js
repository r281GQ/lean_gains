import React from 'react';
import { shallow } from 'enzyme';

import CalorieTargetContainer from './../../../src/containers/calorie_target/calorie_target_container';

describe('CalorieTargetContainer test', () => {
  it('should render', () => {
    const component = shallow(
      <CalorieTargetContainer/>
    );
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
