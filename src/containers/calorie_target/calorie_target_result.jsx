import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import CalorieTargetResult from './../../components/calorie_result/calorie_target_result';
import calorieTarget from './../../store/selectors/calorie_target';

const CalorieTargetResultContainer = ({ values }) =>
  <div>
    <CalorieTargetResult calorieTarget={values.toJS()} label="rest" />
    <CalorieTargetResult calorieTarget={values.toJS()} label="training" />
  </div>;

const mapStateToProps = state => {
  return {
    values: calorieTarget(state).get('finalValues')
  };
};

CalorieTargetResultContainer.propTypes = {
  values: ImmutablePropTypes.mapContains({
    rest: ImmutablePropTypes.mapContains({
      calorie: PropTypes.number,
      carbohydrate: PropTypes.number,
      fat: PropTypes.number,
      protein: PropTypes.number
    }),
    training: ImmutablePropTypes.mapContains({
      calorie: PropTypes.number,
      carbohydrate: PropTypes.number,
      fat: PropTypes.number,
      protein: PropTypes.number
    })
  })
};

export default connect(mapStateToProps)(CalorieTargetResultContainer);
