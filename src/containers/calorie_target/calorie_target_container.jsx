import React from 'react';

import CalorieTargetCalculator from './calorie_target_calculator';
import CalorieTargetResult from './calorie_target_result';

const CalorieTargetContainer = () =>
<div className="calorie-target">
  <div className="row">
    <div className="col col-6">

    <CalorieTargetCalculator /></div>
    <div className="col col-6">
    <CalorieTargetResult />
    </div>
    <div className="clear"></div>
  </div>;
</div>
export default CalorieTargetContainer;
