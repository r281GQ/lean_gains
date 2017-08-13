import React from 'react';
import { connect } from 'react-redux';

import ConfirmDelete from './../components/confirm_delete';
import { closeWorkoutModal } from './../store/actionCreators/app_action_creators';
import { deleteDailyLog } from './../store/actionCreators/daily_log_action_creators';
import { deleteWorkoutTarget } from './../store/actionCreators/user_details_action_creators';
import { deleteWorkoutLog } from './../store/actionCreators/workout_log_action_creators';

const withConfirmDeleteModal = (WrappedComponent, title, type) => {
  const getItemType = type => {
    switch (type) {
      case 'workoutTarget':
        return {
          selectedItem: 'selectedWorkoutTarget',
          deleteItem: deleteWorkoutTarget
        };
      case 'workoutLog':
        return {
          selectedItem: 'selectedWorkoutLog',
          deleteItem: deleteWorkoutLog
        };
      case 'dailyLog':
        return {
          selectedItem: 'selectedDailyLog',
          deleteItem: deleteDailyLog
        };
    }
  };

  const ConfirmDeleteModal = ({
    isModalOpen,
    closeModal,
    deleteItem,
    selectedItem
  }) => {
    console.log(selectedItem);
    return (<div>
      <ConfirmDelete
        title={title}
        isOpen={isModalOpen}
        close={closeModal}
        deleteActions={[() => deleteItem(selectedItem)]}
      />

      <WrappedComponent />
    </div>);
  }
    ;

  const mapStateToProps = state => {
    return {
      isModalOpen: state.getIn(['app', 'isConfirmDeleteModalOpen']),
      selectedItem: state.getIn(['app', getItemType(type).selectedItem])
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      deleteItem: _id => dispatch(getItemType(type).deleteItem(_id)),
      closeModal: () => dispatch(closeWorkoutModal())
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteModal);
};

export default withConfirmDeleteModal;
