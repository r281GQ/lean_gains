import React from 'react';
import PropTypes from 'prop-types';
import { FlatButton } from 'material-ui';

const CalorieTrackerSummary = ({ sum }) =>
  <div className="calorie-tracker-summery__container">
    <FlatButton
      label={`Calories so far: ${sum.calories} P:${sum.protein} C: ${sum.carbohydrate} F: ${sum.fat}`}
      disabled
    />
  </div>;

CalorieTrackerSummary.propTypes = {
  sum: PropTypes.shape({
    calories: PropTypes.number,
    protein: PropTypes.number,
    carbohydrate: PropTypes.number,
    fat: PropTypes.number
  })
};

export default CalorieTrackerSummary;
