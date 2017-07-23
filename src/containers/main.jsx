import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import HeaderContainer from './header';
import SideBarContainer from './side_bar';

import KcalTargerContainer from './kcal_target';
import UserDetailsContainer from './user_details';
import WorkoutLogsRouter from './workout_logs/workout_logs_router';
import DailyLogsRouter from './daily_logs/daily_logs_router';
import KcalTracker from './kcal_tracker';
import { initFetch } from './../store/actionCreators/user_details_action_creators';
import { closeSideBar } from './../store/actionCreators/app_action_creators';

import WorkoutTargetRouter from './workout_targets/workout_targets_router';

import withMessageBar from './massage_container';
import withLoadingScreen from './loading_container';

//TODO route gourd to all routes, not allow going here if the required data doesnt exist íyet
//TODO implement grapsh and charts
class MainContainer extends PureComponent {
  componentWillMount = () => this.props.initFetch();

  render = () =>
    <div>
      <HeaderContainer />
      <SideBarContainer />
      <Route path="/app/userdetails" component={UserDetailsContainer} />
      <Route path="/app/workoutlogs" component={withLoadingScreen(withMessageBar(WorkoutLogsRouter))} />
      <Route path="/app/dailylogs" component={DailyLogsRouter} />
      <Route path="/app/workouttargets" component={WorkoutTargetRouter} />
      <Route path="/app/kcaltarget" component={KcalTargerContainer} />
      <Route path="/app/kcaltracker" component={KcalTracker} />
    </div>;
}

const mapStateToProps = state => ({
  isLoading: state.getIn(['auth', 'isLoading'])
});

const mapDispatchToProps = dispatch => ({
  initFetch: () => dispatch(initFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
