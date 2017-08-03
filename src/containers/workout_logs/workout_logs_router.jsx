import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Map } from 'immutable';
import moment from 'moment';

import WorkoutLogsMainContainer from './workout_logs_main';
import WorkoutLogFormContainer from './workout_log_form';
import isTrainingDay from './../../store/selectors/exercises';

import withConfirmDeleteModal from './../confirm_delete_modal';

const deleteMessage = `Are you sure you want to delete this workout log?`;

//TODO: use HOC for modal
const WorkoutLogsRouter = ({ exercises, workoutLogs, dispatch }) =>
  <div>
    <Route
      exact
      path={'/app/workoutlogs'}
      component={withConfirmDeleteModal(
        WorkoutLogsMainContainer,
        deleteMessage,
        'workoutLog'
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
          .get('exercises');

        return (
          <WorkoutLogFormContainer
            {...props}
            defaultValue={defaultValue}
            type={`edit`}
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
              .set('name', value)
              .set('note', '')
              .set('marker', false)
              .set('sets', Map())
          )
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

export default connect(state => ({
  workoutLogs: state.getIn(['workoutLogs', 'data']),
  exercises: isTrainingDay('main')(state)
}))(WorkoutLogsRouter);
