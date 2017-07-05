import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Immutable, { toJS } from "immutable";
import {Route} from 'react-router-dom';
import * as _ from "lodash";

import HeaderContainer from "./header";
import currentKcalPlanSelector from "./../store/selectors/current_kcal";
import currentWeightSelector from "./../store/selectors/current_weight";
import isTrainingDay from "./../store/selectors/exercises";

import todayMacros from './../store/selectors/current_macros';

import DailyLogContainer from './daily_log';
import WorkoutLogContainer from './workout_log';

const isImmutable = dataStructure =>
  Immutable.Iterable.isIterable(dataStructure);

  const Shit= () =><div>geci{this.props.currentWeight}</div>
const Shite= () =><div>geci1</div>

const workoutRoutes = [{
  path: '/workoutlog/create',
  component: ()=> <div>ige</div>
}];

const exercises = [{name: 'dead', repetitions: []}, {name: 'squat'}]
// const exercises = [{name: 'dead', repetitions: []}]

const WK = () => <WorkoutLogContainer exercises={exercises} />

class MainContainer extends PureComponent {
  render() {
    // console.log(this.props.isTrainingDay);
    return (
      <div>
        <HeaderContainer
          currentWeight={this.props.currentWeight}
          exercises = {this.props.exercises.toJS()}
          todaysMacros = {this.props.todaysMacros.toJS()}
        />
      <Route path='/dailylog'  component={DailyLogContainer} />
      <Route path='/workoutlog/create'  component={WK} />
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
    exercises: isTrainingDay(state)
  };
};

const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps)(MainContainer);
