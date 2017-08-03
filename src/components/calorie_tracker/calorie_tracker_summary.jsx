import React from 'react';

const CalorieTrackerSummary = ({ sum }) =>
  <div>
    Calories so far: {sum.calories} P:{sum.protein}
    C:
    {sum.carbohydrate} F: {sum.fat}
  </div>;

export default CalorieTrackerSummary;
