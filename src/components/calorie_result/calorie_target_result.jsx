import React from 'react';
import PropTypes from 'prop-types'

import CalorieTargetResultTable from './calorie_target_result_table';
import CalorieTargetResultSumLabel from './calorie_target_result_sum_label';

const CalorieTargetResult = ({ label, calorieTarget }) =>
  calorieTarget
    ? <div>
        <CalorieTargetResultSumLabel
          label={label}
          calorieTarget={calorieTarget}
        />
        <CalorieTargetResultTable label={label} calorieTarget={calorieTarget} />
      </div>
    : null;

CalorieTargetResult.propTypes = {
  calorieTarget: PropTypes.oneOfType([
    PropTypes.shape({
      rest: PropTypes.shape({
        calorie: PropTypes.number,
        protein: PropTypes.number,
        carbohydrate: PropTypes.number,
        fat: PropTypes.number
      })
    }),
    PropTypes.shape({
      training: PropTypes.shape({
        calorie: PropTypes.number,
        protein: PropTypes.number,
        carbohydrate: PropTypes.number,
        fat: PropTypes.number
      })
    })
  ]),
  label: PropTypes.string
};
export default CalorieTargetResult;
