import React from 'react';
import { FlatButton } from 'material-ui';

const CalorieTargetResultSumLabel = ({ calorieTarget, label }) =>
  <div style={{ textAlign: 'center' }}>
    <FlatButton
      disabled={true}
      label={`Calculated calories for ${label} day: ${calorieTarget[label]
        .calorie}`}
    />
  </div>;

export default CalorieTargetResultSumLabel;
