import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Map } from 'immutable';

import WorkoutLogsMainContainer from './workout_logs_main';
import WorkoutLogFormContainer from './workout_log_form';
import isTrainingDay from './../../store/selectors/exercises';

class WorkoutLogsRouter extends PureComponent {
  constructor(props) {
    super(props);
    this._mapExercisesToCreateForm = this._mapExercisesToCreateForm.bind(this);
    this._mapExercisesToEditForm = this._mapExercisesToEditForm.bind(this);
  }

  _mapExercisesToCreateForm(exercises) {
    return exercises.map(value =>
      Map().withMutations(map =>
        map
          .set(
            'name',
            value !== 'You do not have any exercise for today' ? value : ''
          )
          .set('note', '')
          .set('marker', false)
          .set('sets', Map())
      )
    );
  }

  _mapExercisesToEditForm(workoutLogs, props) {
    return workoutLogs.find((value, key) => props.match.params.id === key);
  }

  render() {
    const { exercises, workoutLogs } = this.props;
    return (
      <div>
        <Route
          exact
          path={'/app/workoutlogs'}
          component={WorkoutLogsMainContainer}
        />

        <Route
          exact
          path={'/app/workoutlogs/create/before'}
          render={props => {
            return <WorkoutLogFormContainer {...props} />;
          }}
        />

        <Route
          exact
          path="/app/workoutlogs/edit/:id"
          render={props => (
            <WorkoutLogFormContainer
              {...props}
              defaultValue={this._mapExercisesToEditForm(
                workoutLogs,
                props
              )}
            />
          )}
        />

        <Route
          exact
          path={'/app/workoutlogs/create'}
          render={props => (
            <WorkoutLogFormContainer
              {...props}
              defaultValue={this._mapExercisesToCreateForm(exercises)}
            />
          )}
        />
      </div>
    );
  }
}

WorkoutLogsRouter.propTypes = {
  exercises: ImmutablePropTypes.list,
  workoutLogs: ImmutablePropTypes.map
};

export default connect(state => ({
  workoutLogs: state.getIn(['workoutLogs', 'data']),
  exercises: isTrainingDay('main')(state)
}))(WorkoutLogsRouter);

export {WorkoutLogsRouter as PureWorkoutLogsRouter}
