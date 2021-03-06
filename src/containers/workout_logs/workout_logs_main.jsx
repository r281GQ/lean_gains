import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import {
  setSelectedMonthForWorkoutLogs,
  openWorkoutModal,
  closeWorkoutModal,
  setSelectedWorkoutLog
} from './../../store/actionCreators/app_action_creators';
import {
  getWorkoutLogsForMonth,
  deleteWorkoutLog,
  getWorkoutLogDates
} from './../../store/actionCreators/workout_log_action_creators';
import monthLogs from './../../store/selectors/month_log';
import logsForMonth from './../../store/selectors/log_selector';
import isTodaysLogExists from './../../store/selectors/todays_log';

import CreateButton from './../../components/create_button';
import CreateButtonMinified from './../../components/create_button_minified';
import CardListLog from './../../components/workout_log/card_list_log';
import DateSelector from './../../components/date_selector';

import typedDeleteModal from './../enhancers/confirm_delete_modal';

const isTodaysWorkoutLogExists = isTodaysLogExists('workoutLogs');
const workoutLogsForMonth = logsForMonth('workoutLogs');
const monthsWithWorkoutLogs = monthLogs('workoutLogs');

class WorkoutLogsMainContainer extends PureComponent {
  componentDidMount() {
    this.props.getWorkoutLogsForMonth(this.props.monthsWithWorkoutLogs.last());
    this.props.setSelectedMonthForWorkoutLogs(
      this.props.monthsWithWorkoutLogs.last()
    );
  }

  componentWillReceiveProps(nextProps) {
    if (
      (this.props.monthsWithWorkoutLogs.isEmpty() &&
        !nextProps.monthsWithWorkoutLogs.isEmpty()) ||
      nextProps.monthsWithWorkoutLogs.find(
        value => value === this.props.selectedMonth
      ) === undefined
    ) {
      this.props.getWorkoutLogsForMonth(nextProps.monthsWithWorkoutLogs.last());
      this.props.setSelectedMonthForWorkoutLogs(
        nextProps.monthsWithWorkoutLogs.last()
      );
    }

  }

  render() {
    const {
      monthsWithWorkoutLogs,
      selectedMonth,
      getWorkoutLogsForMonth,
      setSelectedMonthForWorkoutLogs,
      workoutLogsForMonth,
      setSelectedWorkoutLog,
      openWorkoutModal,
      isTodaysWorkoutLogExists
    } = this.props;
    const DeleteModal = typedDeleteModal(
      'Are you sure you want to delete this?',
      'workoutLog'
    );
    return (
      <div>
        <DeleteModal />

        <DateSelector
          months={monthsWithWorkoutLogs.toJS()}
          selectedMonth={selectedMonth}
          fetchDataForSelectedMonth={getWorkoutLogsForMonth}
          setSelectedMonth={setSelectedMonthForWorkoutLogs}
        />

        <CardListLog
          workoutLogs={workoutLogsForMonth.toJS()}
          editLink="/app/workoutlogs/edit/"
          setSelectedItem={setSelectedWorkoutLog}
          onModalStateChange={openWorkoutModal}
        />

        <CreateButtonMinified link="/app/workoutlogs/create/before" />

        <CreateButton
          link="/app/workoutlogs/create"
          disabled={isTodaysWorkoutLogExists}
        />
      </div>
    );
  }
}

WorkoutLogsMainContainer.propTypes = {
  getWorkoutLogDates: PropTypes.func.isRequired,
  datesWithWorkoutLogs: ImmutablePropTypes.set,
  monthsWithWorkoutLogs: ImmutablePropTypes.set,
  selectedMonth: PropTypes.string,
  getWorkoutLogsForMonth: PropTypes.func.isRequired,
  setSelectedMonthForWorkoutLogs: PropTypes.func.isRequired,
  workoutLogsForMonth: ImmutablePropTypes.map,
  setSelectedWorkoutLog: PropTypes.func.isRequired,
  openWorkoutModal: PropTypes.func.isRequired,
  isTodaysWorkoutLogExists: PropTypes.bool
};

const mapStateToProps = state => ({
  monthsWithWorkoutLogs: monthsWithWorkoutLogs(state),
  isTodaysWorkoutLogExists: isTodaysWorkoutLogExists(state),
  workoutLogsForMonth: workoutLogsForMonth(state),
  datesWithWorkoutLogs: state.getIn(['workoutLogs', 'dates']),
  selectedMonth: state.getIn(['app', 'selectedMonthForWorkoutLogs']),
  isModalOpen: state.getIn(['app', 'isConfirmDeleteModalOpen']),
  selectedWorkoutLog: state.getIn(['app', 'selectedWorkoutLog'])
});

export default connect(mapStateToProps, {
  getWorkoutLogsForMonth,
  getWorkoutLogDates,
  setSelectedMonthForWorkoutLogs,
  deleteWorkoutLog,
  openWorkoutModal,
  closeWorkoutModal,
  setSelectedWorkoutLog
})(WorkoutLogsMainContainer);

export { WorkoutLogsMainContainer as PureWorkoutLogsMainContainer };
