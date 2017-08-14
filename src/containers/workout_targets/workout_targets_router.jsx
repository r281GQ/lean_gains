import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import WorkoutTarget from './workout_target';
import WorkoutTargetMain from './workout_targets_main';
import withConfirmDeleteModal from './../enhancers/confirm_delete_modal';

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
      render={props =>
        <WorkoutTarget
          {...props}
          defaultValue={workoutTargets.find(
            (value, key) => props.match.params.id === key
          )}
        />}
    />

    <Route
      exact
      path={'/app/workouttargets'}
      component={withConfirmDeleteModal(
        WorkoutTargetMain,
        `Are you sure you want to delete this workout target?`,
        'workoutTarget'
      )}
    />
  </div>;

export default connect(state => ({
  workoutTargets: state.getIn(['userDetails', 'workoutTargets'])
}))(WorkoutTargetsRouter);
