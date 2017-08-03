import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import moment from 'moment';

import DailyLogForm from './../../components/daily_log/daily_log_form';

class DailyLogFormContainer extends PureComponent {
  componentDidMount = () => {
    if (this.props.type === 'edit')
      this.props.change(
        'weight',
        this.props.defaultValue.getIn(['measurements', 'weight'])
      );
  };

  _disableThese = disableDates => date =>
    disableDates.find(value => moment(value).isSame(date, 'day'))
      ? true
      : false;

  render = () =>
    <DailyLogForm
      createDailyLogHandler={values => console.log(values)}
      label={this.props.type === 'edit' ? 'update' : 'create'}
      renderDatepicker={this.props.renderDatepicker}
      shouldDisableDate={this._disableThese(this.props.dailyLogDates)}
      {...this.props}
    />;
}

export default connect(state => ({
  dailyLogDates: state.getIn(['dailyLogs', 'dates'])
}))(reduxForm({ form: 'daily-log' })(DailyLogFormContainer));
