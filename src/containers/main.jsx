import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Immutable, { toJS, fromJS } from "immutable";
import { Route } from "react-router-dom";
import {initialize} from 'redux-form/immutable';
import * as _ from "lodash";

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
import UserDetailsContainer from './user_details';
import {updateUserDetails} from './../store/actionCreators/user_details_action_creators';

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
class MainContainer extends PureComponent {
  onHandler = (event, index, value) => {
    this.setState({ selected: value });
    this.props.get1(value);
  };

  submitHandler = ({name, dob, username, gender}) => {
    const  a = this.props.userD.withMutations(map => map.set('name', name ).set('dob', dob).set('username', username).set('gender', gender));
    this.props.uD(a.toJS());
  }

  constructor(props) {
    super(props);
    this.state = { selected: 1 };
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
  render() {
    return (
      <div>
        <HeaderContainer
          currentWeight={this.props.currentWeight}
          exercises={this.props.exercises.toJS()}
          todaysMacros={this.props.todaysMacros.toJS()}
        />
        <Route
          path="/dailylog"
          component={() =>
            <DailyLogContainer logs={this.props.dailyLogs.toJS()} />}
        />
        <Route
          exact
          path="/workoutlog"
          component={() =>
            <WorkoutLogPicker
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
          component={this.withInitialValues(
            !this.props.workoutLog.isEmpty()
              ? this.props.workoutLog.find(value => true).toJS()
              : []
          )}
        />
        <Route
          path="/workoutlog/edit/:id"
          component={this.withInitialValues(this.props.exercises.toJS())}
        />
        <Route path="/workouttarget" component={WorkoutTarget} />
        <Route path="/kcaltarget" component={()=><KcalTargerContainer weight={67} height={175} gender="male" age={29} bf={17.5} /> } />
        <Route path="/userdetails" component={()=><UserDetailsContainer submitHandler={this.submitHandler}  userDetails={this.props.userD.toJS()} />} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.getIn(["userDetails", "username"]),
    userD: state.get('userDetails'),
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
    handler: log => dispatch(createWorkoutLog(log)),
    uD: userDetails => dispatch(updateUserDetails(userDetails)),
    initForm : values => dispatch(initialize('kcal-target', fromJS({initialValues: {providedBf: 18}})))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
