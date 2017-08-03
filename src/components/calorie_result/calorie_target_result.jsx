import React from 'react';

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

export default CalorieTargetResult;
