import React from 'react';
import { shallow } from 'enzyme';
import ActivityLevelSelector from './../../../src/components/calorie_target/activity_level_selector';

describe('ActivityLevelSelector test', () => {
  it('should render', () => {
    const component = shallow(
      <ActivityLevelSelector/>
    );
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
