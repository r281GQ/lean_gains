import React from 'react';
import { connect } from 'react-redux';

import CalorieTargetResult from './../components/calorie_target_result';
import calorieTarget from './../store/selectors/calorie_target';

const CalorieTargetResultContainer = ({ values }) =>
  <div>
    <CalorieTargetResult
      calorieTarget={values ? values.toJS() : {}}
      label="rest"
    />
    <CalorieTargetResult
      calorieTarget={values ? values.toJS() : {}}
      label="training"
    />
  </div>;

const mapStateToProps = state => ({
  values: calorieTarget(state).get('finalValues')
});

export default connect(mapStateToProps)(CalorieTargetResultContainer);
