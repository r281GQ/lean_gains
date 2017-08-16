import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Map } from 'immutable';

import WorkoutLogsMainContainer from './workout_logs_main';
import WorkoutLogFormContainer from './workout_log_form';
import isTrainingDay from './../../store/selectors/exercises';

import withConfirmDeleteModal from './../enhancers/confirm_delete_modal';

const WorkoutLogsRouter = ({ exercises, workoutLogs }) =>
  <div>
    <Route
      exact
      path={'/app/workoutlogs'}
      component={withConfirmDeleteModal(
        WorkoutLogsMainContainer,
        `Are you sure you want to delete this workout log?`,
        'workoutLog',
      )}
    />

    <Route
      exact
      path={'/app/workoutlogs/create/before'}
      render={props => {
        return <WorkoutLogFormContainer {...props} type={`createBefore`} />;
      }}
    />

    <Route
      exact
      path="/app/workoutlogs/edit/:id"
      render={props => {
        const defaultValue = workoutLogs
          .find((value, key) => props.match.params.id === key)
          // .get('exercises');
;
        return (
          <WorkoutLogFormContainer
            {...props}
            defaultValue={defaultValue}

          />
        );
      }}
    />

    <Route
      exact
      path={'/app/workoutlogs/create'}
      render={props => {
        const defaultValue = exercises.map(value =>
          Map().withMutations(map =>
            map
              .set(
                'name',
                value !== 'You do not have any exercise for today' ? value : '',
              )
              .set('note', '')
              .set('marker', false)
              .set('sets', Map()),
          ),
        );

        return (
          <WorkoutLogFormContainer
            {...props}
            type={`create`}
            defaultValue={defaultValue}
          />
        );
      }}
    />
  </div>;

WorkoutLogsRouter.propTypes = {
  exercises: ImmutablePropTypes.list,
  workoutLogs: ImmutablePropTypes.map,
};

export default connect(state => ({
  workoutLogs: state.getIn(['workoutLogs', 'data']),
  exercises: isTrainingDay('main')(state),
}))(WorkoutLogsRouter);
