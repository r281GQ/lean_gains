import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import WorkoutTarget from './workout_target';
import WorkoutTargetMain from './workout_targets_main';

//TODO: use HOC for modal
const WorkoutTargetsRouter = ({ workoutTargets }) =>
  <div>
    <Route
      exact
      path={'/app/workouttargets/create'}
      component={WorkoutTarget}
    />

    <Route
      exact
      path={'/app/workouttargets/edit/:id'}
      render={props => {
        const selectedWorkoutTarget = workoutTargets.find(
          (value, key) => props.match.params.id === key
        );

        return (
          <WorkoutTarget {...props} defaultValue={selectedWorkoutTarget} />
        );
      }}
    />

    <Route exact path={'/app/workouttargets'} component={WorkoutTargetMain} />
  </div>;

export default connect(state => ({
  workoutTargets: state.getIn(['userDetails', 'workoutTargets'])
}))(WorkoutTargetsRouter);
