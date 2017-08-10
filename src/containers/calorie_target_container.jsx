import React from 'react';

import CalorieTargetCalculator from './calorie_target_calculator';
import CalorieTargetResult from './calorie_target_result';
import Footer from './footer'

const CalorieTargetContainer = () =>
  <div>
    <CalorieTargetCalculator />
    <CalorieTargetResult />
  </div>;

export default CalorieTargetContainer;
