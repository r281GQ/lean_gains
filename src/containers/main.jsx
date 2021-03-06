import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as async from './async/containers';
import SideBarContainer from './layout/side_bar';
import withMessageBar from './enhancers/message';
import withDataCheck from './enhancers/with_data_check';
import Error from './error';
import CalorieTargetError from './calorie_target_error';

import { initFetch } from './../store/actionCreators/user_details_action_creators';
import { getDailyLogDates } from './../store/actionCreators/daily_log_action_creators';
import { getWorkoutLogDates } from './../store/actionCreators/workout_log_action_creators';

const requirements = [
  { name: 'dob', path: ['userDetails', 'dob'] },
  { name: 'sex', path: ['userDetails', 'sex'] },
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

//TODO implement graphs and charts
class MainContainer extends React.PureComponent {
  componentDidMount() {
    if (!this.props.initFetchDone) {
      this.props.initFetch();
      this.props.getDailyLogDates();
      this.props.getWorkoutLogDates();
    }
  }

  render() {
    return (
      <div className="main-container">
        <Error />
        <SideBarContainer />
        <Route
          path="/app/userdetails"
          component={async.AsyncUserDetailsContainer}
        />
        <Route
          path="/app/workoutlogs"
          component={async.AsyncWorkoutLogsRouter}
        />
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
            CalorieTargetError
          )}
        />
        <Route
          path="/app/kcaltracker"
          component={async.AsyncCalorieTrackerContainer}
        />
      </div>
    );
  }
}

MainContainer.propTypes = {
  initFetchDone: PropTypes.bool,
  initFetch: PropTypes.func,
  getDailyLogDates: PropTypes.func,
  getWorkoutLogDates: PropTypes.func
};

// TODO: to selectors
const mapStateToProps = state => {
  return {
    initFetchDone:
      typeof state.getIn(['userDetails', 'userName']) !== 'undefined'
  };
};

export default connect(mapStateToProps, {
  initFetch,
  getWorkoutLogDates,
  getDailyLogDates
})(withMessageBar(MainContainer));

export { MainContainer as PureMainContainer };
