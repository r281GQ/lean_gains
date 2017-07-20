import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

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
import monthsWithWorkoutLogs from './../../store/selectors/month_workout_log';
import workoutLogsForMonth from './../../store/selectors/workout_log_selector';
import isTodaysWorkoutLogExists from './../../store/selectors/today_log';

import CreateButton from './../../components/create_button';
import CreateButtonMinified from './../../components/create_button_minified';
import ConfirmDelete from './../../components/confirm_delete';
import CardListLog from './../../components/card_list_log';
import DateSelector from './../../components/date_selector';
import LoadingScreen from './../../components/loading';

const renderMainScreen = ({
  monthsWithWorkoutLogs,
  selectedMonth,
  getWorkoutLogsForMonth,
  setSelectedMonthForWorkoutLogs,
  isModalOpen,
  closeWorkoutModal,
  deleteWorkoutLog,
  workoutLogsForMonth,
  setSelectedWorkoutLog,
  openWorkoutModal,
  isTodaysWorkoutLogExists,
  selectedWorkoutLog
}) =>
  <div>
    <DateSelector
      months={monthsWithWorkoutLogs.toJS()}
      selectedMonth={selectedMonth}
      fetchDataForSelectedMonth={getWorkoutLogsForMonth}
      setSelectedMonth={setSelectedMonthForWorkoutLogs}
    />

    <ConfirmDelete
      title="Sure you want to delete this log?"
      isOpen={isModalOpen}
      close={closeWorkoutModal}
      deleteActions={[() => deleteWorkoutLog(selectedWorkoutLog)]}
    />

    <CardListLog
      workoutLogs={workoutLogsForMonth.toJS()}
      editLink="/workoutlogs/edit/"
      setSelectedItem={setSelectedWorkoutLog}
      onModalStateChange={openWorkoutModal}
    />

    <CreateButtonMinified link="/workoutlogs/create/before" />

    <CreateButton link="/workoutlogs/create" disabled={isTodaysWorkoutLogExists} />
  </div>;

class WorkoutLogsMainContainer extends PureComponent {
  componentWillMount = () => {
    if (this.props.datesWithWorkoutLogs.isEmpty())
      this.props.getWorkoutLogDates();
    if (this.props.workoutLogsForMonth.isEmpty())
      this.props.getWorkoutLogsForMonth(moment().format('MM-YYYY'));
    this.props.setSelectedMonthForWorkoutLogs(
      this.props.monthsWithWorkoutLogs.last()
    );
  };

  componentWillReceiveProps = (nextProps, nextState) =>
    this.props.monthsWithWorkoutLogs.isEmpty()
      ? this.props.setSelectedMonthForWorkoutLogs(
          nextProps.monthsWithWorkoutLogs.last()
        )
      : null;

  render = () =>
    this.props.isLoading ? <LoadingScreen /> : renderMainScreen(this.props);
}

const mapStateToProps = state => ({
  isLoading: state.getIn(['app', 'isLoading']),
  monthsWithWorkoutLogs: monthsWithWorkoutLogs(state),
  isTodaysWorkoutLogExists: isTodaysWorkoutLogExists(state),
  workoutLogsForMonth: workoutLogsForMonth(state),
  datesWithWorkoutLogs: state.getIn(['workoutLogs', 'dates']),
  selectedMonth: state.getIn(['app', 'selectedMonthForWorkoutLogs']),
  isModalOpen: state.getIn(['app', 'isWorkoutLogModalOpen']),
  selectedWorkoutLog: state.getIn(['app', 'selectedWorkoutLog'])
});

const mapDispatchToProps = dispatch => ({
  getWorkoutLogsForMonth: month => dispatch(getWorkoutLogsForMonth(month)),
  getWorkoutLogDates: () => dispatch(getWorkoutLogDates()),
  setSelectedMonthForWorkoutLogs: month =>
    dispatch(setSelectedMonthForWorkoutLogs(month)),
  deleteWorkoutLog: _id => dispatch(deleteWorkoutLog(_id)),
  openWorkoutModal: () => dispatch(openWorkoutModal()),
  closeWorkoutModal: () => dispatch(closeWorkoutModal()),
  setSelectedWorkoutLog: _id => dispatch(setSelectedWorkoutLog(_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  WorkoutLogsMainContainer
);
