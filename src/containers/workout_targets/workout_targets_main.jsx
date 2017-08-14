import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  setSelectedWorkoutTarget,
  openWorkoutModal
} from './../../store/actionCreators/app_action_creators';
import CardList from './../../components/workout_target/card_list';
import CreateButton from './../../components/create_button';

class WorkoutTargetsMainContainer extends PureComponent {
  render() {
    const {
      selectedWorkoutTarget,
      workoutTargets,
      openWorkoutModal,
      setSelectedWorkoutTarget
    } = this.props;
    return (
      <div>
        <CardList
          editLink="/app/workouttargets/edit/"
          collection={workoutTargets.toJS()}
          onModalStateChange={openWorkoutModal}
          setSelectedItem={setSelectedWorkoutTarget}
        />
        <CreateButton link={`/app/workouttargets/create`} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    workoutTargets: state.getIn(['userDetails', 'workoutTargets']),
    selectedWorkoutTarget: state.getIn(['app', 'selectedWorkoutTarget'])
  };
};

export default connect(mapStateToProps, {
  setSelectedWorkoutTarget,
  openWorkoutModal
})(WorkoutTargetsMainContainer);
