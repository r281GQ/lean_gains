import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';

import { PureWorkoutTargetsMainContainer } from './../../../src/containers/workout_targets/workout_targets_main';

describe('WorkoutTargetsMain test', () => {
  it('should render', () => {
    const component = shallow(
      <PureWorkoutTargetsMainContainer
        workoutTargets={Map()}
        openWorkoutModal={() => undefined}
        setSelectedWorkoutTarget={() => undefined}
      />
    );
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
