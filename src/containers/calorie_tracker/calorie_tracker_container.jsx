import React from 'react';
import CalorieTracker from './kcal_tracker';
import { FlatButton } from 'material-ui';

import CalorieLogContainer from './calorie_log_container';

const CalorieTrackerContainer = () => {
  return (
    <div className="row">
      <div className="col col-6">
        <CalorieTracker />
      </div>
      <div className="col col-6">
          <FlatButton
            label={`Here you can see and edit the already consumed nutritions`}
            disabled
          />
        <CalorieLogContainer />
      </div>
      <div className="clear"/>
    </div>
  );
};

export default CalorieTrackerContainer;
