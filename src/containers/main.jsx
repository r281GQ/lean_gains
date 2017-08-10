import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import HeaderContainer from './header';
import SideBarContainer from './side_bar';

// import UserDetailsContainer from './user_details';
// import WorkoutLogsRouter from './workout_logs/workout_logs_router';
// import DailyLogsRouter from './daily_logs/daily_logs_router';
// import KcalTracker from './kcal_tracker';
import { initFetch } from './../store/actionCreators/user_details_action_creators';
import { closeSideBar } from './../store/actionCreators/app_action_creators';

import WorkoutTargetRouter from './workout_targets/workout_targets_router';
//
// import CalorieTargetContainer from './calorie_target_container';
// import CalorieTrackerContainer from './calorie_tracker_container';




import withMessageBar from './massage_container';
import withLoadingScreen from './loading_container';
import withDataCheck from './with_data_check';
const Error = ({ errors }) =>
  <div>
    {errors.map(item =>
      <div>{`${item} is missing First you need to provide this`}</div>
    )}
  </div>;

  import styled from 'styled-components';
const Cantainer = styled.div`
  position: relative;
`;
import asyncComponent from './asyncComponent'
import withFooter from './with_footer'
import Footer from './footer'

// const Page1 = asyncComponent(() => import('./components/Page1')
//   .then(module => module.default), { name: 'Page 1' });
const DailyLogsRouter = asyncComponent(() => System.import('./daily_logs/daily_logs_router')
  .then(module => module.default), { name: 'Page 1' });

  const CalorieTargetContainer = asyncComponent(() => System.import('./calorie_target_container')
    .then(module => module.default), { name: 'Page 2' });

    const UserDetailsContainer = asyncComponent(() => System.import('./user_details')
      .then(module => module.default), { name: 'Page 3' });

      const WorkoutLogsRouter = asyncComponent(() => System.import('./workout_logs/workout_logs_router')
        .then(module => module.default), { name: 'Page 4' });

        const CalorieTrackerContainer = asyncComponent(() => System.import('./calorie_tracker_container')
          .then(module => module.default), { name: 'Page 5' });


//TODO implement graphs and charts
//TODO proptypes
//TODO target calc for every details
class MainContainer extends PureComponent {
  // componentDidMount = () => this.props.initFetch();

  render = () =>
    <Cantainer>
      <HeaderContainer />
      <SideBarContainer />

      <Route path="/app/userdetails" component={UserDetailsContainer} />
      <Route
        path="/app/workoutlogs"
        component={withLoadingScreen(withMessageBar(WorkoutLogsRouter))}
      />
      <Route path="/app/dailylogs" component={DailyLogsRouter} />
      <Route path="/app/workouttargets" component={WorkoutTargetRouter} />
      <Route
        path="/app/kcaltarget"
        component={(withDataCheck(
          (CalorieTargetContainer),
          [{ name: 'sex', path: ['userDetails', 'sex'] }],
          Error
        ))}
      />
      <Route path="/app/kcaltracker" component={CalorieTrackerContainer} />

    </Cantainer>;
}
{/* <Footer /> */}
const mapStateToProps = state => ({
  isLoading: state.getIn(['auth', 'isLoading'])
});

const mapDispatchToProps = dispatch => ({
  initFetch: () => dispatch(initFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
