import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import moment from 'moment';
import * as _ from 'lodash';

import {
  updateDailyLog,
  createDailyLog
} from './../../store/actionCreators/daily_log_action_creators';
import DailyLogForm from './../../components/daily_log/daily_log_form';

class DailyLogFormContainer extends PureComponent {
  constructor(props) {
    super(props);
    this._disableThese = this._disableThese.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id)
      this.props.initialize(this.props.defaultValue.flatten());
  }

  _disableThese(disableDates) {
    return date =>
      disableDates.find(value => moment(value).isSame(date, 'day'))
        ? true
        : false;
  }

  render() {
    const { match, handleSubmit, updateDailyLog, createDailyLog } = this.props;
    return (
      <DailyLogForm
        submitHandler={handleSubmit(props => {
          match.params.id
            ? updateDailyLog({
                ...props.toJS(),
                _id: match.params.id
              })
            : createDailyLog(props.toJS());
        })}
        label={match.params.id ? 'Update' : 'Create'}
        renderDate={match.path ? _.includes(match.path, 'before') : false}
        shouldDisableDate={this._disableThese(this.props.datesWithDailyLogs)}
        {...this.props}
        disableButton={
          this.props.datesWithDailyLogs.find(value =>
            moment(value).isSame(this.props.selectedDate, 'day')
          ) && !this.props.match.params.id
            ? true
            : false
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    datesWithDailyLogs: state.getIn(['dailyLogs', 'dates']),
    selectedDate: getFormValues('daily-log')(state)
      ? getFormValues('daily-log')(state).get('createdAt')
      : moment()
  };
};

export default connect(mapStateToProps, { createDailyLog, updateDailyLog })(
  reduxForm({ form: 'daily-log' })(DailyLogFormContainer)
);
