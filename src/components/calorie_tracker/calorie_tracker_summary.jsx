import React from 'react';
import PropTypes from 'prop-types';

const CalorieTrackerSummary = ({ sum }) =>
  <div className="calorie-tracker-summery__container">
    <div>{`Calories: ${sum.calories}`}</div>
    <div>{`P:${sum.protein} C: ${sum.carbohydrate} F: ${sum.fat}`}</div>
  </div>;

CalorieTrackerSummary.propTypes = {
  sum: PropTypes.shape({
    calories: PropTypes.number,
    protein: PropTypes.number,
    carbohydrate: PropTypes.number,
    fat: PropTypes.number
  }).isRequired
};

export default CalorieTrackerSummary;
