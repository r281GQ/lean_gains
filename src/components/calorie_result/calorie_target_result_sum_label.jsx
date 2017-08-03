import React from 'react';
import PropTypes from 'prop-types';
import { FlatButton } from 'material-ui';

const CalorieTargetResultSumLabel = ({ calorieTarget, label }) =>
  <div style={{ textAlign: 'center' }}>
    <FlatButton
      disabled={true}
      label={`Calculated calories for ${label} day: ${calorieTarget[label]
        .calorie}`}
    />
  </div>;

CalorieTargetResultSumLabel.propTypes = {
  calorieTarget: PropTypes.oneOfType([
    PropTypes.shape({
      rest: PropTypes.shape({
        calorie: PropTypes.number
      })
    }),
    PropTypes.shape({
      training: PropTypes.shape({
        calorie: PropTypes.number
      })
    })
  ]),
  label: PropTypes.string
};

export default CalorieTargetResultSumLabel;
