import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Map, List } from "immutable";

import WorkoutTarget from "./workout_target";
import WorkoutTargetMain from "./workout_targets_main";

const WorkoutTargetsRouter = ({ exercises, workoutLogs, workoutTargets }) => {

return <div>
<Route exact path={"/workouttargets/create"} component={WorkoutTarget} />
<Route exact path={"/workouttargets/edit/:id"} render={props => {

    console.log(props);
    const g = workoutTargets.find((value, key) => props.match.params.id === key);


    return <WorkoutTarget {...props} defaultValue={g.toJS()}/>
  }} />
<Route exact path={"/workouttargets"} component={WorkoutTargetMain}  />
</div>

}
const mapStateToProps = state => {
  return {
    workoutTargets: state.getIn(['userDetails', 'workoutTargets'])
  };
}

export default connect(mapStateToProps)( WorkoutTargetsRouter);
