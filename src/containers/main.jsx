import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Immutable, { toJS } from "immutable";
import { Route } from "react-router-dom";
import * as _ from "lodash";

import HeaderContainer from "./header";
import currentKcalPlanSelector from "./../store/selectors/current_kcal";
import currentWeightSelector from "./../store/selectors/current_weight";
import isTrainingDay from "./../store/selectors/exercises";

import todayMacros from "./../store/selectors/current_macros";

import DailyLogContainer from "./daily_log";
import WorkoutLogContainer from "./workout_log";
import WorkoutLogPicker from './workout_log_picker';
import {getWorkoutLogsForMonth, createWorkoutLog} from './../store/actionCreators/workout_log_action_creators';
import WorkoutTarget from './workout_target';

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
// const exercises = [{name: 'dead', repetitions: []}]



const WK = () => <WorkoutLogContainer exercises={exercises} />;



//TODO router hoc
class MainContainer extends PureComponent {
  onHandler = (event, index, value) => {
    this.setState({selected: value});
    this.props.get1(value);
  }


  constructor(props){
    super(props)
    this.state = {selected: 1}
  }
   withInitialValues = exercises => props => {
    let g = _.map(exercises, exercise => ({name: exercise.name, note: '', sets: []}));
    console.log(g);

    // setTimeout(() =>
    // {
      return <WorkoutLogContainer {...props} exercises={g} handlerR={this.props.handler} />;
    // }, 2000)

  };
  render() {
    // console.log(this.props.isTrainingDay);
    return (
      <div>
        <HeaderContainer
          currentWeight={this.props.currentWeight}
          exercises={this.props.exercises.toJS()}
          todaysMacros={this.props.todaysMacros.toJS()}
        />
        <Route path="/dailylog" component={DailyLogContainer} />
        <Route exact path="/workoutlog" component={()=> <WorkoutLogPicker what={45} selected={this.state.selected} handler={this.onHandler} logs={!this.props.monthlyLogs.isEmpty() ? this.props.monthlyLogs.toJS()  : []}/>} />
        <Route path="/workoutlog/create" component={this.withInitialValues(!this.props.workoutLog.isEmpty() ? this.props.workoutLog.find(value => true).toJS()  : [])}  />
        <Route path="/workoutlog/edit/:id" component={this.withInitialValues(this.props.exercises.toJS())} />
        <Route path='/workouttarget' component={WorkoutTarget}/>
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.getIn(["userDetails", "username"]),
    currentKcalPlan: currentKcalPlanSelector(state),
    currentWeight: currentWeightSelector(state),
    todaysMacros: todayMacros(state),
    workoutLog : state.get('workoutLogs'),
    monthlyLogs: state.get('workoutLogs'),
    exercises: isTrainingDay(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    get1: month => dispatch(getWorkoutLogsForMonth(month)),
    handler: log => dispatch(createWorkoutLog(log))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
