import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import moment from 'moment';

import CreateButton from './../../components/create_button';
import CreateButtonMinified from './../../components/create_button_minified';
import ConfirmDelete from './../../components/confirm_delete';
import LoadingScreen from './../../components/loading';
import DateSelector from './../../components/date_selector';
import CardListDailyLog from './../../components/daily_log/card_list_daily_log';
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

class DailyLogMain extends PureComponent {
  componentDidMount() {
    if (this.props.datesWithDailyLogs.isEmpty()) this.props.getDailyLogDates();
    if (this.props.dailyLogsForMonth.isEmpty()) {
      this.props.getLogsForSelectedMonth(moment().format('MM-YYYY'));
      this.props.setSelectedMonthForDailyLogs(
        this.props.monthsWithDailyLogs.last()
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      (this.props.monthsWithDailyLogs.isEmpty() &&
        !nextProps.monthsWithDailyLogs.isEmpty()) ||
      nextProps.monthsWithDailyLogs.find(
        value => value === this.props.selectedMonth
      ) === undefined
    )
      this.props.setSelectedMonthForDailyLogs(
        nextProps.monthsWithDailyLogs.last()
      );
  }

  render() {
    const {
      getLogsForSelectedMonth,
      selectedMonth,
      monthsWithDailyLogs,
      setSelectedMonthForDailyLogs,
      logs,
      deleteDailyLog,
      isTodaysDailyLogExists,
      setSelectedDailyLog,
      openWorkoutModal,
      dailyLogsForMonth
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
          collection={dailyLogsForMonth.toJS()}
          onModalStateChange={openWorkoutModal}
          setSelectedItem={setSelectedDailyLog}
        />

        <CreateButtonMinified link="/app/dailylogs/create/before" />
        <CreateButton
          link="/app/dailylogs/create"
          disabled={isTodaysDailyLogExists}
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

export default connect(mapStateToProps, {
  getDailyLogDates,
  deleteDailyLog,
  setSelectedDailyLog,
  getLogsForSelectedMonth,
  openWorkoutModal,
  setSelectedMonthForDailyLogs
})(DailyLogMain);
