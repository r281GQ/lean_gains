import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Immutable, { toJS, fromJS } from "immutable";
import { Route } from "react-router-dom";
import { initialize } from "redux-form/immutable";
import * as _ from "lodash";
import { Link } from "react-router-dom";
import { goBack } from "react-router-redux";
import moment from "moment";

import { Drawer, MenuItem, FlatButton, LinearProgress } from "material-ui";

import HeaderContainer from "./header";
import currentKcalPlanSelector from "./../store/selectors/current_kcal";
import currentWeightSelector from "./../store/selectors/current_weight";
import isTrainingDay from "./../store/selectors/exercises";

import todayMacros from "./../store/selectors/current_macros";
import calculateAge from "./../store/selectors/age";
import todaysLog from "./../store/selectors/today_log";
import months from "./../store/selectors/workout_months";

import DailyLogContainer from "./daily_log_picker";
import {
  getWorkoutLogsForMonth,
  createWorkoutLog
} from "./../store/actionCreators/workout_log_action_creators";
import WorkoutTarget from "./workout_target";
import KcalTargerContainer from "./kcal_target";
import UserDetailsContainer from "./user_details";
import KcalLog from "./kcal_tracker";
import {
  updateUserDetails,
  getWorkoutTargets,
  fetchUserDetails,
  getKcalTargets,
  initFetch
} from "./../store/actionCreators/user_details_action_creators";

import WorkoutLogsRouter from "./workout_logs/workout_logs_router";

const isImmutable = dataStructure =>
  Immutable.Iterable.isIterable(dataStructure);



//TODO router hoc
//TODO when main loads it should fetch workouttarget kcaltarget and UserDetails
//TODO implement grapsh and charts
class MainContainer extends PureComponent {
  componentWillMount() {
    this.props.initFetch();
    // this.props.fetchUserDetails();
    // this.props.getKcalTargets();
  }
  onHandler = (event, index, value) => {
    this.setState({ selected: moment(value).format("MM-YYYY") });
    this.props.get1(value);
  };

  // submitHandler = ({name, dob, username, gender}) => {
  //   const  a = this.props.userD.withMutations(map => map.set('name', name ).set('dob', dob).set('username', username).set('gender', gender));
  //   this.props.uD(a.toJS());
  // }
  submitHandler = fom => console.log(fom);

  constructor(props) {
    super(props);
    this.state = { selected: moment().format("MM-YYYY"), open: false };
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

  updateHandler = formProps => {
    this.props.uD(formProps);
  };

  closeSideBar = () => this.setState({ open: false });
  render() {
    // if(this.props.isLoading)
    //   return <LinearProgress mode="indeterminate" />;
    return (
      <div>
        <HeaderContainer
          goBack={this.props.back}
          isLoading={this.props.isLoading}
          setter={() => this.setState({ open: !this.state.open })}
          currentWeight={this.props.currentWeight}
          exercises={this.props.exercises.toJS()}
          todaysMacros={this.props.todaysMacros.toJS()}
          userName={this.props.username}
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
            to="/workoutlogs"
            style={{ textDecoration: "none" }}
            onClick={this.closeSideBar}
          >
            <MenuItem>Workout logs</MenuItem>
          </Link>
          <Link
            to="/KcalLog"
            style={{ textDecoration: "none" }}
            onClick={this.closeSideBar}
          >
            <MenuItem>kolrialog</MenuItem>
          </Link>
          <Link
            to="/dailylogs"
            style={{ textDecoration: "none" }}
            onClick={this.closeSideBar}
          >
            <MenuItem>
              <span>Daily logs</span>
            </MenuItem>
          </Link>

          <Link
            to="/workouttarget"
            style={{ textDecoration: "none" }}
            onClick={this.closeSideBar}
          >
            <MenuItem>
              {" "}<span>workouttarget</span>
            </MenuItem>
          </Link>
          <Link
            to="/userdetails"
            style={{ textDecoration: "none" }}
            onClick={this.closeSideBar}
          >
            <MenuItem>
              {" "}<span>userdetails</span>
            </MenuItem>
          </Link>
          <Link
            to="/kcaltarget"
            style={{ textDecoration: "none" }}
            onClick={this.closeSideBar}
          >
            <MenuItem>
              {" "}<span>kl</span>
            </MenuItem>
          </Link>
        </Drawer>

        <Route path={"/workoutlogs"} component={WorkoutLogsRouter} />

        <Route
          path="/dailylogs"
          render={props =>
            <DailyLogContainer {...props} logs={this.props.dailyLogs.toJS()} />}
        />

        <Route path="/workouttarget" component={WorkoutTarget} />
        <Route
          path="/kcaltarget"
          render={props =>
            <KcalTargerContainer
              {...props}
              sex={this.props.sex}
              age={this.props.age}
              latestMeasurements={this.props.latestMeasurements.toJS()}
            />}
        />
        <Route path="/userdetails" component={UserDetailsContainer} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dob: state.getIn(["userDetails", "dob"]),
    age: calculateAge(state),
    sex: state.getIn(["userDetails", "gender"]),
    latestMeasurements: state.getIn(["userDetails", "latestMeasurements"]),
    isLoading: state.getIn(["auth", "isLoading"]),
    username: state.getIn(["userDetails", "userName"]),
    userD: state.get("userDetails"),
    currentKcalPlan: currentKcalPlanSelector(state),
    currentWeight: currentWeightSelector(state),
    todaysMacros: todayMacros(state),
    dailyLogs: state.get("dailyLog"),
    workoutLog: state.get("workoutLogs"),
    monthlyLogs: state.get("workoutLogs"),
    exercises: isTrainingDay(state),
    months: months(state)
  };
};

// <Route
//   path="/KcalLog"
//   exact
//   render={props => {
//     return <KcalLog {...props} />;
//   }}
// />
const mapDispatchToProps = dispatch => {
  return {
    back: () => dispatch(goBack()),
    get1: month => dispatch(getWorkoutLogsForMonth(month)),
    initFetch: () => dispatch(initFetch()),
    getWorkoutTargets: () => dispatch(getWorkoutTargets()),
    fetchUserDetails: () => dispatch(fetchUserDetails()),
    getKcalTargets: () => dispatch(getKcalTargets()),
    handler: log => dispatch(createWorkoutLog(log)),
    uD: userDetails => dispatch(updateUserDetails(userDetails)),
    initForm: values =>
      dispatch(
        initialize("userdetails", { initialValues: { name: "dsdfsdfsdfsd" } })
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
