import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Immutable, { toJS } from "immutable";
import * as _ from "lodash";

import HeaderContainer from "./header";
import currentKcalPlanSelector from "./../store/selectors/current_kcal";
import currentWeightSelector from "./../store/selectors/current_weight";
import isTrainingDay from "./../store/selectors/training_day";

import todayMacros from './../store/selectors/current_macros';

const isImmutable = dataStructure =>
  Immutable.Iterable.isIterable(dataStructure);

class MainContainer extends PureComponent {
  render() {
    // console.log(this.props.isTrainingDay);
    return (
      <div>
        <HeaderContainer
          currentKcalPlan={this.props.currentKcalPlan}
          currentWeight={this.props.currentWeight}
          isTrainingDay = {this.props.isTrainingDay}
          todaysMacros = {this.props.todaysMacros}
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
    isTrainingDay: isTrainingDay(state)
  };
};

const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps)(MainContainer);
