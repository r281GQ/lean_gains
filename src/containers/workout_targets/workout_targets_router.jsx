import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Map, List } from 'immutable';

import WorkoutTarget from './workout_target';
import WorkoutTargetMain from './workout_targets_main';

const WorkoutTargetsRouter = ({ workoutTargets }) =>
  <div>
    <Route exact path={'/workouttargets/create'} component={WorkoutTarget} />

    <Route
      exact
      path={'/workouttargets/edit/:id'}
      render={props => {
        const selectedWorkoutTarget = workoutTargets.find(
          (value, key) => props.match.params.id === key
        );

        return (
          <WorkoutTarget
            {...props}
            defaultValue={selectedWorkoutTarget.toJS()}
          />
        );
      }}
    />

    <Route exact path={'/workouttargets'} component={WorkoutTargetMain} />
  </div>;

export default connect(state => ({
  workoutTargets: state.getIn(['userDetails', 'workoutTargets'])
}))(WorkoutTargetsRouter);
