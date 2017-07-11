import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Immutable, { toJS, fromJS } from "immutable";
import { Route } from "react-router-dom";
import { initialize } from "redux-form/immutable";
import * as _ from "lodash";
import { Link } from "react-router-dom";

import { Drawer, MenuItem, FlatButton, LinearProgress } from "material-ui";

import HeaderContainer from "./header";
import currentKcalPlanSelector from "./../store/selectors/current_kcal";
import currentWeightSelector from "./../store/selectors/current_weight";
import isTrainingDay from "./../store/selectors/exercises";

import todayMacros from "./../store/selectors/current_macros";

import DailyLogContainer from "./daily_log";
import WorkoutLogContainer from "./workout_log";
import WorkoutLogPicker from "./workout_log_picker";
import {
  getWorkoutLogsForMonth,
  createWorkoutLog
} from "./../store/actionCreators/workout_log_action_creators";
import WorkoutTarget from "./workout_target";
import KcalTargerContainer from "./kcal_target";
import UserDetailsContainer from "./user_details";
import { updateUserDetails, getWorkoutTargets, fetchUserDetails, getKcalTargets, initFetch } from "./../store/actionCreators/user_details_action_creators";

const isImmutable = dataStructure =>
  Immutable.Iterable.isIterable(dataStructure);

const withRoutes = components => props => {
  return (
    <div>
      <Route path="/workoutlog/create" component={components} />
      <Route path="/workoutlog/edit" component={components} />
    </div>
  );
};

const exercises = [{ name: "dead", repetitions: [] }, { name: "squat" }];

const WK = () => <WorkoutLogContainer exercises={exercises} />;

//TODO router hoc
//TODO when main loads it should fetch workouttarget kcaltarget and UserDetails
//TODO implement grapsh and charts
class MainContainer extends PureComponent {
  componentWillMount(){
    this.props.initFetch();
    // this.props.fetchUserDetails();
    // this.props.getKcalTargets();
  }
  onHandler = (event, index, value) => {
    this.setState({ selected: value });
    this.props.get1(value);
  };

  // submitHandler = ({name, dob, username, gender}) => {
  //   const  a = this.props.userD.withMutations(map => map.set('name', name ).set('dob', dob).set('username', username).set('gender', gender));
  //   this.props.uD(a.toJS());
  // }
  submitHandler = fom => console.log(fom);

  constructor(props) {
    super(props);
    this.state = { selected: 1, open: false };
  }
  withInitialValues = exercises => props => {
    let g = _.map(exercises, exercise => ({
      name: exercise.name,
      note: "",
      sets: []
    }));
    return (
      <WorkoutLogContainer
        {...props}
        exercises={g}
        handlerR={this.props.handler}
      />
    );
  };

