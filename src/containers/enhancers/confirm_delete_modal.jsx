import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ConfirmDelete from './../../components/confirm_delete';
import { closeWorkoutModal } from './../../store/actionCreators/app_action_creators';
import { deleteDailyLog } from './../../store/actionCreators/daily_log_action_creators';
import { deleteWorkoutTarget } from './../../store/actionCreators/user_details_action_creators';
import { deleteWorkoutLog } from './../../store/actionCreators/workout_log_action_creators';

const withConfirmDeleteModal = ( title, type) => {
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

  const ConfirmDeleteModal = props => {
    return (
      <div>
        <ConfirmDelete
          title={title}
          isOpen={props.isModalOpen}
          close={props.closeModal}
          deleteActions={[() => props.deleteItem(props.selectedItem)]}
        />
      </div>
    );
  };
  ConfirmDeleteModal.propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    selectedItem: PropTypes.string
  };

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
