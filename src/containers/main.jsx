import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Immutable, { toJS } from "immutable";
import * as _ from "lodash";

import HeaderContainer from "./header";
import currentKcalPlanSelector from "./../store/selectors/current_kcal";
import currentWeightSelector from "./../store/selectors/current_weight";
import isTrainingDay from "./../store/selectors/exercises";

import todayMacros from './../store/selectors/current_macros';

const isImmutable = dataStructure =>
  Immutable.Iterable.isIterable(dataStructure);

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
