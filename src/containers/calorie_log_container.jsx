import React, { PureComponent } from 'react';
import { FieldArray, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import Nutritions from './../components/calorie_tracker/nutritions';
import { initLog } from './../store/actionCreators/calorie_action_creators';

class CalorieLogContainer extends PureComponent {
  componentDidMount() {
    this.props.dispatch(initLog());
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <FieldArray name="nutritions" component={Nutritions} />
      </form>
    );
  }
}

export default connect()(
  reduxForm({ form: 'calorie-log' })(CalorieLogContainer)
);
