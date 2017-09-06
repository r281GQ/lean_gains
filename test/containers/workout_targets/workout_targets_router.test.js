import React from 'react';
import { shallow } from 'enzyme';

import { PureWorkoutTargetsRouter } from './../../../src/containers/workout_targets/workout_targets_router';

describe('WorkoutTargetsRouter test', () => {
  it('should render', () => {
    const component = shallow(<PureWorkoutTargetsRouter />);
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
