import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import CreateButton from './../../components/create_button';
import CreateButtonMinified from './../../components/create_button_minified';
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
  openWorkoutModal,
  setSelectedDailyLog
} from './../../store/actionCreators/app_action_creators';
import monthLogs from './../../store/selectors/month_log';
import logsForMonth from './../../store/selectors/log_selector';

const dailyLogsForMonth = logsForMonth('dailyLogs');
const isTodaysDailyLogExists = isTodaysLogExists('dailyLogs');
const monthsWithDailyLogs = monthLogs('dailyLogs');

import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import typedDeleteModal from './../enhancers/confirm_delete_modal';

const DeleteModal = typedDeleteModal(
  'Are you sure you want to delete this?',
  'dailyLog'
);

//TODO: refactor these to be more declarative
class DailyLogMain extends PureComponent {
  componentDidMount() {
      this.props.getLogsForSelectedMonth(this.props.monthsWithDailyLogs.last());
      this.props.setSelectedMonthForDailyLogs(
        this.props.monthsWithDailyLogs.last()
      );
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

    // if (this.props.datesWithDailyLogs !== nextProps.datesWithDailyLogs)
    //   this.props.getLogsForSelectedMonth(nextProps.selectedMonth);
  }

  render() {
    const {
      getLogsForSelectedMonth,
      selectedMonth,
      monthsWithDailyLogs,
      setSelectedMonthForDailyLogs,
      isTodaysDailyLogExists,
      setSelectedDailyLog,
      openWorkoutModal,
      dailyLogsForMonth
    } = this.props;
    return (
      <div>
        <DeleteModal />
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

DailyLogMain.propTypes = {
  datesWithDailyLogs: ImmutablePropTypes.set,
  getDailyLogDates: PropTypes.func,
  dailyLogsForMonth: ImmutablePropTypes.map,
  getLogsForSelectedMonth: PropTypes.func,
  setSelectedMonthForDailyLogs: PropTypes.func,
  monthsWithDailyLogs: ImmutablePropTypes.set,
  isTodaysDailyLogExists: PropTypes.bool,
  selectedMonth: PropTypes.string,
  setSelectedDailyLog: PropTypes.func,
  openWorkoutModal: PropTypes.func
};

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
