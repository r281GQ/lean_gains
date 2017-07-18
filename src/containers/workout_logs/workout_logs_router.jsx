import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Map, List } from "immutable";

import WorkoutLogsMainContainer from "./workout_logs_main";
import WorkoutLogFormContainer from "./workout_log_form";
import isTrainingDay from "./../../store/selectors/exercises";

const WorkoutLogsRouter = ({ exercises, workoutLogs }) =>
  <div>
    <Route exact path={"/workoutlogs"} component={WorkoutLogsMainContainer} />

    <Route
      exact
      path={"/workoutlogs/create/before"}
      render={props => {
        return <WorkoutLogFormContainer {...props} type={`createBefore`} />;
      }}
    />

    <Route
      exact
      path="/workoutlogs/edit/:id"
      render={props => {
        const defaultValue = workoutLogs
          .find((value, key) => props.match.params.id === key)
          .get("exercises");

        return (
          <WorkoutLogFormContainer
            {...props}
            defaultValue={defaultValue}
            type={`edit`}
          />
        );
      }}
    />

    <Route
      exact
      path={"/workoutlogs/create"}
      render={props => {
        const defaultValue = exercises.map(value =>
          Map().withMutations(map =>
            map
              .set("name", value)
              .set("note", "")
              .set("marker", false)
              .set("sets", List())
          )
        );
        return (
          <WorkoutLogFormContainer
            {...props}
            type={`create`}
            defaultValue={defaultValue}
          />
        );
      }}
    />
  </div>;

export default connect(state => ({
  workoutLogs: state.get("workoutLogs"),
  exercises: isTrainingDay(state)
}))(WorkoutLogsRouter);
