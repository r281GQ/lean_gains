import React from 'react';
import { Route } from 'react-router-dom';

import SideBarContainer from './layout/side_bar';
import withMessageBar from './enhancers/message';
import withDataCheck from './enhancers/with_data_check';
import * as async from './async/containers';

import CalorieTargetError from './calorie_target_error'

// [{name:'sex', path:['userDetails', 'sex']}]

const requirements = [
  { name: 'dob', path: ['userDetails',  'dob'] },
  { name: 'sex', path: ['userDetails',  'sex'] },
  { name: 'waist', path: ['userDetails', 'latestMeasurements', 'waist'] },
  { name: 'rightArm', path: ['userDetails', 'latestMeasurements', 'rightArm'] },
  { name: 'chest', path: ['userDetails', 'latestMeasurements', 'chest'] },
  {
    name: 'belowBelly',
    path: ['userDetails', 'latestMeasurements', 'belowBelly']
  },
  { name: 'height', path: ['userDetails', 'latestMeasurements', 'height'] },
  {
    name: 'leftThigh',
    path: ['userDetails', 'latestMeasurements', 'leftThigh']
  },
  { name: 'hip', path: ['userDetails', 'latestMeasurements', 'hip'] },
  { name: 'leftArm', path: ['userDetails', 'latestMeasurements', 'leftArm'] },
  { name: 'belly', path: ['userDetails', 'latestMeasurements', 'belly'] },
  { name: 'weight', path: ['userDetails', 'latestMeasurements', 'weight'] },
  {
    name: 'aboveBelly',
    path: ['userDetails', 'latestMeasurements', 'aboveBelly']
  },
  {
    name: 'rightThigh',
    path: ['userDetails', 'latestMeasurements', 'rightThigh']
  },
  { name: 'neck', path: ['userDetails', 'latestMeasurements', 'neck'] }
];
import Error from './error';

/*eslint react/display-name: "off"*/

//TODO implement graphs and charts
//TODO withDataCheck for every details
const MainContainer = () =>
  <div className="main-container">
    <Error   />
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
      component={withDataCheck(
        async.AsyncCalorieTargetContainer,
        requirements,
        () => <div>erro</div>
      )}
    />
    <Route
      path="/app/kcaltracker"
      component={async.AsyncCalorieTrackerContainer}
    />
  </div>;

export default withMessageBar(MainContainer);
