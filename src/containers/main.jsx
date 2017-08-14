import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import SideBarContainer from './layout/side_bar';
import withMessageBar from './enhancers/message';
import * as async from './async/containers';

//TODO implement graphs and charts
//TODO withDataCheck for every details
const MainContainer = () =>
  <div className="main-container">
    <SideBarContainer />
    <Route
      path="/app/userdetails"
      component={async.AsyncUserDetailsContainer}
    />
    <Route path="/app/workoutlogs" component={async.AsyncWorkoutLogsRouter} />
    <Route path="/app/dailylogs" component={async.AsyncDailyLogsRouter} />
    <Route
      path="/app/workouttargets"
      component={async.AsyncWorkoutTargetsRouter}
    />
    <Route
      path="/app/kcaltarget"
      component={async.AsyncCalorieTargetContainer}
    />
    <Route
      path="/app/kcaltracker"
      component={async.AsyncCalorieTrackerContainer}
    />
  </div>;

export default withMessageBar(MainContainer);
