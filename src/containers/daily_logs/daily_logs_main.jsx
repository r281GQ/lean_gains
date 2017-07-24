import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Prompt } from 'react-router-dom';
import {
  SelectField,
  MenuItem,
  List,
  ListItem,
  Card,
  CardHeader,
  CardText,
  FloatingActionButton,
  FlatButton
} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as _ from 'lodash';
import moment from 'moment';
import CreateButton from './../../components/create_button';
import CreateButtonMinified from './../../components/create_button';
import ConfirmDelete from './../../components/confirm_delete';
import LoadingScreen from './../../components/loading';
import DateSelector from './../../components/date_selector';

import CardListDailyLog from './../../components/card_list_daily_log';

import isTodaysLogExists from './../../store/selectors/todays_log';
import {
  getDailyLogDates,
  getLogsForSelectedMonth,
  deleteDailyLog
} from './../../store/actionCreators/daily_log_action_creators';
import {
  setSelectedMonthForDailyLogs,
  closeWorkoutModal,
  openWorkoutModal,
  setSelectedDailyLog
} from './../../store/actionCreators/app_action_creators';

import monthLogs from './../../store/selectors/month_log';

import logsForMonth from './../../store/selectors/log_selector';

const dailyLogsForMonth = logsForMonth('dailyLogs');
const isTodaysDailyLogExists = isTodaysLogExists('dailyLogs');
const monthsWithDailyLogs = monthLogs('dailyLogs');

class DailyLogPicker extends Component {
  componentWillMount = () => {
    if (this.props.datesWithDailyLogs.isEmpty()) this.props.getDailyLogDates();
    if (this.props.dailyLogsForMonth.isEmpty())
      this.props.getLogsForSelectedMonth(moment().format('MM-YYYY'));
    this.props.setSelectedMonthForDailyLogs(
      this.props.monthsWithDailyLogs.last()
    );
  };

  componentWillReceiveProps = nextProps =>
    (this.props.monthsWithDailyLogs.isEmpty() &&
      !nextProps.monthsWithDailyLogs.isEmpty()) ||
    nextProps.monthsWithDailyLogs.find(
      value => value === this.props.selectedMonth
    ) === undefined
      ? this.props.setSelectedMonthForDailyLogs(
          nextProps.monthsWithDailyLogs.last()
        )
      : null;

  render() {
    console.log(this.props);
    const {
      getLogsForSelectedMonth,
      selectedMonth,
      monthsWithDailyLogs,
      setSelectedMonthForDailyLogs,
      logs,
      deleteDailyLog
    } = this.props;
    return (
      <div>

        <DateSelector
          months={monthsWithDailyLogs.toJS()}
          selectedMonth={selectedMonth}
          fetchDataForSelectedMonth={getLogsForSelectedMonth}
          setSelectedMonth={setSelectedMonthForDailyLogs}
        />

        <CardListDailyLog
          collection={this.props.dailyLogsForMonth.toJS()}
          onModalStateChange={this.props.openWorkoutModal}
          setSelectedItem={this.props.setSelectedDailyLog}
        />

        <CreateButtonMinified link="/app/dailylogs/create/before" />
        <CreateButton
          link="/app/dailylogs/create"
          disabled={this.props.isTodaysDailyLogExists}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    datesWithDailyLogs: state.getIn(['dailyLogs', 'dates']),
    selectedMonth: state.getIn(['app', 'selectedMonthForDailyLogs']),
    isTodaysDailyLogExists: isTodaysDailyLogExists(state),
    monthsWithDailyLogs: monthsWithDailyLogs(state),
    dailyLogsForMonth: dailyLogsForMonth(state)
  };
};

const mapDispatchToProps = dispatch => ({
  openWorkoutModal: () => dispatch(openWorkoutModal()),
  setSelectedMonthForDailyLogs: month =>
    dispatch(setSelectedMonthForDailyLogs(month)),
  getDailyLogDates: () => dispatch(getDailyLogDates()),
  deleteDailyLog: _id => dispatch(deleteDailyLog(_id)),
  setSelectedDailyLog: _id => dispatch(setSelectedDailyLog(_id)),
  getLogsForSelectedMonth: month => dispatch(getLogsForSelectedMonth())
});

export default connect(mapStateToProps, mapDispatchToProps)(DailyLogPicker);
