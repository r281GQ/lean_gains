import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import moment from 'moment';
import {
  updateDailyLog,
  createLog
} from './../../store/actionCreators/daily_log_action_creators';

import DailyLogForm from './../../components/daily_log/daily_log_form';

class DailyLogFormContainer extends PureComponent {
  componentDidMount = () => {
    if (this.props.type === 'edit') {
      this.props.change(
        'weight',
        this.props.defaultValue.getIn(['measurements', 'weight'])
      );
      this.props.change(
        'protein',
        this.props.defaultValue.getIn(['macros', 'protein'])
      );
    }
  };

  _disableThese = disableDates => date =>
    disableDates.find(value => moment(value).isSame(date, 'day'))
      ? true
      : false;

  render = () =>
    <DailyLogForm
      createDailyLogHandler={this.props.handleSubmit(props => {
        console.log(props.toJS());

        console.log(this.props.match.params.id);

        this.props.match.params.id
          ? this.props.updateDailyLog({
              ...props.toJS(),
              _id: this.props.match.params.id
            })
          : this.props.createLog(props.toJS());
      })}
      label={this.props.type === 'edit' ? 'update' : 'create'}
      renderDatepicker={this.props.renderDatepicker}
      shouldDisableDate={this._disableThese(this.props.dailyLogDates)}
      {...this.props}
    />;
}

const mapDispatchToProps = dispatch => ({
  updateDailyLog: log => dispatch(updateDailyLog(log)),
  createLog: log => dispatch(createLog(log))
});

export default connect(
  state => ({
    dailyLogDates: state.getIn(['dailyLogs', 'dates'])
  }),
  mapDispatchToProps
)(reduxForm({ form: 'daily-log' })(DailyLogFormContainer));
