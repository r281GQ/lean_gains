import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form/immutable";

import DailyLogFormComponent from "./../../components/daily_log_form";

class DailyLogFormContainer extends Component {

  componentWillMount(){
    if(this.props.type === 'edit')
      this.props.change('weight', this.props.defaultValue.toJS().measurements.weight)
  }

  render = () => {
    return <DailyLogFormComponent createDailyLogHandler={() => null}  label={this.props.type === 'edit' ? 'update' : 'create'} renderDatepicker = {this.props.renderDatepicker} />;
  };
}
export default connect()(
  reduxForm({ form: "daily-log" })(DailyLogFormContainer)
);
