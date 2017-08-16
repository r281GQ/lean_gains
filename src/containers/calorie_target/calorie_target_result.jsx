import React from 'react';
import { connect } from 'react-redux';


// import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';




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
  return {
    values: calorieTarget(state).get('finalValues')
  }
}

CalorieTargetResultContainer.propTypes = {
  values: ImmutablePropTypes.map
}
export default connect(mapStateToProps)(CalorieTargetResultContainer);
