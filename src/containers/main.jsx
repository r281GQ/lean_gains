import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import HeaderContainer from './header';
import SideBarContainer from './side_bar';

import UserDetailsContainer from './user_details';
import WorkoutLogsRouter from './workout_logs/workout_logs_router';
import DailyLogsRouter from './daily_logs/daily_logs_router';
import KcalTracker from './kcal_tracker';
import { initFetch } from './../store/actionCreators/user_details_action_creators';
import { closeSideBar } from './../store/actionCreators/app_action_creators';

import WorkoutTargetRouter from './workout_targets/workout_targets_router';

import CalorieTargetContainer from './calorie_target_container';

import withMessageBar from './massage_container';
import withLoadingScreen from './loading_container';
import withDataCheck from './with_data_check';

const Error = ({errors}) => <div>{errors.map(item => <div>{`${item} is missing First you need to provide this`}</div>)}</div>

//TODO implement graphs and charts
//TODO proptypes
class MainContainer extends PureComponent {
  componentDidMount = () => this.props.initFetch();

  render = () =>
    <div>
      <HeaderContainer />
      <SideBarContainer />
      <Route path="/app/userdetails" component={UserDetailsContainer} />
      <Route path="/app/workoutlogs" component={withLoadingScreen(withMessageBar(WorkoutLogsRouter))} />
      <Route path="/app/dailylogs" component={DailyLogsRouter} />
      <Route path="/app/workouttargets" component={WorkoutTargetRouter} />
      <Route path="/app/kcaltarget" component={withDataCheck(CalorieTargetContainer, [{name:'sex', path:['userDetails', 'sex']}],Error )} />
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
