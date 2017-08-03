import React from 'react';
import PropTypes from 'prop-types';

const CalorieTrackerSummary = ({ sum }) =>
  <div>
    Calories so far: {sum.calories} P:{sum.protein}
    C:
    {sum.carbohydrate} F: {sum.fat}
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
