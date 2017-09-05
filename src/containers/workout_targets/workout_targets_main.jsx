import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import {
  setSelectedWorkoutTarget,
  openWorkoutModal
} from './../../store/actionCreators/app_action_creators';
import CardList from './../../components/workout_target/card_list';
import CreateButton from './../../components/create_button';

const WorkoutTargetsMainContainer = ({
  workoutTargets,
  openWorkoutModal,
  setSelectedWorkoutTarget
}) =>
  <div>
    <CardList
      editLink="/app/workouttargets/edit/"
      collection={workoutTargets.toJS()}
      onModalStateChange={openWorkoutModal}
      setSelectedItem={setSelectedWorkoutTarget}
    />
    <CreateButton link={`/app/workouttargets/create`} />
  </div>;

const mapStateToProps = state => {
  return {
    workoutTargets: state.getIn(['userDetails', 'workoutTargets']),
    selectedWorkoutTarget: state.getIn(['app', 'selectedWorkoutTarget'])
  };
};

WorkoutTargetsMainContainer.propTypes = {
  workoutTargets: ImmutablePropTypes.map.isRequired,
  openWorkoutModal: PropTypes.func.isRequired,
  setSelectedWorkoutTarget: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  setSelectedWorkoutTarget,
  openWorkoutModal
})(WorkoutTargetsMainContainer);

export {WorkoutTargetsMainContainer as PureWorkoutTargetsMainContainer }
