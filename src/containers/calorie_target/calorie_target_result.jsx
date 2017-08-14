import React from 'react';
import { connect } from 'react-redux';

import CalorieTargetResult from './../../components/calorie_result/calorie_target_result';
import calorieTarget from './../../store/selectors/calorie_target';

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

const mapStateToProps = state => {
  const g = calorieTarget(state).get('finalValues')
  return {
    values: g
  }
}


export default connect(mapStateToProps)(CalorieTargetResultContainer);
