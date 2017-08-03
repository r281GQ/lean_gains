import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  setSelectedWorkoutTarget,
  openWorkoutModal,
  closeWorkoutModal
} from './../../store/actionCreators/app_action_creators';
import { deleteWorkoutTarget } from './../../store/actionCreators/user_details_action_creators';
import CardList from './../../components/workout_target/card_list';
import CreateButton from './../../components/create_button';
import ConfirmDelete from './../../components/confirm_delete';
import LoadingScreen from './../../components/loading';

const renderMainScreen = ({
  isModalOpen,
  closeWorkoutModal,
  deleteWorkoutTarget,
  selectedWorkoutTarget,
  workoutTargets,
  openWorkoutModal,
  setSelectedWorkoutTarget
}) =>
  <div>
    <ConfirmDelete
      title="Sure you want to delete this workout?"
      isOpen={isModalOpen}
      close={closeWorkoutModal}
      deleteActions={[
        () => deleteWorkoutTarget(selectedWorkoutTarget)
      ]}
    />

    <CardList
      editLink="/app/workouttargets/edit/"
      collection={workoutTargets.toJS()}
      onModalStateChange={openWorkoutModal}
      setSelectedItem={setSelectedWorkoutTarget}
    />

    <CreateButton link={`/app/workouttargets/create`} />
  </div>;

class WorkoutTargetsMainContainer extends PureComponent {
  render = () =>
    this.props.isLoading ? <LoadingScreen /> : renderMainScreen(this.props);
}

const mapStateToProps = state => {
  return {
    isLoading: state.getIn(['app', 'isLoading']),
    workoutTargets: state.getIn(['userDetails', 'workoutTargets']),
    isModalOpen: state.getIn(['app', 'isConfirmDeleteModalOpen']),
    selectedWorkoutTarget: state.getIn(['app', 'selectedWorkoutTarget'])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSelectedWorkoutTarget: _id => dispatch(setSelectedWorkoutTarget(_id)),
    openWorkoutModal: () => dispatch(openWorkoutModal()),
    closeWorkoutModal: () => dispatch(closeWorkoutModal()),
    deleteWorkoutTarget: _id => dispatch(deleteWorkoutTarget(_id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  WorkoutTargetsMainContainer
);
