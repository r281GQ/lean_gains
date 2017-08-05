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
import monthLogs from './../../store/selectors/month_log';
import logsForMonth from './../../store/selectors/log_selector';
import isTodaysLogExists from './../../store/selectors/todays_log';

import CreateButton from './../../components/create_button';
import CreateButtonMinified from './../../components/create_button_minified';
import ConfirmDelete from './../../components/confirm_delete';
import CardListLog from './../../components/workout_log/card_list_log';
import DateSelector from './../../components/date_selector';
import LoadingScreen from './../../components/loading';

const isTodaysWorkoutLogExists = isTodaysLogExists('workoutLogs');
const workoutLogsForMonth = logsForMonth('workoutLogs');
const monthsWithWorkoutLogs = monthLogs('workoutLogs');

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
  </div>;

class WorkoutLogsMainContainer extends PureComponent {
  componentDidMount = () => {
    if (this.props.datesWithWorkoutLogs.isEmpty())
      this.props.getWorkoutLogDates();
    if (this.props.workoutLogsForMonth.isEmpty()) {
      this.props.getWorkoutLogsForMonth(moment().format('MM-YYYY'));
      this.props.setSelectedMonthForWorkoutLogs(
        this.props.monthsWithWorkoutLogs.last()
      );
    }
  };

  componentWillReceiveProps = (nextProps, nextState) =>
    (this.props.monthsWithWorkoutLogs.isEmpty() &&
      !nextProps.monthsWithWorkoutLogs.isEmpty()) ||
    nextProps.monthsWithWorkoutLogs.find(
      value => value === this.props.selectedMonth
    ) === undefined
      ? this.props.setSelectedMonthForWorkoutLogs(
          nextProps.monthsWithWorkoutLogs.last()
        )
      : null;

  render = () => renderMainScreen(this.props);
}

const mapStateToProps = state => ({
  monthsWithWorkoutLogs: monthsWithWorkoutLogs(state),
  isTodaysWorkoutLogExists: isTodaysWorkoutLogExists(state),
  workoutLogsForMonth: workoutLogsForMonth(state),
  datesWithWorkoutLogs: state.getIn(['workoutLogs', 'dates']),
  selectedMonth: state.getIn(['app', 'selectedMonthForWorkoutLogs']),
  isModalOpen: state.getIn(['app', 'isConfirmDeleteModalOpen']),
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