  closeSideBar = () => this.setState({ open: false });
  render() {
    console.log(this.props.isLoading);
    if(this.props.isLoading)
      return <LinearProgress mode="indeterminate" />;
    return (
      <div>
        <HeaderContainer
          loading={this.props.loading}
          setter={() => this.setState({ open: !this.state.open })}
          currentWeight={this.props.currentWeight}
          exercises={this.props.exercises.toJS()}
          todaysMacros={this.props.todaysMacros.toJS()}
        />
        <Drawer
          open={this.state.open}
          docked={false}
          onRequestChange={open => this.setState({ open })}
        >
          <MenuItem onClick={() => this.setState({ open: false })}>
            Close
          </MenuItem>

          <Link
            to="/workoutlog/create"
            onClick={this.closeSideBar}
            style={{ textDecoration: "none" }}
          >
            <MenuItem>workoutlog</MenuItem>
          </Link>
          <Link to="/workoutlog" style={{ textDecoration: "none" }}   onClick={this.closeSideBar}>
            <MenuItem>Picker</MenuItem>
          </Link>
          <Link to="/workoutlog/edit/7" style={{ textDecoration: "none" }}   onClick={this.closeSideBar}>
            <MenuItem>workoutloged</MenuItem>
          </Link>
          <Link to="/kcal" style={{ textDecoration: "none" }}   onClick={this.closeSideBar}>
            <MenuItem>
              {" "}<span>kcal</span>
            </MenuItem>
          </Link>
          <Link to="/dailylog" style={{ textDecoration: "none" }}   onClick={this.closeSideBar}>
            <MenuItem>
              <span>daily_log</span>
            </MenuItem>
          </Link>

          <Link to="/workouttarget" style={{ textDecoration: "none" }}   onClick={this.closeSideBar}>
            <MenuItem>
              {" "}<span>workouttarget</span>
            </MenuItem>
          </Link>
          <Link to="/userdetails" style={{ textDecoration: "none" }}   onClick={this.closeSideBar}>
            <MenuItem>
              {" "}<span>userdetails</span>
            </MenuItem>
          </Link>
          <Link to="/kcaltarget" style={{ textDecoration: "none" }}   onClick={this.closeSideBar} >
            <MenuItem>
              {" "}<span>kl</span>
            </MenuItem>
          </Link>
        </Drawer>

        <Route
          path="/dailylog"
          render={props =>
            <DailyLogContainer {...props} logs={this.props.dailyLogs.toJS()} />}
        />
        <Route
          exact
          path="/workoutlog"
          render={props =>
            <WorkoutLogPicker
              {...props}
              what={45}
              selected={this.state.selected}
              handler={this.onHandler}
              logs={
                !this.props.monthlyLogs.isEmpty()
                  ? this.props.monthlyLogs.toJS()
                  : []
              }
            />}
        />
        <Route
          path="/workoutlog/create"
          render={props => {
            let g = _.map(
              this.props.workoutLog.isEmpty()
                ? this.props.workoutLog.toJS()
                : [],
              exercise => ({
                name: exercise.name,
                note: "",
                sets: []
              })
            );
            return (
              <WorkoutLogContainer
                {...props}
                exercises={g}
                handlerR={this.props.handler}
              />
            );
          }}
        />
        <Route
          path="/workoutlog/edit/:id"
          render={props => {
            let g = _.map(
              this.props.workoutLog.isEmpty()
                ? this.props.workoutLog.toJS()
                : [],
              exercise => ({
                name: exercise.name,
                note: "",
                sets: []
              })
            );
            return (
              <WorkoutLogContainer
                {...props}
                exercises={g}
                handlerR={this.props.handler}
              />
            );
          }}
        />
        <Route path="/workouttarget" component={WorkoutTarget} />
        <Route
          path="/kcaltarget"
          render={props =>
            <KcalTargerContainer
              {...props}
              weight={67}
              height={175}
              gender="male"
              age={29}
              bf={17.5}
              latestMeasurements={this.props.latestMeasurements.toJS()}
            />}
        />
        <Route
          path="/userdetails"
          render={props =>
            <UserDetailsContainer
              {...props}
              userDetails={this.props.userD.toJS()}
            />}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    latestMeasurements : state.getIn(['userDetails','latestMeasurements']),
    isLoading: state.getIn(['auth','isLoading']),
    username: state.getIn(["userDetails", "username"]),
    userD: state.get("userDetails"),
    currentKcalPlan: currentKcalPlanSelector(state),
    currentWeight: currentWeightSelector(state),
    todaysMacros: todayMacros(state),
    dailyLogs: state.get("dailyLog"),
    workoutLog: state.get("workoutLogs"),
    monthlyLogs: state.get("workoutLogs"),
    exercises: isTrainingDay(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    get1: month => dispatch(getWorkoutLogsForMonth(month)),
    initFetch: () => dispatch(initFetch()),
    getWorkoutTargets : () => dispatch(getWorkoutTargets()),
    fetchUserDetails : () => dispatch(fetchUserDetails()),
    getKcalTargets : () => dispatch(getKcalTargets()),
    handler: log => dispatch(createWorkoutLog(log)),
    uD: userDetails => dispatch(updateUserDetails(userDetails)),
    initForm: values =>
      dispatch(
        initialize("kcal-target", fromJS({ initialValues: { providedBf: 18 } }))
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
