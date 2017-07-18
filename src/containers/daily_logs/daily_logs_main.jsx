import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

import {
  getDailyLogDates,
  getLogsForSelectedMonth
} from './../../store/actionCreators/daily_log_action_creators';
import { setSelectedMonthForDailyLogs } from './../../store/actionCreators/app_action_creators';

import monthsWithDailyLogs from './../../store/selectors/month_daily_log';

import dailyLogsForMonth from './../../store/selectors/daily_logs_month' ;

class DailyLogPicker extends Component {
  componentWillMount = () => this.props.getDailyLogDates();

  _update = lastMonth => {
    this.props.setSelectedMonthForDailyLogs(lastMonth);
    this.props.getLogsForSelectedMonth(lastMonth);
  };

  componentWillReceiveProps = nextProps =>
    this.props.monthsWithDailyLogs.isEmpty() &&
    !nextProps.monthsWithDailyLogs.isEmpty()
      ? this._update(nextProps.monthsWithDailyLogs.last())
      : null;

  render() {
    const { selectedMonth, setSelectedMonthForDailyLogs, logs } = this.props;
    return (
      <div>
        <div>
          <SelectField
            value={selectedMonth}
            onChange={(event, key, value) => {
              setSelectedMonthForDailyLogs(value);
              this.props.getLogsForSelectedMonth(value);
            }}
          >
            {_.map(this.props.monthsWithDailyLogs.toJS(), month => {
              return <MenuItem value={month} key={month} primaryText={month} />;
            })}
          </SelectField>
        </div>
        <div>
          <List>
            {_.map(this.props.dailyLogsForMonth.toJS(), log =>
              <div key={Math.random()}>
                <ListItem disabled={true}>
                  <Card>
                    <CardHeader
                      title={moment(log.date).format('DD-MM-YYYY')}
                      subtitle="Subtitle"
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                      {log._id}
                      <Link to={`/dailylogs/edit/${log._id}`}>
                      <FlatButton onTouchTap={()=>console.log()} label='modify'  />
</Link>
                    <FlatButton onTouchTap={()=>console.log()} label='delete'  />
                    </CardText>
                  </Card>
                </ListItem>
              </div>
            )}
          </List>
        </div>
        <Link to="/dailylogs/create/before">
          <FloatingActionButton
            mini={true}
            style={{
              position: "fixed",
              bottom: 20,
              right: 100
            }}
          >
            <ContentAdd />
          </FloatingActionButton>
        </Link>
        <Link to="/dailylogs/create">
          <FloatingActionButton
            style={{
              position: 'fixed',
              bottom: 20,
              right: 20
            }}
          >
            <ContentAdd />
          </FloatingActionButton>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setSelectedMonthForDailyLogs: month =>
    dispatch(setSelectedMonthForDailyLogs(month)),
  getDailyLogDates: () => dispatch(getDailyLogDates()),
  getLogsForSelectedMonth: month => dispatch(getLogsForSelectedMonth())
});

export default connect(
  state => ({
    logs: state.getIn(['dailyLog', 'data']).toJS(),
    selectedMonth: state.getIn(['app', 'selectedMonthForDailyLogs']),
    monthsWithDailyLogs: monthsWithDailyLogs(state),
    dailyLogsForMonth: dailyLogsForMonth(state)
  }),
  mapDispatchToProps
)(DailyLogPicker);
