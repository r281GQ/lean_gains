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
import WorkoutLogContainer from "./workout_log";
import WorkoutLogPicker from "./workout_log_picker";
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
    console.log(this.props.todayslog.toJS());
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

        <Route
          path="/dailylogs"
          render={props =>
            <DailyLogContainer {...props} logs={this.props.dailyLogs.toJS()} />}
        />
        <Route
          exact
          path="/workoutlogs"
          render={props =>
            <WorkoutLogPicker
              {...props}
              what={45}
              months={this.props.months}
              selected={this.state.selected}
              handler={this.onHandler}
              todaysLog={this.props.todayslog.toJS()}
              logs={
                !this.props.monthlyLogs.isEmpty()
                  ? this.props.monthlyLogs.toJS()
                  : []
              }
            />}
        />
        <Route
          path="/workoutlogs/create"
          exact
          render={props => {
            console.log(this.props.exercises.toJS());
            let g = _.map(
              this.props.exercises.isEmpty() ? [] : this.props.exercises.toJS(),
              exercise => ({
                name: exercise,
                note: "",
                marker: false,
                sets: []
              })
            );
            return (
              <WorkoutLogContainer
                {...props}
                forCurrent={true}
                exercisesF={g}
                handlerR={this.props.handler}
              />
            );
          }}
        />

        <Route
          path="/workoutlogs/create/before"
          exact
          render={props => {
            console.log(this.props.exercises.toJS());
            let g = _.map(
              this.props.exercises.isEmpty() ? [] : this.props.exercises.toJS(),
              exercise => ({
                name: exercise,
                note: "",
                marker: false,
                sets: []
              })
            );
            return (
              <WorkoutLogContainer
                {...props}
                forCurrent={false}
                exercisesF={g}
                handlerR={this.props.handler}
              />
            );
          }}
        />
        <Route
          path="/KcalLog"
          exact
          render={props => {
            return <KcalLog {...props} />;
          }}
        />
        <Route
          exact
          path="/workoutlogs/edit/:id"
          render={props => {
            let toedit = this.props.workoutLog
              .find((value, key) =>
                _.includes(this.props.location.pathname, key)
              )
              .get("exercises")
              .toJS();

            return (
              <WorkoutLogContainer
                {...props}
                exercisesF={toedit}
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
              sex={this.props.sex}
              age={this.props.age}
              latestMeasurements={this.props.latestMeasurements.toJS()}
            />}
        />
        <Route
          path="/userdetails"
          render={props => {
            props.initialValues = {};
            props.initialValues.username = "sdfsdfsdfsd";
            return (
              <UserDetailsContainer
                {...props}
                sex={this.props.sex}
                userName={this.props.username}
                dob={this.props.dob}
                updateHandler={this.updateHandler}
              />
            );
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todayslog: todaysLog(state),
    dob: state.getIn(["userDetails", "dob"]),
    age: calculateAge(state),
    sex: state.getIn(["userDetails", "gender"]),
    latestMeasurements: state.getIn(["userDetails", "latestMeasurements"]),
    isLoading: state.getIn(["auth", "isLoading"]),
    username: state.getIn(["userDetails", "username"]),
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
